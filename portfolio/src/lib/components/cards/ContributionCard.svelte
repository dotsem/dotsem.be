<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import ScrollingLangList from "$lib/components/ScrollingLangList.svelte";
    import type { Contribution } from "$lib/projects";

    interface Props {
        contribution: Contribution;
        class?: string;
    }

    let { contribution, class: className = "" }: Props = $props();

    const isMerged = $derived(contribution.status === "merged");
    const isOpen = $derived(contribution.status === "open");
</script>

<a
    href={contribution.prUrl}
    target="_blank"
    rel="noreferrer noopener"
    class="group block text-inherit no-underline {className}"
>
    <Card.Root
        class="flex! h-64 w-80 m-0! flex-col justify-between overflow-hidden border-white/10! bg-white/5! p-5 
               transition-all duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)]
               has-hover:hover:-translate-y-1.5 has-hover:hover:border-primary/40! has-hover:hover:bg-white/10! relative"
    >
        <div class="space-y-3">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors truncate">
                    <i class="fa-brands fa-github text-sm shrink-0"></i>
                    <span class="truncate">{contribution.repo}</span>
                </div>

                <span
                    class="shrink-0 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border {isMerged
                        ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                        : isOpen
                          ? 'bg-green-500/15 text-green-400 border-green-500/30'
                          : 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30'}"
                >
                    <i
                        class="{isMerged
                            ? 'fa-solid fa-code-merge'
                            : isOpen
                              ? 'fa-solid fa-code-pull-request'
                              : 'fa-solid fa-circle-xmark'} text-[10px]"
                    ></i>
                    {contribution.status}
                </span>
            </div>

            <h3 class="text-base font-bold tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {contribution.title}
            </h3>

            <p class="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {contribution.description}
            </p>
        </div>

        <div class="flex items-center justify-between gap-3 pt-3 border-t border-white/5">
            <ScrollingLangList languages={contribution.languages} class="flex-1" />

            <div class="text-xs text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </div>
        </div>
    </Card.Root>
</a>
