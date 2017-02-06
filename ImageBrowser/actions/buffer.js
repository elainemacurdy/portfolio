export const UPDATE_BUFFER = "UPDATE_BUFFER";

export function updateBuffer (imageIds) {
    return {
        type: UPDATE_BUFFER,
        payload: imageIds
    };
}
