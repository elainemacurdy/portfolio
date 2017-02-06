import expect from "expect";

import * as actions from "../../actions/buffer";
import buffer, { initialState } from "../../reducers/buffer";

describe("reducers", () => {
    describe("buffer", () => {
        it("should handle the default state", () => {
            const reducer = buffer(initialState, {});
            expect(reducer).toEqual(initialState);
        });

        it("should handle UPDATE_BUFFER: valid payload", () => {
            const imageIds = ["a", "b", "c"];
            const reducer = buffer(initialState, {
                type: actions.UPDATE_BUFFER,
                payload: imageIds
            });
            expect(reducer).toEqual(imageIds);
        });

        it("should handle UPDATE_BUFFER: invalid payload", () => {
            const imageIds = "a";
            const reducer = buffer(initialState, {
                type: actions.UPDATE_BUFFER,
                payload: imageIds
            });
            expect(reducer).toEqual(initialState);
        });
    });
});
