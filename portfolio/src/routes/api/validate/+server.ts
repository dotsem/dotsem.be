import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { rateLimit } from '$lib/server/ratelimit';

const headers = {
    'Cache-Control': 'no-store, no-cache, must-revalidate'
};

export const POST = async ({ request, getClientAddress }) => {
    let ip = 'unknown';
    try {
        ip = getClientAddress();
    } catch {
        // fallback in environments where client address is unreachable
    }

    // limit to 5 validation requests per minute per IP to prevent spam
    const limitResult = rateLimit(ip, 5, 60 * 1000);
    if (!limitResult.success) {
        return json(
            { success: false, message: 'Too many requests' },
            {
                status: 429,
                headers: {
                    ...headers,
                    'Retry-After': Math.ceil((limitResult.reset - Date.now()) / 1000).toString()
                }
            }
        );
    }

    let formData: FormData;
    try {
        formData = await request.formData();
    } catch {
        return json(
            { success: false, message: 'Invalid request format' },
            {
                status: 400,
                headers: headers
            }
        );
    }

    const token = formData.get('cf-turnstile-response');
    if (!token) {
        return json(
            { success: false, message: 'Missing token' },
            {
                status: 400,
                headers: headers
            }
        );
    }

    const secret = env.PRIVATE_TURNSTILE_SECRET_KEY;
    if (!secret) {
        console.error('TURNSTILE_SECRET_KEY is not set');
        return json(
            { success: false, message: 'Server configuration error' },
            {
                status: 500,
                headers: headers
            }
        );
    }

    // enforce strict 5-second timeout on external upstream requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secret: secret,
                response: token,
                remoteip: ip !== 'unknown' ? ip : undefined
            }),
            signal: controller.signal
        });

        const result = await response.json();

        if (!result.success) {
            console.error('Turnstile validation failed:', result['error-codes']);
            return json(
                { success: false, message: 'Token validation failed' },
                {
                    status: 400,
                    headers: headers
                }
            );
        }

        // prevent token harvesting or replay attacks on unauthorized domains
        const allowedHostnames = ['dotsem.be', 'localhost', '127.0.0.1'];
        const hostname = result.hostname;
        const isValidHostname = hostname && (allowedHostnames.includes(hostname) || hostname.endsWith('.dotsem.be'));

        if (!isValidHostname) {
            console.error('Turnstile hostname mismatch:', hostname);
            return json(
                { success: false, message: 'Invalid domain context' },
                {
                    status: 400,
                    headers: headers
                }
            );
        }

        return json(
            { success: true },
            {
                headers: headers
            }
        );
    } catch (error) {
        console.error('Turnstile verification error:', error);
        return json(
            { success: false, message: 'Internal server error' },
            {
                status: 500,
                headers: headers
            }
        );
    } finally {
        clearTimeout(timeoutId);
    }
};
