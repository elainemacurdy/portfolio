import {
    LOAD_IMAGES_REQUEST,
    LOAD_IMAGES_SUCCESS,
    LOAD_IMAGES_FAILURE
} from "../../actions/api/images";

export const initialState = {
    error: null,
    imageIds: null,
    isPending: false
};

export default function images (state = initialState, action) {
    switch (action.type) {
        case LOAD_IMAGES_REQUEST:
            return Object.assign({}, state, {
                error: null,
                isPending: true
            });
        case LOAD_IMAGES_SUCCESS:
            return Object.assign({}, state, {
                error: null,
                imageIds: action.payload,
                isPending: false
            });
        case LOAD_IMAGES_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isPending: false
            });
        default:
            return state;
    }
}
