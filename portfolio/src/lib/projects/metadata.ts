export enum ProjectStatus {
    Finished = 'Finished',
    InDevelopment = 'In Development',
    InProgress = 'In Progress',
    YouAreLookingAtIt = 'You are looking at it!'
}

export interface ProjectMetadata {
    slug: string;
    image: string;
    languages: string[];
    highlighted: boolean | number;
    repo?: string | string[] | { name: string; path: string }[];
    trackRelease?: boolean;
    link?: string;
    linkOpenInNewTab?: boolean;
    linkTitle?: string;
    labels?: string[];
    status?: ProjectStatus | string;
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
        linkOpenInNewTab: true,
        labels: ["WebSockets", "Go Concurrency", "NixOS Deployment"],
        status: ProjectStatus.InDevelopment
    },
    {
        slug: "carpe-diem",
        image: "/projects/carpe-diem/logo.webp",
        languages: ["dart", "flutter"],
        highlighted: 2,
        repo: "dotsem/Carpe-Diem",
        linkOpenInNewTab: false,
        link: "#download-here",
        linkTitle: "Download Carpe Diem",
        trackRelease: true,
        labels: ["Mobile App", "Local-First Planning", "Productivity"],
        status: ProjectStatus.Finished
    },
    {
        slug: "smart-jack",
        image: "/projects/smart-jack/logo.webp",
        languages: ["pygame", "raspberrypi", "py"],
        highlighted: 4,
        repo: "dotsem/lets-go-gambling",
        labels: ["IoT", "Game Development", "Hardware Integration"],
        status: ProjectStatus.Finished
    },
    {
        slug: "philips-ble-robot",
        image: "/projects/Philips-BLE-robot/logo.webp",
        languages: ["cpp", "dart", "flutter"],
        highlighted: 2,
        repo: ["dotsem/Philips-BLE-Robot-App", "dotsem/Philips-BLE-Robot-Code"],
        labels: ["Internship Project", "Embedded Systems", "Mobile App", "Bluetooth"],
        status: ProjectStatus.Finished
    },
    {
        slug: "portfolio",
        image: "/projects/portfolio/logo.webp",
        languages: ["ts", "svelte", "tailwind", "figma"],
        highlighted: 5,
        repo: "dotsem/dotsem.be",
        labels: ["Svelte 5", "i18n Support"],
        status: ProjectStatus.YouAreLookingAtIt
    },
    {
        slug: "skil2-chez-natalie",
        image: "/projects/skil2-chez-natalie/logo.webp",
        languages: ["php", "laravel", "tailwind", "sql", "uml"],
        highlighted: false,
        labels: ["Group Project", "TALL Stack", "B&B Webapp"],
        status: ProjectStatus.InProgress
    },
    {
        slug: "skil2-poutrel",
        image: "/projects/skil2-poutrel/logo.webp",
        languages: ["uml", "figma"],
        highlighted: false,
        labels: ["UML Diagrams", "Figma Design", "Implementation Plan"],
        status: ProjectStatus.Finished
    },
    {
        slug: "waaiburg-app",
        image: "/projects/waaiburg-app/logo.webp",
        languages: ["flutter", "dart"],
        highlighted: false,
        repo: "Thomas-More-Digital-Innovation/2526-waai-001-waaiburg-mobile-app",
        labels: ["Mobile App Development", "Avatar Customization", "Caching & Performance"],
        status: ProjectStatus.Finished
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
        status: ProjectStatus.Finished
    }
];
