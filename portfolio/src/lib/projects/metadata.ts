export enum ProjectStatus {
    Finished = "Finished",
    InDevelopment = "In Development",
    InProgress = "In Progress",
    YouAreLookingAtIt = "You are looking at it!",
}

export type ProjectCategory = "personal" | "di" | "school";

export interface ProjectMetadata {
    slug: string;
    image: string;
    languages: string[];
    highlighted: boolean | number;
    category: ProjectCategory;
    repo?: string | string[] | { name: string; path: string }[];
    trackRelease?: boolean;
    link?: string;
    linkOpenInNewTab?: boolean;
    linkTitle?: string;
    labels?: string[];
    status?: ProjectStatus | string;
}

export interface Contribution {
    title: string;
    repo: string;
    prUrl: string;
    description: string;
    date?: string;
    status: "merged" | "open" | "closed";
    languages: string[];
    stars?: number;
}

export const projectsMetadata: ProjectMetadata[] = [
    {
        slug: "world-wide-bulb",
        image: "/projects/world-wide-bulb/logo.webp",
        languages: ["go", "svelte", "ts", "tailwind", "sql", "docker"],
        highlighted: 4,
        category: "personal",
        repo: "dotsem/world-wide-bulb",
        trackRelease: true,
        link: "https://wwb.dotsem.be",
        linkTitle: "Flick the global lightbulb",
        linkOpenInNewTab: true,
        labels: [
            "WebSockets",
            "Go Concurrency",
            "Single Binary",
            "SQLite & sqlc",
        ],
        status: ProjectStatus.Finished,
    },
    {
        slug: "gostrategy",
        image: "/projects/gostrategy/logo.webp",
        languages: [
            "svelte",
            "go",
            "ts",
            "tailwind",
            "postgresql",
            "docker",
            "nixos",
        ],
        highlighted: 1,
        category: "di",
        repo: "Thomas-More-Digital-Innovation/2526-DI-004-GoStrategy",
        trackRelease: true,
        link: "https://gostrategy.dotsem.be",
        linkTitle: "Play GoStrategy Live",
        linkOpenInNewTab: true,
        labels: ["WebSockets", "Go Concurrency", "NixOS Deployment"],
        status: ProjectStatus.InDevelopment,
    },
    {
        slug: "carpe-diem",
        image: "/projects/carpe-diem/logo.webp",
        languages: ["dart", "flutter"],
        highlighted: 2,
        category: "personal",
        repo: "dotsem/Carpe-Diem",
        linkOpenInNewTab: false,
        link: "#download-here",
        linkTitle: "Download Carpe Diem",
        trackRelease: true,
        labels: ["Mobile App", "Local-First Planning", "Productivity"],
        status: ProjectStatus.Finished,
    },
    {
        slug: "smart-jack",
        image: "/projects/smart-jack/logo.webp",
        languages: ["pygame", "raspberrypi", "py"],
        highlighted: false,
        category: "school",
        repo: "dotsem/lets-go-gambling",
        labels: ["IoT", "Game Development", "Hardware Integration"],
        status: ProjectStatus.Finished,
    },
    {
        slug: "philips-ble-robot",
        image: "/projects/philips-ble-robot/logo.webp",
        languages: ["cpp", "dart", "flutter"],
        highlighted: 2,
        category: "school",
        repo: ["dotsem/Philips-BLE-Robot-App", "dotsem/Philips-BLE-Robot-Code"],
        labels: [
            "Internship Project",
            "Embedded Systems",
            "Mobile App",
            "Bluetooth",
        ],
        status: ProjectStatus.Finished,
    },
    {
        slug: "portfolio",
        image: "/projects/portfolio/logo.webp",
        languages: ["ts", "svelte", "tailwind", "figma"],
        highlighted: 5,
        category: "personal",
        repo: "dotsem/dotsem.be",
        labels: ["Svelte 5", "i18n Support"],
        status: ProjectStatus.YouAreLookingAtIt,
    },
    {
        slug: "skil2-chez-natalie",
        image: "/projects/skil2-chez-natalie/logo.webp",
        languages: ["php", "laravel", "tailwind", "sql", "uml"],
        highlighted: false,
        category: "school",
        labels: ["Group Project", "TALL Stack", "B&B Webapp"],
        status: ProjectStatus.Finished,
    },
    {
        slug: "skil2-poutrel",
        image: "/projects/skil2-poutrel/logo.webp",
        languages: ["uml", "figma"],
        highlighted: false,
        category: "school",
        labels: ["UML Diagrams", "Figma Design", "Implementation Plan"],
        status: ProjectStatus.Finished,
    },
    {
        slug: "waaiburg-app",
        image: "/projects/waaiburg-app/logo.webp",
        languages: ["flutter", "dart"],
        highlighted: false,
        category: "di",
        repo: "Thomas-More-Digital-Innovation/2526-waai-001-waaiburg-mobile-app",
        labels: [
            "Mobile App Development",
            "Avatar Customization",
            "Caching & Performance",
        ],
        status: ProjectStatus.Finished,
    },
    {
        slug: "weighted-decision-matrix",
        image: "/projects/weighted-decision-matrix/logo.webp",
        languages: ["svelte", "ts", "tailwind"],
        highlighted: false,
        category: "personal",
        trackRelease: true,
        repo: "dotsem/Weighted-Decision-Matrix",
        link: "https://dotsem.github.io/Weighted-Decision-Matrix/",
        linkTitle: "Try it out yourself!",
        linkOpenInNewTab: true,
        labels: ["Decision Making", "Local Storage", "Markdown Export"],
        status: ProjectStatus.Finished,
    },
    {
        slug: "tusshi",
        image: "/projects/tusshi/logo.webp",
        languages: ["go"],
        highlighted: false,
        status: ProjectStatus.InProgress,
        category: "personal",
        repo: "dotsem/tusshi",
        trackRelease: true,
    },
    {
        slug: "whispertag",
        image: "/projects/whispertag/logo.svg",
        languages: ["react", "rust", "tauri", "ts", "tailwind"],
        highlighted: false,
        status: ProjectStatus.Finished,
        category: "di",
        repo: "Thomas-More-Digital-Innovation/2526-MOBI-016-I-m-in-tales-project",
    },
    {
        slug: "capyplayer",
        image: "/projects/capyplayer/realistic-vinyl-player.gif",
        languages: ["rust", "slint"],
        highlighted: false,
        status: ProjectStatus.InProgress,
        category: "personal",
        repo: "dotsem/capyplayer",
    },
];

