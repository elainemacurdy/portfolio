import _ from "lodash";

import {
    UPDATE_BUFFER
} from "../actions/buffer";

export const initialState = [];

export default function buffer (state = initialState, action) {
    let newBuffer = state;
    switch (action.type) {
        case UPDATE_BUFFER:
            if (_.isArray(action.payload)) {
                newBuffer = action.payload.slice();
            }
            return newBuffer;
        default:
            return newBuffer;
    }
}
