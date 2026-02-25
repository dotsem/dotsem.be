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
                rows="4"
                class="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={contact_message_placeholder()}
            ></textarea>
        </div>

        <button
            type="submit"
            class="inline-flex w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mt-2"
        >
            {contact_button_send()}
        </button>
    </form>
</div>