export const contributions: Contribution[] = [
    {
        title: "fix mouse interactions being limited to LMB",
        repo: "VimYoung/Spell",
        prUrl: "https://github.com/VimYoung/Spell/pull/33",
        description:
            "Adds support between hardware key codes & the slint key enum. Via this way we can use all 5 (6 if we include other) mouse buttons that can be used in Slint.",
        status: "merged",
        languages: ["rust"],
    },
    {
        title: "feat: add toggle switch in settings to toggle mirror origin",
        repo: "jfchenier/dms-display-mirror",
        prUrl: "https://github.com/jfchenier/dms-display-mirror/pull/3",
        description:
            "This PR adds a toggle switch in the settings that adds the ability to toggle between mirroring from the current display or mirroring to the current display. This feature was introduced because it is sometimes more natural to mirror from a display (eg. giving a presentation).",
        status: "open",
        languages: ["qml"],
    },
    {
        title: "Add param to choose which monitor the window will be placed on",
        repo: "VimYoung/Spell",
        prUrl: "https://github.com/VimYoung/Spell/pull/10",
        description:
            "I'm using the spell framework to create my own shell for hyprland. Currently the spell framework was missing the feature to choose which monitor the window should be placed on.",
        status: "merged",
        languages: ["rust"],
    },
];
