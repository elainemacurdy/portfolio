import expect from "expect";
import expectJSX from "expect-jsx";
import React from "react";
import { createRenderer } from "react-addons-test-utils";

import Icon from "../../components/Icon";
import icons from "../../static/icons.json";

expect.extend(expectJSX);

const getRenderedElement = function(propOverrides) {
    const renderer = createRenderer();
    const props = Object.assign({ name: "" }, propOverrides);
    renderer.render(
        <Icon {...props} />
    );
    return renderer.getRenderOutput();
};


describe("components", () => {
    describe("Icon", () => {
        it("renders correctly", () => {
            const name = "favorites";
            const props = {
                name: name
            };
            const icon = icons[name];
            const actual = getRenderedElement(props);
            const expected = (
                <svg
                    className="icon"
                    viewBox={icon.viewBox}
                >
                    <title>{name}</title>
                    <desc>{icon.credit}</desc>
                    <path d={icon.path}></path>
                </svg>
            );
            expect(actual).toEqualJSX(expected);
        });
    });
});
