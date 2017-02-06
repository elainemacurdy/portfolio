import expect from "expect";

import * as actions from "../../../actions/api/images";
import images, { initialState } from "../../../reducers/api/images";

describe("reducers", () => {
    describe("api", () => {
        describe("images", () => {
            it("should handle the default state", () => {
                const reducer = images(initialState, {});
                expect(reducer).toEqual(initialState);
            });

            it("should handle LOAD_IMAGES_REQUEST", () => {
                const reducer = images(initialState, actions.loadImagesRequest());
                expect(reducer).toEqual(Object.assign({}, initialState, {
                    isPending: true
                }));
            });

            it("should handle LOAD_IMAGES_SUCCESS", () => {
                const payload = ["abc", "def", "ghi", "jkl", "mno"];
                const reducer = images(initialState, actions.loadImagesSuccess(payload));
                expect(reducer).toEqual(Object.assign({}, initialState, {
                    imageIds: payload,
                    isPending: false
                }));
            });

            it("should handle LOAD_IMAGES_FAILURE", () => {
                const error = 500;
                const reducer = images(initialState, actions.loadImagesFailure(error));
                expect(reducer).toEqual(Object.assign({}, initialState, {
                    error: error,
                    isPending: false
                }));
            });
        });
    });
});
