// Renders the CV pages to real-text PDFs after `vite build`, into the published build/ folder.
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;
const OUT_DIR = 'build/cv';
const MAX_BYTES = 1024 * 1024;
const PAGES = [
	['EN', '/cv'],
	['NL', '/nl/cv']
] as const;

async function waitForServer(url: string, timeoutMs = 30_000): Promise<void> {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			if ((await fetch(url)).ok) return;
		} catch {
			// server not up yet
		}
		await new Promise((r) => setTimeout(r, 250));
	}
	throw new Error(`vite preview did not respond at ${url} within ${timeoutMs}ms`);
}

const server = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(PORT), '--strictPort'], {
	stdio: 'ignore',
	detached: true
});

try {
	await waitForServer(BASE + PAGES[0][1]);
	await mkdir(OUT_DIR, { recursive: true });

	const browser = await chromium.launch();
	try {
		const page = await browser.newPage();
		for (const [lang, path] of PAGES) {
			await page.goto(BASE + path, { waitUntil: 'networkidle' });
			await page.evaluate(() => document.fonts.ready);
			const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });

			const pageCount = pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)?.length ?? 0;
			if (pageCount !== 1) {
				throw new Error(`${path} renders to ${pageCount} pages; the CV must fit on one A4 page`);
			}
			if (pdf.length > MAX_BYTES) {
				throw new Error(`${path} PDF is ${pdf.length} bytes; limit is ${MAX_BYTES}`);
			}

			const file = `${OUT_DIR}/Sem_Van_Broekhoven_CV_${lang}.pdf`;
			await writeFile(file, pdf);
			console.log(`✔ ${file} (${Math.round(pdf.length / 1024)} KB)`);
		}
	} finally {
		await browser.close();
	}
} finally {
	// why: negative pid kills the whole process group (pnpm + vite)
	if (server.pid) process.kill(-server.pid);
}
