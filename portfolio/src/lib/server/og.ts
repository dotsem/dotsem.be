import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Font } from 'satori';
import type { OverlayOptions } from 'sharp';

/**
 * Share cards (1200x630 JPEG) for link previews, rendered at build time:
 * satori draws the text layer as SVG, resvg turns it into a transparent PNG, sharp
 * composites it over the nebula photo. satori/resvg/sharp are imported lazily so the
 * server bundle only loads them when a card is actually rendered.
 */

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 64;
const PANEL = 340;
const PANEL_IMAGE = PANEL - 72;
// default card: keep the name clear of the hero cutout on the right
const DEFAULT_TEXT_WIDTH = 560;
// the image panel sits at fixed coordinates so the frosted backdrop behind it lines up exactly
const PANEL_GAP = 56;
const PANEL_RADIUS = 28;
const PANEL_X = WIDTH - PADDING - PANEL;
const PANEL_Y = (HEIGHT - PANEL) / 2;
// WhatsApp ignores preview images over ~300 KB
const MAX_BYTES = 280 * 1024;

const COLORS = {
	orange: '#ff8700',
	foreground: '#fafafa',
	muted: '#c4c4c8',
	faint: '#8a8a90'
};

const FADE =
	'linear-gradient(to right, rgba(0, 0, 0, 0.82), rgba(0, 0, 0, 0.62) 60%, rgba(0, 0, 0, 0.2))';

/** Glass tile behind the image: dark by default, light for logos with dark artwork. */
export type PanelTone = 'dark' | 'light';

export interface ShareCardInput {
	title: string;
	description: string;
	/** Path under src/lib/assets, e.g. /projects/x/logo.webp */
	imagePath?: string;
	panel?: PanelTone;
}

// same recipe as .glossy-tile in layout.css: translucent base, 135deg sheen, hairline border
const PANEL_STYLES: Record<PanelTone, Record<string, unknown>> = {
	dark: {
		backgroundColor: 'rgba(23, 23, 23, 0.5)',
		backgroundImage:
			'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04))',
		border: '1px solid rgba(255, 255, 255, 0.14)',
		boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)'
	},
	light: {
		backgroundColor: 'rgba(236, 236, 240, 0.82)',
		backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.15))',
		border: '1px solid rgba(255, 255, 255, 0.7)',
		boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)'
	}
};

// the build runs from the package root, like the rest of the Vite/SvelteKit tooling
const root = process.cwd();
const assetPath = (p: string) => path.join(root, 'src/lib/assets', p);
const fontPath = (weight: number) =>
	path.join(
		root,
		`node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-${weight}-normal.woff`
	);

type Tools = {
	satori: typeof import('satori').default;
	Resvg: typeof import('@resvg/resvg-js').Resvg;
	sharp: typeof import('sharp').default;
};

let toolsPromise: Promise<Tools> | undefined;
function tools(): Promise<Tools> {
	toolsPromise ??= Promise.all([import('satori'), import('@resvg/resvg-js'), import('sharp')]).then(
		([satori, resvg, sharp]) => ({
			satori: satori.default,
			Resvg: resvg.Resvg,
			sharp: sharp.default
		})
	);
	return toolsPromise;
}

let fontsPromise: Promise<Font[]> | undefined;
function fonts(): Promise<Font[]> {
	fontsPromise ??= Promise.all(
		([400, 800] as const).map(async (weight): Promise<Font> => ({
			name: 'Bricolage Grotesque',
			data: await readFile(fontPath(weight)),
			weight,
			style: 'normal'
		}))
	);
	return fontsPromise;
}

// satori takes React-like element objects; we build them by hand to avoid a JSX dependency
type El = { type: string; props: Record<string, unknown> };
const el = (
	type: string,
	style: Record<string, unknown>,
	children?: unknown,
	props: Record<string, unknown> = {}
): El => ({ type, props: { style, children, ...props } });

async function renderOverlay(tree: El): Promise<Buffer> {
	const { satori, Resvg } = await tools();
	const svg = await satori(tree as never, { width: WIDTH, height: HEIGHT, fonts: await fonts() });
	return new Resvg(svg).render().asPng();
}

async function encode(layers: OverlayOptions[]): Promise<Buffer> {
	const { sharp } = await tools();
	const build = (quality: number) =>
		sharp(assetPath('/bg-dark.webp'))
			.resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
			.composite(layers)
			.jpeg({ quality, mozjpeg: true })
			.toBuffer();

	const first = await build(85);
	return first.length <= MAX_BYTES ? first : build(72);
}

/**
 * backdrop-filter: blur(12px) saturate(160%) for the panel, done by hand: satori can't blur what is
 * behind an element, so the nebula under the panel is blurred here and the translucent tile is
 * drawn over it.
 */
