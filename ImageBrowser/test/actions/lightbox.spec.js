import expect from "expect";
import * as actions from "../../actions/lightbox";

describe("actions", () => {
    describe("lightbox", () => {
        it("should correctly create the closeLightbox action", () => {
            const action = actions.closeLightbox();
            expect(action.type).toEqual(actions.CLOSE_LIGHTBOX);
        });

        it("should correctly create the navigateTo action", () => {
            const imageIndex = 42;
            const action = actions.navigateTo(imageIndex);
            expect(action.type).toEqual(actions.NAVIGATE_IN_LIGHTBOX);
            expect(action.payload).toEqual(imageIndex);
        });

        it("should correctly create the openLightbox action", () => {
            const imageIndex = 42;
            const action = actions.openLightbox(imageIndex);
            expect(action.type).toEqual(actions.OPEN_LIGHTBOX);
            expect(action.payload).toEqual(imageIndex);
        });
    });
});
