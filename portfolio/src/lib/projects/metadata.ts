export interface ProjectMetadata {
    slug: string;
    image: string;
    languages: string[];
    highlighted: boolean | number;
    repo?: string | string[] | { name: string; path: string }[];
    trackRelease?: boolean;
    link?: string;
    linkTitle?: string;
    labels?: string[];
    status?: string;
}

export const projectsMetadata: ProjectMetadata[] = [
    {
        slug: "gostrategy",
        image: "/projects/gostrategy/logo.webp",
        languages: ["svelte", "go", "ts", "tailwind", "postgresql", "docker", "nixos"],
        highlighted: 1,
        repo: "Thomas-More-Digital-Innovation/2526-DI-004-GoStrategy",
        trackRelease: true,
        link: "https://gostrategy.dotsem.be",
        linkTitle: "Play GoStrategy Live",
        labels: ["WebSockets", "Go Concurrency", "NixOS Deployment"],
        status: "In Development"
    },
    {
        slug: "carpe-diem",
        image: "/projects/carpe-diem/logo.webp",
        languages: ["dart", "flutter"],
        highlighted: 2,
        repo: "dotsem/Carpe-Diem",
        trackRelease: true,
        labels: ["Mobile App", "Local-First Planning", "Productivity"],
        status: "Finished"
    },
    {
        slug: "smart-jack",
        image: "/projects/smart-jack/logo.webp",
        languages: ["pygame", "raspberrypi", "py"],
        highlighted: 4,
        repo: "dotsem/lets-go-gambling",
        labels: ["IoT", "Game Development", "Hardware Integration"],
        status: "Finished"
    },
    {
        slug: "philips-ble-robot",
        image: "/projects/Philips-BLE-robot/logo.webp",
        languages: ["cpp", "dart", "flutter"],
        highlighted: 2,
        repo: ["dotsem/Philips-BLE-Robot-App", "dotsem/Philips-BLE-Robot-Code"],
        labels: ["Internship Project", "Embedded Systems", "Mobile App", "Bluetooth"],
        status: "Finished"
    },
    {
        slug: "portfolio",
        image: "/projects/portfolio/logo.webp",
        languages: ["ts", "svelte", "tailwind", "figma"],
        highlighted: 5,
        repo: "dotsem/dotsem.be",
        labels: ["Svelte 5", "i18n Support"],
        status: "You are looking at it!"
    },
    {
        slug: "skil2-chez-natalie",
        image: "/projects/skil2-chez-natalie/logo.webp",
        languages: ["php", "laravel", "tailwind", "sql", "uml"],
        highlighted: false,
        labels: ["Group Project", "TALL Stack", "B&B Webapp"],
        status: "In Progress"
    },
    {
        slug: "skil2-poutrel",
        image: "/projects/skil2-poutrel/logo.webp",
        languages: ["uml", "figma"],
        highlighted: false,
        labels: ["UML Diagrams", "Figma Design", "Implementation Plan"],
        status: "Finished"
    },
    {
        slug: "waaiburg-app",
        image: "/projects/waaiburg-app/logo.webp",
        languages: ["flutter", "dart"],
        highlighted: false,
        repo: "Thomas-More-Digital-Innovation/2526-waai-001-waaiburg-mobile-app",
        labels: ["Mobile App Development", "Avatar Customization", "Caching & Performance"],
        status: "Finished"
    },
    {
        slug: "weighted-decision-matrix",
        image: "/projects/weighted-decision-matrix/logo.webp",
        languages: ["svelte", "ts", "tailwind"],
        highlighted: false,
        trackRelease: true,
        repo: "dotsem/Weighted-Decision-Matrix",
        link: "https://dotsem.github.io/Weighted-Decision-Matrix/",
        linkTitle: "Try it out yourself!",
        labels: ["Decision Making", "Local Storage", "Markdown Export"],
        status: "Finished"
    }
];
