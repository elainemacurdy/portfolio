import expect from "expect";
import * as actions from "../../actions/favorites";

describe("actions", () => {
    describe("favorites", () => {
        it("should correctly create the updateFavorites action", () => {
            const imageIds = ["a", "b", "c"];
            const action = actions.updateFavorites(imageIds);
            expect(action.type).toEqual(actions.UPDATE_FAVORITES);
            expect(action.payload).toEqual(imageIds);
        });
    });
});
