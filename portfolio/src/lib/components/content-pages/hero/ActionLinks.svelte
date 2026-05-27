<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import type { ProjectMetadata } from "$lib/projects/metadata";
    import * as m from "$lib/paraglide/messages";

    type Props = Pick<
        ProjectMetadata,
        "repo" | "link" | "linkTitle" | "linkOpenInNewTab"
    >;

    let { repo, link, linkTitle, linkOpenInNewTab }: Props = $props();

    const actionButtonStyle = "px-8 text-md py-2 h-full font-bold";
</script>

{#snippet GitHubButton(path: string, label: string)}
    <Button
        href="https://github.com/{path}"
        target="_blank"
        rel="noopener noreferrer"
        class="{actionButtonStyle} bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all duration-300 "
    >
        <i class="fa-brands fa-github text-lg"></i>
        {label}
    </Button>
{/snippet}

{#if repo || link}
    <div class="flex flex-wrap gap-4 pt-4">
        {#if repo}
            {#if Array.isArray(repo)}
                {#each repo as r}
                    {@const repoPath = typeof r === "string" ? r : r.path}
                    {@const repoLabel =
                        typeof r === "string"
                            ? (r.includes("/") ? r.split("/")[1] : r)
                            : r.name}
                    {@render GitHubButton(repoPath, repoLabel)}
                {/each}
            {:else}
                {@render GitHubButton(repo, m.view_on_github())}
            {/if}
        {/if}
        {#if link && linkTitle}
            <Button
                href={link}
                target={linkOpenInNewTab ? "_blank" : ""}
                rel={linkOpenInNewTab ? "noopener noreferrer" : ""}
                class={actionButtonStyle}
            >
                {linkTitle}
                {#if linkOpenInNewTab}
                    <i class="fa-solid fa-arrow-up-right-from-square text-sm"
                    ></i>
                {:else}
                    <i class="fa-solid fa-link text-sm"></i>
                {/if}
            </Button>
        {/if}
    </div>
{/if}
