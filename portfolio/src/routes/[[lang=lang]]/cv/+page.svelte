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
        >Download CV</FAB
    >
    <FAB icon="fa-solid fa-print" onclick={handlePrint}>Print Resume</FAB>
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
                    Software Engineer
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
            <article class="col-span-8 pl-paper pr-4 pb-paper pt-4">
                <Section title="Student Jobs" class="mb-4">
                    <div class="mx-2">
                        <Experience
                            title="Lifeguard at Aquadroom"
                            location="Maaseik, Belgium"
                            date="November 2025 - Present"
                            class="mb-4"
                        >
                            <ul>
                                <li>
                                    Responsible for the safety of swimmers in
                                    and around the pool.
                                </li>
                                <li>
                                    Enforced pool rules and regulations to
                                    ensure a safe environment.
                                </li>
                                <li>Trained for applying first aid and CPR.</li>
                                <li>
                                    Keeping the pool and surrounding area clean
                                    and tidy.
                                </li>
                            </ul>
                        </Experience>
                        <Experience
                            title="Kitchen and Bar Staff at Bistro Papillon"
                            location="Kinrooi, Belgium"
                            date="May 2023 - September 2025"
                        >
                            Preparing food, preparing drinks and washing dishes.
                        </Experience>
                    </div>
                </Section>
                <Section title="Experience" class="mb-4">
                    <div class="mx-2">
                        <Experience
                            title="Internship at Philips"
                            location="Eindhoven, Netherlands"
                            date="6 November 2023 - 17 November 2023"
                            class="mb-4"
                        >
                            2 Week internship at the Embedded Software
                            Development team. Learning the workflow of agile and
                            creating a robot using their custom bluetooth
                            library as a proof of concept using C++ and Flutter.
                        </Experience>
                        <Experience title="VEX Robotics">
                            Strategic builder, programmer, and driver.
                            <ul>
                                <li>
                                    2x Belgian champion, second place in
                                    Luxemburg
                                </li>
                                <li>
                                    Participated in the world championship in
                                    Dallas, Texas
                                </li>
                            </ul>
                        </Experience>
                    </div>
                </Section>
                <Section title="Education">
                    <div class="mx-2">
                        <Experience
                            title="Bachelor of Applied Computer Science"
                            location="Thomas More, Geel, Belgium"
                            date="September 2024 - Present"
                            class="mb-4"
                        >
                            Following the track Digital Innovation with as minor
                            Application Development. Working in a project based
                            learning environment. Learning valuable skills in
                            software development, teamwork, problem solving and
                            soft skills.
                        </Experience>
                        <Experience
                            title="Secondary School Mosa-RT"
                            location="Maaseik, Belgium"
                            date="September 2018 - June 2024"
                        >
                            <ul>
                                <li>1st - 4th year: Industrial Sciences</li>
                                <li>5th - 6th year: Industrial IT</li>
                            </ul>
                        </Experience>
                    </div>
                </Section>
            </article>

            <!-- Sidebar -->
            <aside
                class="col-span-4 bg-neutral-50/50 pt-14 border-l border-neutral-200 p-4 pr-paper pb-paper"
            >
                <Section title="Summary" class="mt-4">
                    I'm a software engineer with a passion for building robust,
                    scalable and efficient applications. I'm experienced in
                    modern web technologies, apps, backend systems and hardware
                    integration.
                </Section>
                <Section title="Skills" class="mt-4">
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
                <Section title="Hobbies" class="mt-4">
                    <ul class="space-y-1">
                        <ListItem icon="fa-solid fa-guitar"
                            >Playing Guitar</ListItem
                        >
                        <ListItem icon="fa-solid fa-water"
                            >Swimming & Diving</ListItem
                        >
                        <ListItem icon="fa-solid fa-code">Coding</ListItem>
                    </ul>
                </Section>

                <Section title="Languages" class="mt-4">
                    <ul class="space-y-1">
                        <li class="list-disc list-inside text-sm">
                            Dutch (Native)
                        </li>
                        <li class="list-disc list-inside text-sm">
                            English (Fluent)
                        </li>
                        <li class="list-disc list-inside text-sm">
                            French (Conversational)
                        </li>
                    </ul>
                </Section>
                <Section title="Contact" class="mt-4">
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
