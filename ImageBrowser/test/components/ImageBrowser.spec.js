import expect from "expect";
import expectJSX from "expect-jsx";
import _ from "lodash";
import React from "react";
import { createRenderer, renderIntoDocument } from "react-addons-test-utils";

import { getFakeDomElement, getFakeEvent } from "../testUtils/componentUtils"
import { updateBuffer } from "../../actions/buffer";
import { updateFavorites } from "../../actions/favorites";
import { loadImagesRequest } from "../../actions/api/images";
import Button, { ButtonTypes } from "../../components/Button";
import FavoritesPreview from "../../components/FavoritesPreview";
import { ImageBrowser } from "../../components/ImageBrowser";
import { imageIdToLightboxDataSelector } from "../../selectors/images";

expect.extend(expectJSX);

const defaultProps = {
    api: {
        images: {
            imageIds: [],
            isPending: false
        }
    },
    buffer: [],
    dispatch: () => {},
    favorites: [],
    lightbox: {
        currentImageIndex: -1,
        isOpen: false
    }
};

const getRenderedElement = function(propOverrides) {
    const renderer = createRenderer();
    const props = Object.assign({}, defaultProps, propOverrides);
    const component = (<ImageBrowser {...props} />);
    renderer.render(component);
    return {
        element: renderer.getRenderOutput(),
        instance: renderIntoDocument(component)
    };
};


describe("components", () => {
    describe("ImageBrowser", () => {
        it("renders with no data in buffer", () => {
            const actual = getRenderedElement().element;
            const expected = (
                <div className="imageBrowser">
                    <FavoritesPreview
                        dispatch={defaultProps.dispatch}
                        favorites={defaultProps.favorites}
                        lightbox={defaultProps.lightbox}
                    />
                </div>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("renders with populated buffer", () => {
            const buffer = ["abc", "def", "ghi"];
            const actual = getRenderedElement({
                buffer: buffer
            }).element;
            const placeholderFunc = () => {};
            const expected = (
                <div className="imageBrowser">
                    <div>
                        <img
                            className="mainImage"
                            src={imageIdToLightboxDataSelector(buffer[0]).src}
                        />
                        <div className="buttons">
                            <Button
                                clickArgs={[buffer[0]]}
                                handleClick={placeholderFunc}
                                type={ButtonTypes.ICON}
                                typeData={{ iconName: "remove" }}
                            />
                            <Button
                                clickArgs={[buffer[0]]}
                                handleClick={placeholderFunc}
                                type={ButtonTypes.ICON}
                                typeData={{ iconName: "addToFavorites" }}
                            />
                        </div>
                    </div>
                    <FavoritesPreview
                        dispatch={defaultProps.dispatch}
                        favorites={defaultProps.favorites}
                        lightbox={defaultProps.lightbox}
                    />
                </div>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("executes appropriate actions when rendered", () => {
            const props = {
                dispatch: expect.createSpy()
            };
            // Rendering it should kick the componentDidMount() method, which calls dispatch().
            getRenderedElement(props);
            expect(props.dispatch).toHaveBeenCalledWith(loadImagesRequest());
        });

        it("executes appropriate action new image ids return from the services", () => {
            const currentBuffer = ["abc", "def", "efg"];
            const nextImageIds = ["hij", "klm", "nop", "qrs", "tuv"];
            const nextBuffer = [].concat(currentBuffer).concat(nextImageIds);
            const props = {
                buffer: currentBuffer,
                dispatch: expect.createSpy(),
                images: {
                    imageIds: []
                }
            };

            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleChangeProps(nextImageIds, props.buffer);
            expect(props.dispatch).toHaveBeenCalledWith(updateBuffer(nextBuffer));
        });

        it("executes appropriate action when only two images are left in the buffer", () => {
            const buffer = ["abc", "def", "ghi"];
            const nextBuffer = ["abc", "def"];
            const props = {
                buffer: buffer,
                dispatch: expect.createSpy()
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleChangeProps(defaultProps.api.images.imageIds, nextBuffer);
            expect(props.dispatch).toHaveBeenCalledWith(loadImagesRequest());
        });

        it("executes appropriate action when the user clicks 'remove'", () => {
            const buffer = ["abc", "def", "efg", "hij", "klm", "nop", "qrs", "tuv"];
            let imageId = "abc";
            const props = {
                buffer: buffer,
                dispatch: expect.createSpy()
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleClickDislike(getFakeEvent(), imageId);
            expect(props.dispatch).toHaveBeenCalledWith(updateBuffer(_.without(buffer, imageId)));
        });

        it("executes appropriate action when the user clicks 'add to favorites'", () => {
            const buffer = ["abc", "def", "efg", "hij", "klm"];
            const favorites = ["nop", "qrs", "tuv"];
            let imageId = "abc";
            const props = {
                buffer: buffer,
                dispatch: expect.createSpy(),
                favorites: favorites
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleClickAddToFavorites(getFakeEvent(), imageId);
            expect(props.dispatch).toHaveBeenCalledWith(updateFavorites([imageId].concat(favorites)));
            expect(props.dispatch).toHaveBeenCalledWith(updateBuffer(_.without(buffer, imageId)));
        });
    });
});
