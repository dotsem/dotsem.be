<script lang="ts">
    let { children } = $props();
</script>

<div class="paper-viewport relative print:p-0">
    <div class="paper-scaling-wrapper">
        <div class="a4-container immutable-paper-context">
            {@render children()}
        </div>
    </div>
</div>

<style>
    /* Background andiventering */
    .paper-viewport {
        width: 100%;
        background: transparent;
        display: flex;
        justify-content: center;
        padding: 2rem 0;
        overflow: visible;
    }

    .paper-scaling-wrapper {
        --paper-width: 210mm;
        --paper-height: 297mm;

        width: var(--paper-width);
        height: var(--paper-height);
        display: flex;
        justify-content: center;
        transform-origin: top center;
    }

    .a4-container {
        width: var(--paper-width);
        height: var(--paper-height);
        background: white;
        color: black;
        box-shadow:
            0 20px 40px -10px rgb(0 0 0 / 0.15),
            0 10px 15px -5px rgb(0 0 0 / 0.1);
        position: relative;
        overflow: hidden;
        flex-shrink: 0;
    }

    /* 
	   IMMUTABILITY OVERRIDES 
	   Tailwind 4 uses CSS variables for almost everything. 
	   By redefining them here using absolute units (px/pt), we bypass 
	   relative 'rem' units that change with browser/root settings.
	*/
    .immutable-paper-context {
        /* Force base font size to ignore root rem */
        font-size: 16px;

        /* Overwrite Spacing: Tailwind 4 utils like p-4 use calc(var(--spacing) * 4) */
        --spacing: 4px;

        /* Overwrite Typography to be absolute (pt is standard for print) */
        --font-size-xs: 9pt;
        --font-size-sm: 10pt;
        --font-size-base: 12pt;
        --font-size-lg: 14pt;
        --font-size-xl: 16pt;
        --font-size-2xl: 20pt;
        --font-size-3xl: 24pt;
        --font-size-4xl: 28pt;
        --font-size-5xl: 36pt;
        --font-size-6xl: 48pt;

        /* Line heights as fixed px */
        --leading-tight: 1.25;
        --leading-none: 1;
        --leading-normal: 1.5;
    }

    @media (max-width: 220mm) {
        .paper-viewport {
            padding: 1rem 0;
            height: calc(297mm * ((100vw - 2rem) / 210mm) + 2rem);
        }

        .paper-scaling-wrapper {
            transform: scale(calc((100vw - 2rem) / 210mm));
        }
    }

    @media print {
        .paper-viewport {
            padding: 0;
            height: auto;
            display: block;
        }

        .paper-scaling-wrapper {
            transform: none !important;
            width: auto;
            height: auto;
        }

        .a4-container {
            box-shadow: none;
            margin: 0;
            padding: 0;
            overflow: visible;
        }

        :global(.print-hidden) {
            display: none !important;
        }

        :global(
                nav,
                footer,
                .navbar-container,
                .footer-container,
                .print-hidden
            ) {
            display: none !important;
        }

        :global(main) {
            padding-top: 0 !important;
            margin: 0 !important;
        }

        :global(body),
        :global(html) {
            background: white !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        :global(#svelte),
        :global(.flex-col.min-h-screen) {
            display: block !important;
            min-height: 0 !important;
        }

        @page {
            size: A4;
            margin: 0 !important;
        }
    }
</style>
