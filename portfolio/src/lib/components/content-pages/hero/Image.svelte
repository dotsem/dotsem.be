<script lang="ts">
    let { image, title }: { image: string; title: string } = $props();
</script>

<div class="flex justify-center lg:justify-end">
    <div class="relative group max-w-xl w-full">
        <!-- floating ambient aura -->
        <div
            class="absolute -inset-4 rounded-3xl opacity-40 blur-2xl transition-all duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:opacity-60 scale-100 group-hover:scale-105 pointer-events-none"
            style="background: radial-gradient(circle, var(--primary) 0%, transparent 70%)"
        ></div>

        <!-- card body -->
        <div
            class="relative w-fit rounded-xl overflow-hidden flex items-center justify-center"
        >
            <img
                src={image}
                alt={title}
                class="w-full h-auto max-h-87.5 md:max-h-100 lg:max-h-112.5 object-contain rounded-xl transition-transform duration-700 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:scale-105"
            />
        </div>
    </div>
</div>
