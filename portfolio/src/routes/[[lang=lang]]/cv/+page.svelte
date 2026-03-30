<script lang="ts">
    import Paper from "$lib/components/cv/Paper.svelte";
    import { Printer } from "lucide-svelte";
    import pfp from "$lib/assets/me.webp";
    import * as m from "$lib/paraglide/messages";
    import Section from "$lib/components/cv/Section.svelte";
    import ListItem from "$lib/components/cv/ListItem.svelte";
    import FAB from "$lib/components/cv/FAB.svelte";
    import { handleDownload } from "$lib/components/cv/handleDownload";
    import Experience from "$lib/components/cv/Experience.svelte";

    let pdfRef: HTMLElement | undefined = $state();

    function handlePrint() {
        window.print();
    }
</script>

<div class="fixed bottom-0 right-0 print-hidden z-50">
    <FAB icon="fa-solid fa-download" onclick={() => handleDownload(pdfRef)}
        >{m.cv_download()}</FAB
    >
    <FAB icon="fa-solid fa-print" onclick={handlePrint}>{m.cv_print()}</FAB>
</div>

<section
    id="cv"
    class="w-full flex justify-center mb-8 print:m-0"
    bind:this={pdfRef}
>
    <Paper>
        <header
            class="flex justify-between items-start border-b-4 pl-paper pr-paper pt-paper pb-4 border-b-primary"
        >
            <div class="space-y-1">
                <h1
                    class="text-3xl font-black uppercase tracking-tight leading-none text-black"
                >
                    Sem Van Broekhoven
                </h1>
                <p
                    class="text-lg font-bold text-primary italic uppercase tracking-wider"
                >
                    {m.cv_title()}
                </p>
                <div class="flex gap-4 text-sm font-medium text-neutral-600">
                    <p>
                        <i class="fa-solid fa-location-dot mr-1"></i>
                        {m.cv_location()}
                    </p>
                </div>
            </div>
            <div
                class="absolute top-0 right-12 mt-paper border-4 border-primary rounded-full overflow-hidden shadow-lg"
            >
                <img
                    src={pfp}
                    alt="Sem Van Broekhoven"
                    class="block size-40 rounded-full object-cover bg-white hover:scale-105 transition-all duration-500"
                />
            </div>
        </header>

        <main class="grid grid-cols-12 font-serif bg-white text-black">
            <!-- Main Content -->
            <article class="col-span-8 pl-paper pr-4 pt-4">
                <Section title={m.cv_student_jobs()} class="mb-4">
                    <div class="mx-2">
                        <Experience
                            title={m.cv_job_lifeguard_title()}
                            location={m.cv_location()}
                            date={m.cv_job_lifeguard_date()}
                            class="mb-4"
                        >
                            <ul>
                                <li>
                                    {m.cv_job_lifeguard_item_1()}
                                </li>
                                <li>
                                    {m.cv_job_lifeguard_item_2()}
                                </li>
                                <li>{m.cv_job_lifeguard_item_3()}</li>
                            </ul>
                        </Experience>
                        <Experience
                            title={m.cv_job_bistro_title()}
                            location={m.cv_location_kinrooi()}
                            date={m.cv_job_bistro_date()}
                        >
                            {m.cv_job_bistro_description()}
                        </Experience>
                    </div>
                </Section>
                <Section title={m.cv_experience()} class="mb-4">
                    <div class="mx-2">
                        <Experience
                            title={m.cv_internship_philips_title()}
                            location={m.cv_location_eindhoven()}
                            date={m.cv_internship_philips_date()}
                            class="mb-4"
                        >
                            {m.cv_internship_philips_description()}
                        </Experience>
                        <Experience title={m.cv_vex_title()}>
                            {m.cv_vex_description()}
                            <ul>
                                <li>
                                    {m.cv_vex_item_1()}
                                </li>
                                <li>
                                    {m.cv_vex_item_2()}
                                </li>
                            </ul>
                        </Experience>
                    </div>
                </Section>
                <Section title={m.cv_education()}>
                    <div class="mx-2">
                        <Experience
                            title={m.cv_edu_bachelor_title()}
                            location={m.cv_location_geel()}
                            date={m.cv_edu_bachelor_date()}
                            class="mb-4"
                        >
                            {m.cv_edu_bachelor_description()}
                        </Experience>
                        <Experience
                            title={m.cv_edu_secondary_title()}
                            location={m.cv_location()}
                            date={m.cv_edu_secondary_date()}
                        >
                            <ul>
                                <li>{m.cv_edu_secondary_item_1()}</li>
                                <li>{m.cv_edu_secondary_item_2()}</li>
                            </ul>
                        </Experience>
                    </div>
                </Section>
            </article>

            <!-- Sidebar -->
            <aside
                class="col-span-4 bg-neutral-50/50 pt-14 border-l border-neutral-200 p-4 pr-paper pb-paper"
            >
                <Section title={m.cv_summary_title()} class="mt-4">
                    {m.cv_summary_content()}
                </Section>
                <Section title={m.cv_skills_title()} class="mt-4">
                    <ul class="space-y-1">
                        <ListItem icon="fa-brands fa-python">Python</ListItem>
                        <ListItem icon="fa-brands fa-flutter"
                            >Flutter (Dart)</ListItem
                        >
                        <ListItem icon="fa-brands fa-svelte"
                            >Svelte & SvelteKit</ListItem
                        >
                        <ListItem icon="fa-brands fa-golang">Go</ListItem>
                        <ListItem icon="fa-brands fa-typescript"
                            >TypeScript</ListItem
                        >
                        <ListItem icon="fa-brands fa-rust">Rust</ListItem>
                        <ListItem icon="fa-brands fa-postgresql"
                            >PostgreSQL</ListItem
                        >
                        <ListItem icon="fa-brands fa-linux">Linux</ListItem>
                        <ListItem icon="fa-brands fa-docker">Docker</ListItem>
                        <ListItem icon="fa-brands fa-figma">Figma</ListItem>
                        <ListItem icon="fa-brands fa-github">GitHub</ListItem>
                    </ul>
                </Section>
                <Section title={m.cv_hobbies_title()} class="mt-4">
                    <ul class="space-y-1">
                        <ListItem icon="fa-solid fa-guitar"
                            >{m.cv_hobby_guitar()}</ListItem
                        >
                        <ListItem icon="fa-solid fa-water"
                            >{m.cv_hobby_swimming()}</ListItem
                        >
                        <ListItem icon="fa-solid fa-code"
                            >{m.cv_hobby_coding()}</ListItem
                        >
                    </ul>
                </Section>

                <Section title={m.cv_languages_title()} class="mt-4">
                    <ul class="space-y-1">
                        <li class="list-disc list-inside text-sm">
                            {m.cv_lang_dutch()}
                        </li>
                        <li class="list-disc list-inside text-sm">
                            {m.cv_lang_english()}
                        </li>
                        <li class="list-disc list-inside text-sm">
                            {m.cv_lang_french()}
                        </li>
                    </ul>
                </Section>
                <Section title={m.cv_contact_title()} class="mt-4">
                    <ul class="space-y-1">
                        <ListItem icon="fa-solid fa-envelope">
                            <a
                                href="mailto:cv@dotsem.be"
                                class="text-neutral-900 no-underline hover:underline"
                                >cv@dotsem.be</a
                            >
                        </ListItem>
                        <ListItem icon="fa-brands fa-linkedin">
                            <a
                                href="https://www.linkedin.com/in/sem-van-broekhoven/"
                                class="text-neutral-900 no-underline hover:underline"
                                >Sem Van Broekhoven</a
                            >
                        </ListItem>
                        <ListItem icon="fa-solid fa-location-dot">
                            {m.cv_location()}
                        </ListItem>
                    </ul>
                </Section>
            </aside>
        </main>
    </Paper>
</section>

<style>
    .font-serif {
        font-family: Georgia, serif;
    }
</style>
