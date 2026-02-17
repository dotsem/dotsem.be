<script lang="ts">
    let { data } = $props();
</script>

<article class="prose lg:prose-xl mx-auto py-10">
    <h1>{data.metadata.title}</h1>
    <data.component />
</article>
