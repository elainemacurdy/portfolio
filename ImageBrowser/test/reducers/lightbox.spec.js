import expect from "expect";

import * as actions from "../../actions/lightbox";
import buffer, { initialState } from "../../reducers/lightbox";

describe("reducers", () => {
    describe("lightbox", () => {
        it("should handle the default state", () => {
            const reducer = buffer(initialState, {});
            expect(reducer).toEqual(initialState);
        });

        it("should handle CLOSE_LIGHTBOX", () => {
            const reducer = buffer(initialState, {
                type: actions.CLOSE_LIGHTBOX
            });
            expect(reducer).toEqual(Object.assign({}, initialState, {
                isOpen: false
            }));
        });

        it("should handle NAVIGATE_IN_LIGHTBOX: valid payload", () => {
            // valid number
            let imageIndex = 42;
            let reducer = buffer(initialState, {
                type: actions.NAVIGATE_IN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(Object.assign({}, initialState, {
                currentImageIndex: imageIndex
            }));

            // valid string
            imageIndex = "42";
            reducer = buffer(initialState, {
                type: actions.NAVIGATE_IN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(Object.assign({}, initialState, {
                currentImageIndex: parseInt(imageIndex, 10)
            }));
        });

        it("should handle NAVIGATE_IN_LIGHTBOX: invalid payload", () => {
            // invalid number
            let imageIndex = NaN;
            let reducer = buffer(initialState, {
                type: actions.NAVIGATE_IN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(initialState);

            // invalid string
            imageIndex = "abc";
            reducer = buffer(initialState, {
                type: actions.NAVIGATE_IN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(initialState);

            // invalid datatype
            imageIndex = {};
            reducer = buffer(initialState, {
                type: actions.NAVIGATE_IN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(initialState);

            // undef
            imageIndex = undefined;
            reducer = buffer(initialState, {
                type: actions.NAVIGATE_IN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(initialState);
        });

        it("should handle OPEN_LIGHTBOX: valid payload", () => {
            // valid number
            let imageIndex = 42;
            let reducer = buffer(initialState, {
                type: actions.OPEN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(Object.assign({}, initialState, {
                currentImageIndex: imageIndex,
                isOpen: true
            }));

            // valid string
            imageIndex = "42";
            reducer = buffer(initialState, {
                type: actions.OPEN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(Object.assign({}, initialState, {
                currentImageIndex: parseInt(imageIndex, 10),
                isOpen: true
            }));
        });

        it("should handle OPEN_LIGHTBOX: invalid payload", () => {
            // invalid number
            let imageIndex = NaN;
            let reducer = buffer(initialState, {
                type: actions.OPEN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(initialState);

            // invalid string
            imageIndex = "abc";
            reducer = buffer(initialState, {
                type: actions.OPEN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(initialState);

            // invalid datatype
            imageIndex = {};
            reducer = buffer(initialState, {
                type: actions.OPEN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(initialState);

            // undef
            imageIndex = undefined;
            reducer = buffer(initialState, {
                type: actions.OPEN_LIGHTBOX,
                payload: imageIndex
            });
            expect(reducer).toEqual(initialState);
        });
    });
});
