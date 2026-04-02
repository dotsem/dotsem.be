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

    const pages: { urlPath: string; originalPath: string }[] = [];

    // Add localized versions of constant pages
    for (const lang of availableLanguageTags) {
        for (const path of pathnames) {
            pages.push({
                urlPath: i18n.resolveRoute(path, lang),
                originalPath: path
            });
        }
    }

    // Fetch and add localized versions of dynamic content
    for (const lang of availableLanguageTags) {
        const projects = await getProjectsByLang(lang);
        const blogs = await getBlogsByLang(lang);

        for (const project of projects) {
            const path = `/projects/${project.slug}`;
            pages.push({
                urlPath: i18n.resolveRoute(path, lang),
                originalPath: path
            });
        }

        for (const blog of blogs) {
            const path = `/blog/${blog.slug}`;
            pages.push({
                urlPath: i18n.resolveRoute(path, lang),
                originalPath: path
            });
        }
    }

    // Deduplicate by final URL path
    const uniquePages = Array.from(
        new Map<string, { urlPath: string; originalPath: string }>(
            pages.map((p) => [p.urlPath, p])
        ).values()
    );


    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${uniquePages
            .map((page) => {
                const alternates = availableLanguageTags.map(locale => {
                    const altUrl = `${baseUrl}${i18n.resolveRoute(page.originalPath, locale)}`;
                    return `<xhtml:link rel="alternate" hreflang="${locale}" href="${altUrl}"/>`;
                }).join('\n        ');

                const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${i18n.resolveRoute(page.originalPath, 'en')}"/>`;

                return `
    <url>
        <loc>${baseUrl}${page.urlPath}</loc>
        <changefreq>weekly</changefreq>
        <priority>${getPriority(page.originalPath)}</priority>
        ${alternates}
        ${xDefault}
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


