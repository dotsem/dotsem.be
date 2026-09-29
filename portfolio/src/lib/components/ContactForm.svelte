<script lang="ts">
	import {
		contact_title,
		contact_subtitle,
		contact_name_label,
		contact_name_placeholder,
		contact_email_label,
		contact_email_placeholder,
		contact_subject_label,
		contact_subject_placeholder,
		contact_message_label,
		contact_message_placeholder,
		contact_button_send,
		contact_success,
		contact_error
	} from '$lib/paraglide/messages.js';
	import { toast } from 'svelte-sonner';
	import Button from './ui/button/button.svelte';
	import EntryAnimation from './EntryAnimation.svelte';
	import { env } from '$env/dynamic/public';
	import { untrack } from 'svelte';

	let status = $state('idle'); // 'idle' | 'sending' | 'success' | 'error'
	let turnstileContainer = $state<HTMLElement | null>(null);
	let widgetId = $state<string | null>(null);

	$effect(() => {
		const container = turnstileContainer;
		if (!container) return;

		// check if we already have a widget using untrack to avoid dependency
		if (untrack(() => widgetId)) return;

		let retries = 0;
		const maxRetries = 50;
		let timeoutId: ReturnType<typeof setTimeout> | undefined;

		const renderTurnstile = () => {
			if (window.turnstile) {
				// double check to prevent race conditions from async retries
				if (untrack(() => widgetId)) return;

				widgetId = window.turnstile.render(container, {
					sitekey: env.PUBLIC_TURNSTILE_SITE_KEY ?? '',
					theme: 'dark',
					size: 'flexible'
				});
			} else if (retries < maxRetries) {
				retries++;
				timeoutId = setTimeout(renderTurnstile, 100);
			} else {
				console.warn(
					'Cloudflare Turnstile failed to load after 5 seconds. Adblocker might be active.'
				);
			}
		};
		renderTurnstile();

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
			const currentId = untrack(() => widgetId);
			if (currentId && window.turnstile) {
				window.turnstile.remove(currentId);
				widgetId = null;
			}
		};
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		status = 'sending';

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			// 1. Validate Turnstile token server-side
			const validateResponse = await fetch('/api/validate', {
				method: 'POST',
				body: formData
			});

			const validateResult = await validateResponse.json();

			if (!validateResponse.ok || !validateResult.success) {
				// validation failed
				status = 'error';
				toast.error('Captcha validation failed. Please try again.');
				setTimeout(() => (status = 'idle'), 2000);
				return;
			}

			// 2. If valid, proceed with Netlify submission
			const response = await fetch('/forms.html', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
			});

			if (response.ok) {
				status = 'success';
				toast.success(contact_success());
				form.reset();
				if (widgetId && window.turnstile) {
					window.turnstile.reset(widgetId);
				}
				setTimeout(() => (status = 'idle'), 2000);
			} else {
				status = 'error';
				toast.error(contact_error());
				setTimeout(() => (status = 'idle'), 2000);
			}
		} catch (error) {
			console.error('Submission error:', error);
			status = 'error';
			toast.error(contact_error());
			setTimeout(() => (status = 'idle'), 2000);
		}
	}
</script>

<section id="contact" class="overflow-hidden px-4 py-16 md:py-24">
	<div class="mx-auto max-w-6xl">
		<div class="flex flex-col items-center gap-8 md:flex-row md:gap-12 lg:gap-16">
			<!-- Headline Side -->
			<div class="flex w-full flex-col items-center space-y-2 md:items-end md:text-right">
				<EntryAnimation delay={200} type="slide-left">
					<h2 class="text-3xl leading-tight font-bold text-primary md:text-4xl lg:text-5xl">
						{contact_title()}
					</h2>
				</EntryAnimation>
				<EntryAnimation delay={400} type="slide-left">
					<p class="text-xl font-medium text-foreground opacity-90 md:text-2xl lg:text-3xl">
						{contact_subtitle()}
					</p>
				</EntryAnimation>
			</div>

			<!-- Vertical Divider -->
			<EntryAnimation type="scale" duration={2000}>
				<div class="hidden min-h-100 w-1 self-stretch rounded-full bg-primary md:block"></div>
				<div class="mx-auto h-1 w-80 rounded-full bg-primary md:hidden"></div>
			</EntryAnimation>

			<!-- Form Side -->
			<div class="w-full">
				<form
					name="contact"
					method="POST"
					data-netlify="true"
					data-netlify-honeypot="bot-field"
					class="space-y-5"
					onsubmit={handleSubmit}
				>
					<input type="hidden" name="form-name" value="contact" />
					<p hidden>
						<label>Don't fill this out: <input name="bot-field" /></label>
					</p>

					<div class="grid grid-cols-1 gap-5">
						<div class="space-y-1.5">
							<label for="name" class="ml-1 text-sm font-medium text-foreground/80">
								{contact_name_label()}
							</label>
							<input
								type="text"
								id="name"
								name="name"
								required
								disabled={status === 'sending'}
								placeholder={contact_name_placeholder()}
								class="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none"
							/>
						</div>

						<div class="space-y-1.5">
							<label for="email" class="ml-1 text-sm font-medium text-foreground/80">
								{contact_email_label()}
							</label>
							<input
								type="email"
								id="email"
								name="email"
								required
								disabled={status === 'sending'}
								placeholder={contact_email_placeholder()}
								class="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none"
							/>
						</div>

						<div class="space-y-1.5">
							<label for="subject" class="ml-1 text-sm font-medium text-foreground/80">
								{contact_subject_label()}
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								required
								disabled={status === 'sending'}
								placeholder={contact_subject_placeholder()}
								class="w-full rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none"
							/>
						</div>

						<div class="space-y-1.5">
							<label for="message" class="ml-1 text-sm font-medium text-foreground/80">
								{contact_message_label()}
							</label>
							<textarea
								id="message"
								name="message"
								required
								rows="5"
								disabled={status === 'sending'}
								placeholder={contact_message_placeholder()}
								class="w-full resize-none rounded-lg border border-border/50 bg-background/50 px-4 py-3 text-sm transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/50 focus:outline-none"
							></textarea>
						</div>
					</div>

					<div bind:this={turnstileContainer} class="mt-4 min-h-[65px]"></div>

					<Button
						type="submit"
						disabled={status === 'sending'}
						class="mt-2 w-full rounded-lg bg-primary px-6 py-3 text-base font-bold tracking-wider text-primary-foreground uppercase shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
					>
						{#if status === 'sending'}
							<span class="flex items-center justify-center gap-2">
								<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24">
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
										fill="none"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Sending...
							</span>
						{:else}
							{contact_button_send()}
						{/if}
					</Button>
				</form>
			</div>
		</div>
	</div>
</section>
