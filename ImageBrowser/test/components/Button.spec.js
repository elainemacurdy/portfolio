import expect from "expect";
import expectJSX from "expect-jsx";
import React from "react";
import { createRenderer } from "react-addons-test-utils";

import Button, { ButtonTypes } from "../../components/Button";
import Icon from "../../components/Icon";

expect.extend(expectJSX);

const getRenderedElement = function(propOverrides, throwsData) {
    const renderer = createRenderer();
    const props = Object.assign({
        clickArgs: [],
        handleClick: () => {},
        type: -1,
        typeData: {}
    }, propOverrides);
    if (!throwsData) {
        renderer.render(
            <Button {...props} />
        );
        return renderer.getRenderOutput();
    } else {
        expect(() => {
            renderer.render(
                <Button {...props} />
            );
        }).toThrow(throwsData.error, throwsData.message);
    }
};


describe("components", () => {
    describe("Button", () => {
        it("renders icon correctly with valid data", () => {
            const props = {
                clickArgs: [],
                type: ButtonTypes.ICON,
                typeData: { iconName: "remove" }
            };
            const actual = getRenderedElement(props);
            const expected = (
                <button className="atButton" onClick={() => {}}>
                    <Icon name={props.typeData.iconName} />
                </button>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("throws with invalid icon data", () => {
            const props = {
                clickArgs: [],
                type: ButtonTypes.ICON,
                typeData: { foo: "remove" }
            };
            // This will expect the render() method to throw.
            getRenderedElement(props, {
                error: /iconName/,
                message: "Rendering an ICON button without specifying an iconType should throw."
            });
        });

        it("renders image correctly with valid data", () => {
            const props = {
                clickArgs: [],
                type: ButtonTypes.IMAGE,
                typeData: { imagePath: "http://fake.com/foo.gif" }
            };
            const actual = getRenderedElement(props);
            const expected = (
                <button className="atButton" onClick={() => {}}>
                    <img src={props.typeData.imagePath} />
                </button>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("throws with invalid image data", () => {
            const props = {
                clickArgs: [],
                type: ButtonTypes.IMAGE,
                typeData: { foo: "http://fake.com/foo.gif" }
            };
            // This will expect the render() method to throw.
            getRenderedElement(props, {
                error: /imagePath/,
                message: "Rendering an IMAGE button without specifying an imagePath should throw."
            });
        });
    });
});
