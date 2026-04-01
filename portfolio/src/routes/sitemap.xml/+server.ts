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
        '/aboutme',
        '/cv'
    ];

    const defaultPriority = '0.7';
    const alternativePriorities: Record<string, string> = {
        '/': '1.0',
        '/aboutme': '0.9',
        '/cv': '0.8',
        '/privacy': '0.5',
        '/cookies': '0.5'
    };


    const getPriority = (path: string) => {
        return alternativePriorities[path] || defaultPriority;
    };

    const pages: { url: string; path: string }[] = [];

    // Add localized versions of constant pages
    for (const lang of availableLanguageTags) {
        for (const path of pathnames) {
            pages.push({
                url: `${baseUrl}${i18n.resolveRoute(path, lang)}`,
                path
            });
        }
    }

    // Fetch all dynamic content
    for (const lang of availableLanguageTags) {
        const projects = await getProjectsByLang(lang);
        const blogs = await getBlogsByLang(lang);

        for (const project of projects) {
            const path = `/projects/${project.slug}`;
            pages.push({
                url: `${baseUrl}${i18n.resolveRoute(path, lang)}`,
                path
            });
        }

        for (const blog of blogs) {
            const path = `/blog/${blog.slug}`;
            pages.push({
                url: `${baseUrl}${i18n.resolveRoute(path, lang)}`,
                path
            });
        }
    }

    // Remove duplicates based on URL
    const uniquePages = Array.from(
        new Map(pages.map((p) => [p.url, p])).values()
    );

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${uniquePages
            .map((page) => {
                return `
    <url>
        <loc>${page.url}</loc>
        <changefreq>weekly</changefreq>
        <priority>${getPriority(page.path)}</priority>
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
