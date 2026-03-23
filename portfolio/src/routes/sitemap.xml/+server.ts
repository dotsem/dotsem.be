import { getProjectsByLang } from '$lib/projects';
import { getBlogsByLang } from '$lib/blog';
import { availableLanguageTags } from '$lib/paraglide/runtime';
import { i18n } from '$lib/i18n';

export const prerender = true;

export async function GET() {
    const baseUrl = 'https://dotsem.be';

    // Constant pages
    const pathnames = [
        '/',
        '/projects',
        '/blog',
        '/privacy',
        '/cookies',
        '/aboutme'
    ];

    const pages: string[] = [];

    // Add localized versions of constant pages
    for (const lang of availableLanguageTags) {
        for (const path of pathnames) {
            pages.push(`${baseUrl}${i18n.resolveRoute(path, lang)}`);
        }
    }

    // Fetch all dynamic content
    for (const lang of availableLanguageTags) {
        const projects = await getProjectsByLang(lang);
        const blogs = await getBlogsByLang(lang);

        for (const project of projects) {
            pages.push(`${baseUrl}${i18n.resolveRoute(`/projects/${project.slug}`, lang)}`);
        }

        for (const blog of blogs) {
            pages.push(`${baseUrl}${i18n.resolveRoute(`/blog/${blog.slug}`, lang)}`);
        }
    }

    // Remove duplicates and ensure unique list
    const uniquePages = [...new Set(pages)];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${uniquePages
            .map((page) => {
                return `
    <url>
        <loc>${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>${page === `${baseUrl}/` || page === `${baseUrl}/nl/` || page === `${baseUrl}/en/` ? '1.0' : '0.7'}</priority>
    </url>`;
            })
            .join('')}
</urlset>`.trim();

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}
