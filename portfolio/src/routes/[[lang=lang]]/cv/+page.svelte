<script lang="ts">
    import Paper from "$lib/components/cv/Paper.svelte";
    import { Printer } from "lucide-svelte";
    import pfp from "$lib/assets/me.webp";

    function handlePrint() {
        window.print();
    }
</script>

<div class="fixed top-4 right-4 print-hidden z-50">
    <button
        onclick={handlePrint}
        class="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded-lg shadow-xl hover:bg-black transition-all hover:scale-105"
    >
        <Printer size={18} />
        Print Resume
    </button>
</div>

<section id="cv" class="w-full flex justify-center">
    <Paper>
        <header
            class="flex justify-between items-start border-b-2 bg-header pl-paper pr-paper pt-paper pb-4 border-b-black"
        >
            <div class="space-y-1">
                <h1
                    class="text-3xl font-black uppercase tracking-tight leading-none text-white"
                >
                    Sem Van Broekhoven
                </h1>
                <p class="text-lg font-medium text-neutral-200">
                    Software Engineer
                </p>
                <p class="text-md italic font-medium text-neutral-200">
                    <i class="fa-solid fa-location-dot"></i>
                    Maaseik, Belgium
                </p>
            </div>
            <div
                class="absolute top-0 right-0 mt-paper mr-paper border-2 border-black rounded-full overflow-hidden glossy-tile"
            >
                <img
                    src={pfp}
                    alt="Sem Van Broekhoven"
                    class="block size-48 rounded-lg object-cover"
                />
            </div>
        </header>

        <main class="grid grid-cols-12 h-full font-serif">
            <section class="col-span-8 pl-paper pb-paper"></section>
            <section
                class="col-span-4 bg-secondary/40 pt-24 border-l-2 border-black p-4 pr-paper pb-paper"
            >
                hello
            </section>
        </main>
    </Paper>
</section>

<style>
    .font-serif {
        font-family: Georgia, serif;
    }
</style>
