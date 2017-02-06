import expect from "expect";
import * as actions from "../../actions/buffer";

describe("actions", () => {
    describe("buffer", () => {
        it("should correctly create the updateBuffer action", () => {
            const imageIds = ["a", "b", "c"];
            const action = actions.updateBuffer(imageIds);
            expect(action.type).toEqual(actions.UPDATE_BUFFER);
            expect(action.payload).toEqual(imageIds);
        });
    });
});
