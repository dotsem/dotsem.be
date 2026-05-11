import { env } from '$env/dynamic/private';

// Simple in-memory cache for the server instance
const cache = new Map<string, { version: string, timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function getLatestRelease(repo: string): Promise<string | null> {
    const now = Date.now();
    const cached = cache.get(repo);
    
    if (cached && (now - cached.timestamp) < CACHE_TTL) {
        return cached.version;
    }

    try {
        const url = `https://api.github.com/repos/${repo}/releases/latest`;
        const headers: Record<string, string> = {
            'User-Agent': 'dotsem-portfolio'
        };
        
        // Optional: Support GITHUB_TOKEN if provided for higher rate limits
        if (env.GITHUB_TOKEN) {
            headers['Authorization'] = `token ${env.GITHUB_TOKEN}`;
        }

        const res = await fetch(url, { headers });
        if (!res.ok) {
            console.warn(`GitHub API error for ${repo}: ${res.status}`);
            return null;
        }

        const data = await res.json();
        const version = data.tag_name;

        cache.set(repo, { version, timestamp: now });
        return version;
    } catch (err) {
        console.error(`Error fetching release for ${repo}:`, err);
        return null;
    }
}
