import type { RequestHandler } from './$types';
import { renderDefaultCard } from '$lib/server/og';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const jpeg = await renderDefaultCard();
	return new Response(new Uint8Array(jpeg), {
		headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400' }
	});
};
