import { autobind } from "core-decorators";
import _ from "lodash";
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import Button, { ButtonTypes } from "./Button";
import FavoritesPreview from "./FavoritesPreview";
import { loadImages } from "../actions/api/images";
import { updateBuffer } from "../actions/buffer";
import { updateFavorites } from "../actions/favorites";
import { getUsableImageIds, imageIdToLightboxDataSelector, preloadImageSelector } from "../selectors/images";

export class ImageBrowser extends Component {
    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(loadImages(dispatch));
    }

    componentWillReceiveProps (nextProps) {
        const {
            api: {
                images: { imageIds }
            },
            buffer
        } = nextProps;
        this.handleChangeProps(imageIds, buffer);
    }

    handleChangeProps (nextImageIds, nextBuffer) {
        const {
            api: {
                images: {
                    imageIds
                }
            },
            buffer,
            dispatch,
            favorites
        } = this.props;
        if (!_.isEqual(imageIds, nextImageIds)) {
            const imageIdsToAdd = getUsableImageIds(nextImageIds, favorites);
            imageIdsToAdd.forEach((imageId) => {
                preloadImageSelector(imageId);
            });
            dispatch(updateBuffer(buffer.concat(imageIdsToAdd)));
        } else if (!_.isEqual(buffer, nextBuffer)) {
            // if buffer is different,do a services hit if necessary
            if (nextBuffer.length <= 2) {
                dispatch(loadImages(dispatch));
            }
        }
    }

    getButtons (currentImageId) {
        return (
            <div className="buttons">
                <Button
                    clickArgs={[currentImageId]}
                    handleClick={this.handleClickDislike}
                    key="0"
                    type={ButtonTypes.ICON}
                    typeData={{ iconName: "remove" }}
                />
                <Button
                    clickArgs={[currentImageId]}
                    handleClick={this.handleClickAddToFavorites}
                    key="1"
                    type={ButtonTypes.ICON}
                    typeData={{ iconName: "addToFavorites" }}
                />
            </div>
        );
    }

    getMainImage (currentImageId) {
        const urlData = imageIdToLightboxDataSelector(currentImageId);
        return (
            <img
                src={urlData.src}
                className="mainImage"
            />
        );
    }

    @autobind
    handleClickDislike (e, imageId) {
        const {
            buffer,
            dispatch
        } = this.props;
        let newBuffer = _.without(buffer, imageId); // without() returns a new array
        dispatch(updateBuffer(newBuffer));
    }

    @autobind
    handleClickAddToFavorites (e, imageId) {
        const {
            buffer,
            dispatch,
            favorites
        } = this.props;
        const newBuffer = _.without(buffer, imageId); // without() returns a new array
        const newFavorites = _.concat([imageId], favorites); // concat() returns a new array
        dispatch(updateFavorites(newFavorites));
        dispatch(updateBuffer(newBuffer));
    }

    render () {
        const {
            buffer,
            dispatch,
            favorites,
            lightbox
        } = this.props;
        let content = null;
        if (buffer.length) {
            const currentImageId = buffer[0];
            content = (<div>
                {this.getMainImage(currentImageId)}
                {this.getButtons(currentImageId)}
            </div>);
        }
        return (
            <div className="imageBrowser">
                {buffer.length !== 0 && content}
                <FavoritesPreview
                    dispatch={dispatch}
                    favorites={favorites}
                    lightbox={lightbox}
                />
            </div>
        );
    }
}

ImageBrowser.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = function(store) {
    return {
        api: store.api,
        buffer: store.buffer,
        favorites: store.favorites,
        lightbox: store.lightbox
    };
};

export default connect(mapStateToProps)(ImageBrowser);
