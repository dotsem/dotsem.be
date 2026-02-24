<script lang="ts">
    import "./profile.css";
    import ProgLang from "$lib/components/ProgLang.svelte";
    import MeImage from "$lib/assets/me.png";
    import * as m from "$lib/paraglide/messages.js";

    let experienceContent = $derived([
        m.profile_experience_content_0(),
        m.profile_experience_content_1(),
        m.profile_experience_content_2(),
        m.profile_experience_content_3(),
        m.profile_experience_content_4(),
        m.profile_experience_content_5(),
    ]);
    let achievementsContent = $derived([
        m.profile_achievements_content_0(),
        m.profile_achievements_content_1(),
    ]);
    let hsContent = $derived([m.profile_hs_content_0()]);
    let uniContent = $derived([
        m.profile_uni_content_0(),
        m.profile_uni_content_1(),
    ]);
</script>

<div id="profile" class="container mx-auto my-8">
    <div class="profile-column">
        <!-- -->
        <!-- header -->
        <!-- -->
        <div id="profile-title" class="grid-flex glossy-tile">
            <h3>{m.profile_title()}</h3>
        </div>
        <div id="profile-who" class="grid-flex glossy-tile">
            <!-- -->
            <!-- me -->
            <!-- -->
            <div
                id="profile-who-image-container"
                class="ob-infinite ob-show unselectable"
            >
                <img src={MeImage} alt="thats me!" />
                <div></div>
            </div>
            <h3>Sem Van Broekhoven</h3>
            <p>Full Stack Software Developer</p>
        </div>
        <!-- -->
        <!-- about me -->
        <!-- -->
        <div id="profile-about" class="grid-flex glossy-tile">
            <p>
                {m.profile_description()}
            </p>
        </div>
    </div>
    <div class="profile-column">
        <div id="profile-skills" class="glossy-tile">
            <!-- -->
            <!-- skills -->
            <!-- -->
            <h3><i class="fa-solid fa-star"></i> {m.profile_tools_fav()}</h3>
            <div class="skill-wrapper">
                <ProgLang name="py"></ProgLang>
                <ProgLang name="sql"></ProgLang>
                <ProgLang name="flutter"></ProgLang>
                <ProgLang name="dart"></ProgLang>
                <ProgLang name="svelte"></ProgLang>
                <ProgLang name="ts"></ProgLang>
                <ProgLang name="css"></ProgLang>
            </div>

            <h3><i class="fa-solid fa-code"></i> {m.profile_tools_prog()}</h3>
            <div class="skill-wrapper">
                <ProgLang name="js"></ProgLang>
                <ProgLang name="html"></ProgLang>
                <ProgLang name="php"></ProgLang>
                <ProgLang name="angular"></ProgLang>
                <ProgLang name="thymeleaf"></ProgLang>
                <ProgLang name="java"></ProgLang>
                <ProgLang name="cpp"></ProgLang>
                <ProgLang name="go"></ProgLang>
                <ProgLang name="openGL"></ProgLang>
                <ProgLang name="pygame"></ProgLang>
            </div>
            <h3>
                <i class="fa-solid fa-compact-disc"></i>
                {m.profile_tools_os()}
            </h3>
            <div class="skill-wrapper">
                <ProgLang name="linux"></ProgLang>
                <ProgLang name="windows"></ProgLang>
                <ProgLang name="archlinux"></ProgLang>
                <ProgLang name="ubuntu"></ProgLang>
            </div>
            <h3>
                <i class="fa-solid fa-screwdriver-wrench"></i>
                {m.profile_tools_tools()}
            </h3>
            <div class="skill-wrapper">
                <ProgLang name="arduino"></ProgLang>
                <ProgLang name="docker"></ProgLang>
                <ProgLang name="vscode"></ProgLang>
                <ProgLang name="raspberrypi"></ProgLang>
            </div>
        </div>
        <!-- -->
        <!-- links -->
        <!-- -->
        <div id="profile-links" class="glossy-tile">
            <a
                href="https://github.com/dotsem"
                target="_blank"
                aria-label="Github"><i class="fa-brands fa-github"></i></a
            >
            <a
                href="https://www.linkedin.com/in/sem-van-broekhoven/"
                target="_blank"
                aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a
            >
            <a
                href="https://www.instagram.com/sem_van_broekhoven/"
                target="_blank"
                aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a
            >
            <a
                href="https://www.facebook.com/profile.php?id=100089528472654"
                target="_blank"
                aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a
            >
        </div>
    </div>

    <div class="profile-column">
        <!-- -->
        <!-- experience -->
        <!-- -->
        <div id="profile-experience" class="glossy-tile">
            <h3>{m.profile_experience_title()}</h3>
            <ul>
                {#each experienceContent as content}
                    <li>{content}</li>
                {/each}
            </ul>
            <h3>{m.profile_achievements_title()}</h3>
            <ul>
                {#each achievementsContent as content}
                    <li>{content}</li>
                {/each}
            </ul>
        </div>
        <!-- -->
        <!-- education -->
        <!-- -->
        <div id="profile-education" class="glossy-tile">
            <h3>{m.profile_hs_title()}</h3>
            <ul>
                {#each hsContent as content}
                    <li>{content}</li>
                {/each}
            </ul>
            <h3>{m.profile_uni_title()}</h3>
            <ul>
                {#each uniContent as content}
                    <li>{content}</li>
                {/each}
            </ul>
        </div>
        <!-- -->
        <!-- print -->
        <!-- -->
        <div id="profile-print" class="glossy-tile">
            <a href="/misc/print-this-profile"
                >Print&nbsp;<i class="fa-solid fa-print"></i></a
            >
        </div>
        <!-- -->
        <!-- save -->
        <!-- -->
        <div id="profile-save" class="glossy-tile">
            <button
                >{m.profile_save()}&nbsp;<i class="fa-solid fa-download"
                ></i></button
            >
        </div>
    </div>
</div>
