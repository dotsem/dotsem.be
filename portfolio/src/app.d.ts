// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		turnstile: {
			render: (
				container: string | HTMLElement,
				options: {
					sitekey: string;
					theme?: "light" | "dark" | "auto";
					size?: "normal" | "flexible" | "compact";
					callback?: (token: string) => void;
					"error-callback"?: (error: any) => void;
					"expired-callback"?: () => void;
					"timeout-callback"?: () => void;
				}
			) => string;
			reset: (widgetId: string) => void;
			remove: (widgetId: string) => void;
			getResponse: (widgetId: string) => string | undefined;
		};
	}
}

export { };
