import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
    const formData = await request.formData();
    const token = formData.get('cf-turnstile-response');

    if (!token) {
        return json({ success: false, message: 'Missing token' }, { status: 400 });
    }

    const secret = env.PRIVATE_TURNSTILE_SECRET_KEY;
    if (!secret) {
        console.error('TURNSTILE_SECRET_KEY is not set');
        return json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                secret: secret,
                response: token
            })
        });

        const result = await response.json();

        if (result.success) {
            return json({ success: true });
        } else {
            console.error('Turnstile validation failed:', result['error-codes']);
            return json({ success: false, message: 'Token validation failed', error: result['error-codes'] }, { status: 400 });
        }
    } catch (error) {
        console.error('Turnstile fetch error:', error);
        return json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
};
