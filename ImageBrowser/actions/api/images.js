import fetch from "isomorphic-fetch";

export const LOAD_IMAGES_REQUEST = "LOAD_IMAGES_REQUEST";
export const LOAD_IMAGES_SUCCESS = "LOAD_IMAGES_SUCCESS";
export const LOAD_IMAGES_FAILURE = "LOAD_IMAGES_FAILURE";

export function loadImages (dispatch) {
    const headers = {
        method: "get",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    };

    dispatch(loadImagesRequest());

    return (dispatch) => {
        return fetch("/apartmenttherapy/admin/galleries/sample.json", headers)
            .then((response) => {
                if (response.status !== 200) {
                    dispatch(loadImagesFailure(response.status));
                } else {
                    return response.json();
                }
            })
            .then((response) => {
                dispatch(loadImagesSuccess(response));
            })
            .catch((error) => {
                dispatch(loadImagesFailure(error));
            });
    };
}

export function loadImagesFailure (error) {
    return {
        type: LOAD_IMAGES_FAILURE,
        error: error
    };
}

export function loadImagesRequest () {
    return {
        type: LOAD_IMAGES_REQUEST
    };
}

export function loadImagesSuccess (payload) {
    return {
        type: LOAD_IMAGES_SUCCESS,
        payload: payload
    };
}

