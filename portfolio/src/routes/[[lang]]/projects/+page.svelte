<script lang="ts">
    import { i18n } from "$lib/i18n";
    import { availableLanguageTags, languageTag } from "$lib/paraglide/runtime";
    import { page } from "$app/state";

    let { data } = $props();
</script>

<div class="prose lg:prose-xl mx-auto py-10">
    <h1>
        Projects ({data.lang})
    </h1>

    <ul>
        {#each data.projects as project}
            <li>
                <a
                    href={i18n.resolveRoute(
                        "/projects/" + project.slug,
                        languageTag(),
                    )}
                >
                    {project.title}
                </a>
            </li>
        {/each}
    </ul>
</div>
