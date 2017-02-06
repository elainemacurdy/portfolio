import expect from "expect";
import expectJSX from "expect-jsx";
import _ from "lodash";
import React from "react";
import { createRenderer, renderIntoDocument } from "react-addons-test-utils";
import Lightbox from "react-images";

import { getActionComparison, getFakeDomElement, getFakeEvent } from "../testUtils/componentUtils"
import { updateFavorites } from "../../actions/favorites";
import { closeLightbox, navigateTo, openLightbox } from "../../actions/lightbox";
import Button, { ButtonTypes } from "../../components/Button";
import FavoritesPreview from "../../components/FavoritesPreview";
import Icon from "../../components/Icon"
import { imageIdsToLightboxDataSelector } from "../../selectors/images";

expect.extend(expectJSX);

const defaultProps = {
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
    const component = (<FavoritesPreview {...props} />);
    renderer.render(component);
    return {
        element: renderer.getRenderOutput(),
        instance: renderIntoDocument(component)
    };
};


describe("components", () => {
    describe("FavoritesPreview", () => {
        it("renders with no favorites", () => {
            const actual = getRenderedElement().element;
            const expected = (
                <div></div>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("renders with populated favorites, but no currentImageIndex for lightbox", () => {
            const favorites = ["abc", "def"];
            const actual = getRenderedElement({
                favorites: favorites
            }).element;
            const urlData = imageIdsToLightboxDataSelector(favorites);
            const placeholderFunc = () => {};
            const customControls = (
                <div className="lightboxCustomControls" key={0}></div>
            );
            const expected = (
                <div>
                    <div className="favoritesPreview">
                        <h4>
                            <Icon name="favorites" />
                        </h4>
                        <div className="scrollContainer">
                            <Button
                                clickArgs={[0]}
                                handleClick={placeholderFunc}
                                key={0}
                                type={ButtonTypes.IMAGE}
                                typeData={{ imagePath: urlData[0].thumbnail }}
                            />
                            <Button
                                clickArgs={[1]}
                                handleClick={placeholderFunc}
                                key={1}
                                type={ButtonTypes.IMAGE}
                                typeData={{ imagePath: urlData[1].thumbnail }}
                            />
                        </div>
                        <Lightbox
                            backdropClosesModal={true}
                            currentImage={defaultProps.lightbox.currentImageIndex}
                            customControls={[customControls]}
                            images={urlData}
                            isOpen={defaultProps.lightbox.isOpen}
                            onClickImage={placeholderFunc}
                            onClickNext={placeholderFunc}
                            onClickPrev={placeholderFunc}
                            onClickThumbnail={placeholderFunc}
                            onClose={placeholderFunc}
                            showImageCount={false}
                            showThumbnails={true}
                        />
                    </div>
                </div>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("renders with populated favorites, and a valid currentImageIndex for lightbox", () => {
            const props = {
                favorites: ["abc", "def"],
                lightbox: {
                    currentImageIndex: 1,
                    isOpen: false
                }
            };
            const actual = getRenderedElement(props).element;
            const urlData = imageIdsToLightboxDataSelector(props.favorites);
            const placeholderFunc = () => {};
            const customControls = (
                <div className="lightboxCustomControls" key={0}>
                    <Button
                        clickArgs={["def"]}
                        handleClick={placeholderFunc}
                        type={ButtonTypes.ICON}
                        typeData={{ iconName: "removeFromFavorites" }}
                    />
                </div>
            );
            const expected = (
                <div>
                    <div className="favoritesPreview">
                        <h4>
                            <Icon name="favorites" />
                        </h4>
                        <div className="scrollContainer">
                            <Button
                                clickArgs={[0]}
                                handleClick={placeholderFunc}
                                key={0}
                                type={ButtonTypes.IMAGE}
                                typeData={{ imagePath: urlData[0].thumbnail }}
                            />
                            <Button
                                clickArgs={[1]}
                                handleClick={placeholderFunc}
                                key={1}
                                type={ButtonTypes.IMAGE}
                                typeData={{ imagePath: urlData[1].thumbnail }}
                            />
                        </div>
                        <Lightbox
                            backdropClosesModal={true}
                            currentImage={props.lightbox.currentImageIndex}
                            customControls={[customControls]}
                            images={urlData}
                            isOpen={props.lightbox.isOpen}
                            onClickImage={placeholderFunc}
                            onClickNext={placeholderFunc}
                            onClickPrev={placeholderFunc}
                            onClickThumbnail={placeholderFunc}
                            onClose={placeholderFunc}
                            showImageCount={false}
                            showThumbnails={true}
                        />
                    </div>
                </div>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("does not render open lightbox with valid lightbox data, but no favorites", () => {
            const props = {
                lightbox: {
                    currentImageIndex: 1,
                    isOpen: true
                }
            };
            const actual = getRenderedElement(props).element;
            const expected = (
                <div></div>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("renders open lightbox with populated favorites", () => {
            const props = {
                favorites: ["abc", "def"],
                lightbox: {
                    currentImageIndex: 1,
                    isOpen: true
                }
            };
            const actual = getRenderedElement(props).element;
            const urlData = imageIdsToLightboxDataSelector(props.favorites);
            const placeholderFunc = () => {};
            const customControls = (
                <div className="lightboxCustomControls" key={0}>
                    <Button
                        clickArgs={["def"]}
                        handleClick={placeholderFunc}
                        type={ButtonTypes.ICON}
                        typeData={{ iconName: "removeFromFavorites" }}
                    />
                </div>
            );
            const expected = (
                <div>
                    <div className="favoritesPreview">
                        <h4>
                            <Icon name="favorites" />
                        </h4>
                        <div className="scrollContainer">
                            <Button
                                clickArgs={[0]}
                                handleClick={placeholderFunc}
                                key={0}
                                type={ButtonTypes.IMAGE}
                                typeData={{ imagePath: urlData[0].thumbnail }}
                            />
                            <Button
                                clickArgs={[1]}
                                handleClick={placeholderFunc}
                                key={1}
                                type={ButtonTypes.IMAGE}
                                typeData={{ imagePath: urlData[1].thumbnail }}
                            />
                        </div>
                        <Lightbox
                            backdropClosesModal={true}
                            currentImage={props.lightbox.currentImageIndex}
                            customControls={[customControls]}
                            images={urlData}
                            isOpen={props.lightbox.isOpen}
                            onClickImage={placeholderFunc}
                            onClickNext={placeholderFunc}
                            onClickPrev={placeholderFunc}
                            onClickThumbnail={placeholderFunc}
                            onClose={placeholderFunc}
                            showImageCount={false}
                            showThumbnails={true}
                        />
                    </div>
                </div>
            );
            expect(actual).toEqualJSX(expected);
        });

        it("executes appropriate action when the user clicks on a preview thumbnail", () => {
            const imageIndex = 42;
            const props = {
                dispatch: expect.createSpy()
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;
            const fakeThumbnail = getFakeDomElement("img", { "data-thumbnail-index": imageIndex });

            instance.handleClickPreviewThumbnail(getFakeEvent({ target: fakeThumbnail }), imageIndex);
            expect(props.dispatch).toHaveBeenCalledWith(openLightbox(imageIndex));
        });

        it("executes appropriate action when the user closes the lightbox", () => {
            const props = {
                dispatch: expect.createSpy()
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleClickLightboxClose(getFakeEvent());
            expect(props.dispatch).toHaveBeenCalledWith(closeLightbox());
        });

        it("executes appropriate action when the user navigates 'next' in the lightbox", () => {
            const imageIndex = 42;
            const props = {
                dispatch: expect.createSpy(),
                lightbox: { currentImageIndex: imageIndex }
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleClickLightboxNext(getFakeEvent());
            expect(props.dispatch).toHaveBeenCalledWith(navigateTo(imageIndex + 1));
        });

        it("executes appropriate action when the user navigates 'previous' in the lightbox", () => {
            const imageIndex = 42;
            const props = {
                dispatch: expect.createSpy(),
                lightbox: { currentImageIndex: imageIndex }
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleClickLightboxPrevious(getFakeEvent());
            expect(props.dispatch).toHaveBeenCalledWith(navigateTo(imageIndex - 1));
        });

        it("executes appropriate action when the user clicks on a lightbox thumbnail", () => {
            const imageIndex = 42;
            const props = {
                dispatch: expect.createSpy()
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleClickLightboxThumbnail(imageIndex);
            expect(props.dispatch).toHaveBeenCalledWith(navigateTo(imageIndex));
        });

        it("executes appropriate action when the user un-favorites an image", () => {
            const imageIndex = 1;
            const props = {
                dispatch: expect.createSpy(),
                favorites: ["a", "b", "c"],
                lightbox: { currentImageIndex: imageIndex }
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleClickUnFavorite(getFakeEvent(), props.favorites[imageIndex]);
            expect(props.dispatch).toHaveBeenCalledWith(updateFavorites(["a", "c"]));
        });

        it("executes appropriate action when the user un-favorites the tail image in the list", () => {
            const imageIndex = 2;
            const props = {
                dispatch: expect.createSpy(),
                favorites: ["a", "b", "c"],
                lightbox: { currentImageIndex: imageIndex }
            };
            const rendered = getRenderedElement(props);
            const instance = rendered.instance;

            instance.handleClickUnFavorite(getFakeEvent(), props.favorites[imageIndex]);

            expect(props.dispatch).toHaveBeenCalledWith(navigateTo(1));
            expect(props.dispatch).toHaveBeenCalledWith(updateFavorites(["a", "b"]));
        });
    });
});
