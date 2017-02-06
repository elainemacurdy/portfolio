import expect from "expect";

import * as actions from "../../actions/favorites";
import favorites, { initialState } from "../../reducers/favorites";

describe("reducers", () => {
    describe("favorites", () => {
        it("should handle the default state", () => {
            const reducer = favorites(initialState, {});
            expect(reducer).toEqual(initialState);
        });

        it("should handle UPDATE_FAVORITES: valid payload", () => {
            const imageIds = ["a", "b", "c"];
            const reducer = favorites(initialState, {
                type: actions.UPDATE_FAVORITES,
                payload: imageIds
            });
            expect(reducer).toEqual(imageIds);
        });

        it("should handle UPDATE_FAVORITES: invalid payload", () => {
            const imageIds = "a";
            const reducer = favorites(initialState, {
                type: actions.UPDATE_FAVORITES,
                payload: imageIds
            });
            expect(reducer).toEqual(initialState);
        });
    });
});
