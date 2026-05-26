<script lang="ts">
    import type { ProjectMetadata } from "$lib/projects/metadata";

    type Props = Pick<ProjectMetadata, "repo" | "link" | "linkTitle">;

    let { repo, link, linkTitle }: Props = $props();
</script>

{#if repo || link}
    <div class="flex flex-wrap gap-4 pt-4">
        {#if repo}
            {#if Array.isArray(repo)}
                {#each repo as r}
                    {@const repoPath = typeof r === "string" ? r : r.path}
                    {@const repoLabel =
                        typeof r === "string" ? r.split("/")[1] : r.name}
                    <a
                        href="https://github.com/{repoPath}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all duration-300 shadow-md no-underline"
                    >
                        <i class="fa-brands fa-github text-lg"></i>
                        {repoLabel}
                    </a>
                {/each}
            {:else}
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
        {/if}
        {#if link && linkTitle}
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-primary hover:bg-primary/95 text-white transition-all duration-300 shadow-[0_4px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_4px_25px_rgba(239,68,68,0.5)] no-underline hover:scale-[1.02]"
            >
                {linkTitle}
                <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
            </a>
        {/if}
    </div>
{/if}
