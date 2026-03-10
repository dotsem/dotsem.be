let observer: IntersectionObserver | null = null;
const callbacks = new Map<Element, (isIntersecting: boolean) => void>();

function getObserver() {
    if (typeof window === "undefined") return null;

    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const callback = callbacks.get(entry.target);
                    if (callback) {
                        callback(entry.isIntersecting);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px" // Trigger slightly before it fully comes into view
            }
        );
    }
    return observer;
}

export function observeInit(node: HTMLElement, callback: (isIntersecting: boolean) => void) {
    const obs = getObserver();
    if (!obs) return;

    callbacks.set(node, callback);
    obs.observe(node);

    return {
        destroy() {
            callbacks.delete(node);
            obs.unobserve(node);
        }
    };
}
