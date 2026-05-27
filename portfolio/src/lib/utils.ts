import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };


export function calculateAge(birthDate: Date | string): number {
	const today = new Date();
	const birth = new Date(birthDate);

	let age = today.getFullYear() - birth.getFullYear();
	const monthDiff = today.getMonth() - birth.getMonth();

	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
		age--;
	}

	return age;
}

export function labelScroller(
	scrollContainer: HTMLElement | undefined,
	contentContainer: HTMLElement | undefined,
	onUpdate: (needsScroll: boolean, duration: number) => void,
): ResizeObserver {
	const updateScroll = () => {
		if (scrollContainer && contentContainer) {
			const distance =
				contentContainer.scrollWidth - scrollContainer.clientWidth;
			const needsScroll = distance > 0;

			let scrollDuration = 4;
			if (needsScroll) {
				const speed = 30;
				const scrollPhaseRatio = 0.7;
				scrollDuration = Math.max(
					4,
					distance / (speed * scrollPhaseRatio),
				);
			}
			onUpdate(needsScroll, scrollDuration);
		}
	};

	const resizeObserver = new ResizeObserver(updateScroll);

	if (scrollContainer && contentContainer) {
		resizeObserver.observe(scrollContainer);
		resizeObserver.observe(contentContainer);
		updateScroll();
	}
	return resizeObserver;
}

export interface MarkdownHeader {
	level: number;
	text: string;
	id: string;
}

// emulates github-slugger to match rehype-slug
export function createSlug(text: string): string {
	return text.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s/g, "-");
}

export function extractHeaders(body: string): MarkdownHeader[] {
	const headers: MarkdownHeader[] = [];
	// strip fenced code blocks first to avoid comment collisions
	const sanitizedBody = body.replace(/```[\s\S]*?```/g, "");
	const regex = /^(#{2,5})\s+(.*)$/gm;
	let match;
	while ((match = regex.exec(sanitizedBody)) !== null) {
		headers.push({
			level: match[1].length,
			text: match[2].trim(),
			id: createSlug(match[2]),
		});
	}
	return headers;
}