import { i18n } from '$lib/i18n';
import type { Handle } from '@sveltejs/kit';

const paraglideHandle = i18n.handle();

export const handle: Handle = async ({ event, resolve }) => {
    const consent = event.cookies.get('cookie-consent');

    // If user explicitly declined, or hasn't decided yet (we should be safe and only set when accepted)
    if (consent !== 'true') {
        const originalSet = event.cookies.set.bind(event.cookies);
        event.cookies.set = (name, value, options) => {
            if (name === 'paraglide_lang') return;
            return originalSet(name, value, options);
        };
    }

    return paraglideHandle({ event, resolve });
};
