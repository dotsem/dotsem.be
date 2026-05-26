<script lang="ts">
    import ProgLang from "$lib/components/ProgLang.svelte";
    import Badge from "$lib/components/ui/badge/badge.svelte";

    interface Props {
        title: string;
        description: string;
        image?: string;
        status?: string;
        repo?: string;
        link?: string;
        languages?: string[];
        labels?: string[];
        type?: string;
    }

    let {
        title,
        description,
        image,
        status,
        repo,
        link,
        languages = [],
        labels = [],
        type,
    }: Props = $props();
</script>

<!-- Premium Split Hero Banner -->
<div
    class="relative w-full overflow-hidden bg-[#070709] pt-32 pb-20 border-b border-white/5"
>
    <!-- Ambient Radial Blur Auras -->
    <div
        class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0"
    ></div>
    <div
        class="absolute top-1/3 left-3/4 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-secondary/5 rounded-full blur-[120px] pointer-events-none z-0"
    ></div>
    {#if image}
        <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.03] blur-3xl pointer-events-none scale-125 z-0"
            style="background-image: url('{image}')"
        ></div>
    {/if}

    <div class="container relative z-10 mx-auto px-4 md:px-8">
        <div
            class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center"
        >
            <!-- Left Details Column -->
            <div class="flex flex-col gap-6 text-left">
                <div class="flex flex-wrap items-center gap-3">
                    {#if status}
                        <span
                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md shadow-sm"
                        >
                            <span
                                class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                            ></span>
                            {status}
                        </span>
                    {/if}
                </div>

                <div>
                    {#if type}
                        <span class="text-md uppercase text-primary"
                            >{type}</span
                        >
                    {/if}
                    <h1
                        class="text-4xl md:text-6xl font-black tracking-tight text-white font-sans drop-shadow-sm leading-[1.1]"
                    >
                        {title}
                    </h1>
                </div>

                <p
                    class="text-lg md:text-xl text-foreground/80 font-normal leading-relaxed max-w-2xl"
                >
                    {description}
                </p>

                <!-- Language Badges -->
                {#if languages.length > 0}
                    <div class="flex flex-wrap gap-2.5 pt-2">
                        {#each languages as language}
                            <ProgLang name={language} size={0.8} />
                        {/each}
                    </div>
                {/if}

                <!-- Category Labels -->
                {#if labels.length > 0}
                    <div class="flex flex-wrap gap-2 pt-2">
                        {#each labels as label}
                            <Badge
                                variant="secondary"
                                class="bg-white/10 hover:bg-white/20 text-white border-none px-3.5 py-1 text-xs"
                            >
                                {label}
                            </Badge>
                        {/each}
                    </div>
                {/if}

                <!-- Action Links -->
                {#if repo || link}
                    <div class="flex flex-wrap gap-4 pt-4">
                        {#if repo}
                            <a
                                href="https://github.com/{repo}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all duration-300 shadow-md no-underline"
                            >
                                <i class="fa-brands fa-github text-lg"></i>
                                View on GitHub
                            </a>
                        {/if}
                        {#if link}
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-primary hover:bg-primary/95 text-white transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_4px_25px_rgba(239,68,68,0.5)] no-underline hover:scale-[1.02]"
                            >
                                <i class="fa-solid fa-gamepad text-lg"></i>
                                Play Live Game
                            </a>
                        {/if}
                    </div>
                {/if}
            </div>

            <!-- Right Visual Column (Interactive Device Frame/Showcase Card) -->
            {#if image}
                <div class="flex justify-center lg:justify-end">
                    <div class="relative group max-w-sm w-full">
                        <!-- Floating Ambient Aura -->
                        <div
                            class="absolute -inset-4 rounded-3xl opacity-40 blur-2xl transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:opacity-60 scale-100 group-hover:scale-105 pointer-events-none"
                            style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%)"
                        ></div>

                        <!-- Card Body -->
                        <div
                            class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:border-white/20 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                        >
                            <div
                                class="relative w-full aspect-square rounded-xl overflow-hidden bg-black/20 flex items-center justify-center"
                            >
                                <img
                                    src={image}
                                    alt={title}
                                    class="w-full h-full object-contain p-4 transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
