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
        contact_error,
    } from "$lib/paraglide/messages.js";
    import { toast } from "svelte-sonner";
    import Button from "./ui/button/button.svelte";

    let status = $state("idle"); // 'idle' | 'sending' | 'success' | 'error'

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        status = "sending";

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const response = await fetch("/forms.html", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(formData as any).toString(),
            });

            if (response.ok) {
                status = "success";
                toast.success(contact_success());
                form.reset();
                setTimeout(() => (status = "idle"), 2000);
            } else {
                status = "error";
                toast.error(contact_error());
                setTimeout(() => (status = "idle"), 2000);
            }
        } catch (error) {
            console.error("Submission error:", error);
            status = "error";
            toast.error(contact_error());
            setTimeout(() => (status = "idle"), 2000);
        }
    }
</script>

<section id="contact" class="py-16 md:py-24 px-4 overflow-hidden">
    <div class="max-w-6xl mx-auto">
        <div
            class="flex md:flex-row flex-col gap-8 md:gap-12 lg:gap-16 items-center"
        >
            <!-- Headline Side -->
            <div
                class="space-y-2 md:text-right flex flex-col w-full items-center md:items-end"
            >
                <h2
                    class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight"
                >
                    {contact_title()}
                </h2>
                <p
                    class="text-xl md:text-2xl lg:text-3xl font-medium text-foreground opacity-90"
                >
                    {contact_subtitle()}
                </p>
            </div>

            <!-- Vertical Divider -->
            <div
                class="hidden md:block w-1 self-stretch bg-primary rounded-full min-h-[400px]"
            ></div>
            <div
                class="md:hidden h-1 w-80 mx-auto bg-primary rounded-full"
            ></div>

            <!-- Form Side -->
            <div class="w-full">
                <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    class="space-y-5"
                    onsubmit={handleSubmit}
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p hidden>
                        <label
                            >Don't fill this out: <input
                                name="bot-field"
                            /></label
                        >
                    </p>

                    <div class="grid grid-cols-1 gap-5">
                        <div class="space-y-1.5">
                            <label
                                for="name"
                                class="text-sm font-medium ml-1 text-foreground/80"
                            >
                                {contact_name_label()}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                disabled={status === "sending"}
                                placeholder={contact_name_placeholder()}
                                class="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                            />
                        </div>

                        <div class="space-y-1.5">
                            <label
                                for="email"
                                class="text-sm font-medium ml-1 text-foreground/80"
                            >
                                {contact_email_label()}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                disabled={status === "sending"}
                                placeholder={contact_email_placeholder()}
                                class="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                            />
                        </div>

                        <div class="space-y-1.5">
                            <label
                                for="subject"
                                class="text-sm font-medium ml-1 text-foreground/80"
                            >
                                {contact_subject_label()}
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                required
                                disabled={status === "sending"}
                                placeholder={contact_subject_placeholder()}
                                class="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                            />
                        </div>

                        <div class="space-y-1.5">
                            <label
                                for="message"
                                class="text-sm font-medium ml-1 text-foreground/80"
                            >
                                {contact_message_label()}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="5"
                                disabled={status === "sending"}
                                placeholder={contact_message_placeholder()}
                                class="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none placeholder:text-muted-foreground/50"
                            ></textarea>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={status === "sending"}
                        class="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none mt-2 text-base uppercase tracking-wider"
                    >
                        {#if status === "sending"}
                            <span
                                class="flex items-center justify-center gap-2"
                            >
                                <svg
                                    class="animate-spin h-5 w-5"
                                    viewBox="0 0 24 24"
                                >
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
