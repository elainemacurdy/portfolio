import expect from "expect";

import * as actions from "../../../actions/api/images";

describe("actions", () => {
    describe("api", () => {
        describe("images", () => {
            it("should correctly create the loadImages action", () => {
                const dispatch = expect.createSpy();
                const actionFunction = actions.loadImages(dispatch);
                expect(actionFunction).toBeA("function");
                expect(dispatch).toHaveBeenCalledWith(actions.loadImagesRequest());
            });
        });
    });
});
