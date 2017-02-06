import expect from "expect";
import expectJSX from "expect-jsx";
import React from "react";
import { createRenderer } from "react-addons-test-utils";

import { Root } from "../../components/Root";

expect.extend(expectJSX);

const getRenderedElement = function(propOverrides) {
    const renderer = createRenderer();
    const props = Object.assign({
        dispatch: () => {}
    }, propOverrides);
    renderer.render(
        <Root {...props} />
    );
    return renderer.getRenderOutput();
};


describe("components", () => {
    describe("Root", () => {
        it("renders with no children", () => {
            const actual = getRenderedElement();
            const expected = (
                <div></div>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("renders with one child", () => {
            const actual = getRenderedElement({
                children: [
                    <span className="one" key="0"></span>
                ]
            });
            const expected = (
                <div>
                    <span className="one"></span>
                </div>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("renders with many children", () => {
            const actual = getRenderedElement({
                children: [
                    <span className="one" key="0"></span>,
                    <div className="two" key="1"></div>,
                    <img className="three" key="2"/>
                ]
            });
            const expected = (
                <div>
                    <span className="one"></span>
                    <div className="two"></div>
                    <img className="three"/>
                </div>
            );
            expect(actual).toEqualJSX(expected);
        });
    });
});
