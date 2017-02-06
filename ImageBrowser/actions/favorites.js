export const UPDATE_FAVORITES = "UPDATE_FAVORITES";

export function updateFavorites (imageIds) {
    return {
        type: UPDATE_FAVORITES,
        payload: imageIds
    };
}
