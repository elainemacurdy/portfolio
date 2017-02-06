import _ from "lodash";

import {
    CLOSE_LIGHTBOX,
    NAVIGATE_IN_LIGHTBOX,
    OPEN_LIGHTBOX
} from "../actions/lightbox";

export const initialState = {
    currentImageIndex: -1,
    isOpen: false
};

export default function lightbox (state = initialState, action) {
    let newState = state;
    let payload = action.payload;
    switch (action.type) {
        case CLOSE_LIGHTBOX:
            return Object.assign({}, state, {
                currentImageIndex: -1, // not strictly necessary but nice to reset
                isOpen: false
            });
        case NAVIGATE_IN_LIGHTBOX:
            if (_.isString(payload)) {
                payload = parseInt(payload, 10);
            }
            if (_.isNumber(payload) && !isNaN(payload)) {
                newState = Object.assign({}, state, {
                    currentImageIndex: payload
                });
            }
            return newState;
        case OPEN_LIGHTBOX:
            if (_.isString(payload)) {
                payload = parseInt(payload, 10);
            }
            if (_.isNumber(payload) && !isNaN(payload)) {
                newState = Object.assign({}, state, {
                    currentImageIndex: payload,
                    isOpen: true
                });
            }
            return newState;
        default:
            return newState;
    }
}
