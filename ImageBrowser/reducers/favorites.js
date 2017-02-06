import _ from "lodash";

import {
    UPDATE_FAVORITES
} from "../actions/favorites";

export const initialState = [];

export default function favorites (state = initialState, action) {
    let newFavorites = state;
    switch (action.type) {
        case UPDATE_FAVORITES:
            if (_.isArray(action.payload)) {
                newFavorites = action.payload.slice();
            }
            return newFavorites;
        default:
            return state;
    }
}