async function frostedBackdrop(): Promise<OverlayOptions> {
	const { sharp } = await tools();
	const mask = Buffer.from(
		`<svg width="${PANEL}" height="${PANEL}"><rect width="${PANEL}" height="${PANEL}" rx="${PANEL_RADIUS}" fill="#fff"/></svg>`
	);
	const backdrop = await sharp(assetPath('/bg-dark.webp'))
		.resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
		.extract({ left: PANEL_X, top: PANEL_Y, width: PANEL, height: PANEL })
		.blur(12)
		.modulate({ saturation: 1.6 })
		.composite([{ input: mask, blend: 'dest-in' }])
		.png()
		.toBuffer();
	return { input: backdrop, left: PANEL_X, top: PANEL_Y };
}

function panelElement(image: { src: string; width: number; height: number }, tone: PanelTone): El {
	return el(
		'div',
		{
			position: 'absolute',
			left: PANEL_X,
			top: PANEL_Y,
			width: PANEL,
			height: PANEL,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: PANEL_RADIUS,
			...PANEL_STYLES[tone]
		},
		el('img', {}, undefined, { src: image.src, width: image.width, height: image.height })
	);
}

async function loadPanelImage(imagePath?: string) {
	if (!imagePath) return undefined;
	try {
		const { sharp } = await tools();
		const { data, info } = await sharp(await readFile(assetPath(imagePath)), {
			density: 300,
			animated: false // GIF: first frame
		})
			.resize(PANEL_IMAGE, PANEL_IMAGE, { fit: 'inside', withoutEnlargement: true })
			.png()
			.toBuffer({ resolveWithObject: true });
		return {
			src: `data:image/png;base64,${data.toString('base64')}`,
			width: info.width,
			height: info.height
		};
	} catch (err) {
		console.warn(`og: could not use image ${imagePath}, rendering the card without it`, err);
		return undefined;
	}
}

/** Left column: wordmark on top, content in the middle, domain at the bottom. */
function column(middle: El[], width?: number): El {
	return el(
		'div',
		{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			// fill the row next to the image panel, or stay narrower than the hero cutout
			...(width ? { width, flexShrink: 0 } : { flex: 1, minWidth: 0 })
		},
		[
			el('div', { fontSize: 46, fontWeight: 800, color: COLORS.orange }, 'dotsem.'),
			el('div', { display: 'flex', flexDirection: 'column' }, middle),
			el('div', { fontSize: 28, fontWeight: 400, color: COLORS.faint }, 'dotsem.be')
		]
	);
}

/** `overlay` elements are positioned absolutely on top of everything else. */
function frame(children: unknown[], overlay: El[] = []): El {
	return el(
		'div',
		{
			display: 'flex',
			width: WIDTH,
			height: HEIGHT,
			position: 'relative',
			fontFamily: 'Bricolage Grotesque'
		},
		[
			el('div', {
				position: 'absolute',
				top: 0,
				left: 0,
				width: WIDTH,
				height: HEIGHT,
				backgroundImage: FADE
			}),
			// position: relative keeps this above the absolutely positioned fade (CSS paints positioned
			// elements over normal flow content)
			el(
				'div',
				{
					display: 'flex',
					position: 'relative',
					width: WIDTH,
					height: HEIGHT,
					padding: PADDING,
					// without this the padding is added to the height and the bottom line is clipped
					boxSizing: 'border-box'
				},
				children
			),
			...overlay
		]
	);
}

/** Card for a project or blog post. */
export async function renderShareCard({
	title,
	description,
	imagePath,
	panel = 'dark'
}: ShareCardInput): Promise<Buffer> {
	const image = await loadPanelImage(imagePath);
	const titleSize = title.length <= 26 ? 84 : title.length <= 44 ? 70 : 58;

	const text = column(
		[
			el(
				'div',
				{
					fontSize: titleSize,
					fontWeight: 800,
					lineHeight: 1.05,
					color: COLORS.foreground,
					lineClamp: 3
				},
				title
			),
			el(
				'div',
				{
					marginTop: 24,
					fontSize: 30,
					fontWeight: 400,
					lineHeight: 1.35,
					color: COLORS.muted,
					lineClamp: 3
				},
				description
			)
		],
		// stop short of the panel; without an image the text may use the full width
		image ? PANEL_X - PADDING - PANEL_GAP : undefined
	);

	const layers: OverlayOptions[] = [];
	if (image) layers.push(await frostedBackdrop());
	layers.push({
		input: await renderOverlay(frame([text], image ? [panelElement(image, panel)] : [])),
		top: 0,
		left: 0
	});

	return encode(layers);
}

/** Fallback card for pages without their own: name on the left, hero cutout on the right. */
export async function renderDefaultCard(): Promise<Buffer> {
	const { sharp } = await tools();
	const overlay = await renderOverlay(
		frame([
			column(
				[
					el(
						'div',
						{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, color: COLORS.foreground },
						'Sem Van Broekhoven'
					),
					el(
						'div',
						{ marginTop: 24, fontSize: 38, fontWeight: 800, color: COLORS.orange },
						'Software engineer'
					)
				],
				DEFAULT_TEXT_WIDTH
			)
		])
	);
	const hero = await sharp(assetPath('/hero.webp')).resize({ height: HEIGHT }).png().toBuffer();

	return encode([
		{ input: overlay, top: 0, left: 0 },
		{ input: hero, gravity: 'east' }
	]);
}
