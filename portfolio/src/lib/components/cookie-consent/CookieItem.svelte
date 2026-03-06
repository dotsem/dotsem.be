<script lang="ts">
    let { name, purpose, icon } = $props();
</script>

<div
    class="flex flex-col md:items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300"
>
    <div class="bg-accent/20 w-full p-3 rounded-lg border border-accent/20">
        <div class="flex items-center gap-2">
            <i class="fa-solid {icon} text-primary text-xl"></i>
            <h3 class="text-xl font-medium text-white">
                {name}
            </h3>
        </div>
        <p class="text-gray-500 text-sm leading-relaxed">
            {purpose}
        </p>
    </div>
</div>
