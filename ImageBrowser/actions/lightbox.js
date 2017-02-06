export const CLOSE_LIGHTBOX = "CLOSE_LIGHTBOX";
export const NAVIGATE_IN_LIGHTBOX = "NAVIGATE_IN_LIGHTBOX";
export const OPEN_LIGHTBOX = "OPEN_LIGHTBOX";

export function closeLightbox () {
    return {
        type: CLOSE_LIGHTBOX
    };
}

export function navigateTo (imageIndex) {
    return {
        type: NAVIGATE_IN_LIGHTBOX,
        payload: imageIndex
    };
}

export function openLightbox (imageIndex) {
    return {
        type: OPEN_LIGHTBOX,
        payload: imageIndex
    };
}
