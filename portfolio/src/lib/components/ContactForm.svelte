<script lang="ts">
    import {
        contact_title,
        contact_subtitle,
        contact_name_label,
        contact_name_placeholder,
        contact_email_label,
        contact_email_placeholder,
        contact_message_label,
        contact_message_placeholder,
        contact_button_send,
    } from "$lib/paraglide/messages.js";

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
                form.reset();
            } else {
                status = "error";
            }
        } catch (error) {
            console.error("Submission error:", error);
            status = "error";
        }
    }
</script>

<div class="bg-card rounded-xl shadow-sm border p-6 md:p-8">
    <div class="mb-6">
        <h2 class="text-2xl font-bold tracking-tight">{contact_title()}</h2>
        <p class="text-muted-foreground mt-1 text-sm">
            {contact_subtitle()}
        </p>
    </div>

    <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        class="space-y-4"
        onsubmit={handleSubmit}
    >
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
            <label>Don't fill this out: <input name="bot-field" /></label>
        </p>

        <div>
            <label for="name" class="block text-sm font-medium mb-1.5"
                >{contact_name_label()}</label
            >
            <input
                type="text"
                id="name"
                name="name"
                required
                disabled={status === "sending"}
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={contact_name_placeholder()}
            />
        </div>

        <div>
            <label for="email" class="block text-sm font-medium mb-1.5"
                >{contact_email_label()}</label
            >
            <input
                type="email"
                id="email"
                name="email"
                required
                disabled={status === "sending"}
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={contact_email_placeholder()}
            />
        </div>

        <div>
            <label for="message" class="block text-sm font-medium mb-1.5"
                >{contact_message_label()}</label
            >
            <textarea
                id="message"
                name="message"
                required
                disabled={status === "sending"}
                rows="4"
                class="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={contact_message_placeholder()}
            ></textarea>
        </div>

        {#if status === "success"}
            <div
                class="p-3 rounded-md bg-green-500/10 text-green-500 text-sm border border-green-500/20"
            >
                Message sent successfully! Thank you.
            </div>
        {:else if status === "error"}
            <div
                class="p-3 rounded-md bg-red-500/10 text-red-500 text-sm border border-red-500/20"
            >
                Something went wrong. Please try again or email me directly.
            </div>
        {/if}

        <button
            type="submit"
            disabled={status === "sending"}
            class="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-2"
        >
            {status === "sending" ? "Sending..." : contact_button_send()}
        </button>
    </form>
</div>
