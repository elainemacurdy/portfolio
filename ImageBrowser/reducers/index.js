import { combineReducers } from "redux";

import api from "./api";
import buffer from "./buffer";
import favorites from "./favorites";
import lightbox from "./lightbox";

export default combineReducers({
    api: api,
    buffer: buffer,
    favorites: favorites,
    lightbox: lightbox
});
