import { autobind } from "core-decorators";
import _ from "lodash";
import React, { Component, PropTypes } from "react";
import Lightbox from "react-images";

import Button, { ButtonTypes } from "./Button";
import Icon from "./Icon";
import { updateFavorites } from "../actions/favorites";
import { closeLightbox, navigateTo, openLightbox } from "../actions/lightbox";
import { imageIdToLightboxDataSelector, imageIdsToLightboxDataSelector } from "../selectors/images";

class FavoritesPreview extends Component {
    componentWillReceiveProps (nextProps) {
        const {
            dispatch,
            favorites
        } = this.props;
        const nextFavorites = nextProps.favorites;
        // If we just removed the last favorite, close the lightbox. Otherwise it pops back open automatically when
        // the user adds another image, which is just weird.
        if (!_.isEqual(favorites, nextFavorites)) {
            if (!nextFavorites.length) {
                dispatch(closeLightbox());
            }
        }
    }

    getUnFavoriteButton () {
        const {
            favorites,
            lightbox: {
                currentImageIndex
            }
        } = this.props;

        return (
            <div className="lightboxCustomControls" key={0}>
                {currentImageIndex > -1 && <Button
                    clickArgs={[favorites[currentImageIndex]]}
                    handleClick={this.handleClickUnFavorite}
                    type={ButtonTypes.ICON}
                    typeData={{ iconName: "removeFromFavorites" }}
                />}
            </div>
        );
    }

    @autobind
    handleClickLightboxClose () {
        const { dispatch } = this.props;
        dispatch(closeLightbox());
    }

    @autobind
    handleClickLightboxNext () {
        const {
            dispatch,
            lightbox: { currentImageIndex }
        } = this.props;
        dispatch(navigateTo(currentImageIndex + 1));
    }

    @autobind
    handleClickLightboxPrevious () {
        const {
            dispatch,
            lightbox: { currentImageIndex }
        } = this.props;
        dispatch(navigateTo(currentImageIndex - 1));
    }

    @autobind
    handleClickLightboxThumbnail (thumbnailIndex) {
        const { dispatch } = this.props;
        dispatch(navigateTo(thumbnailIndex));
    }

    @autobind
    handleClickPreviewThumbnail (e, thumbnailIndex) {
        const { dispatch } = this.props;
        if (!isNaN(thumbnailIndex)) {
            dispatch(openLightbox(parseInt(thumbnailIndex, 10)));
        }
    }

    @autobind
    handleClickUnFavorite (e, imageId) {
        const {
            dispatch,
            favorites,
            lightbox: {
                currentImageIndex
            }
        } = this.props;

        e.stopPropagation();
        e.preventDefault();

        const newFavorites = _.without(favorites, imageId);
        if (currentImageIndex >= newFavorites.length) {
            dispatch(navigateTo(newFavorites.length - 1));
        }
        dispatch(updateFavorites(newFavorites));
    }

    @autobind
    handleEventNoOp(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    render () {
        const {
            favorites,
            lightbox: {
                currentImageIndex,
                isOpen
            }
        } = this.props;
        const urlData = imageIdsToLightboxDataSelector(favorites);
        return (
            <div>
                {favorites.length > 0 && <div className="favoritesPreview">
                    <h4>
                        <Icon name="favorites" />
                    </h4>
                    <div className="scrollContainer">
                        {
                            favorites.map((imageId, index) => {
                                return (<Button
                                    clickArgs={[index]}
                                    handleClick={this.handleClickPreviewThumbnail}
                                    key={index}
                                    type={ButtonTypes.IMAGE}
                                    typeData={{ imagePath: imageIdToLightboxDataSelector(imageId).thumbnail }}
                                />);
                            })
                        }
                    </div>
                    <Lightbox
                        backdropClosesModal={true}
                        currentImage={currentImageIndex}
                        customControls={[this.getUnFavoriteButton()]}
                        images={urlData}
                        isOpen={isOpen}
                        onClickImage={this.handleEventNoOp}
                        onClickNext={this.handleClickLightboxNext}
                        onClickPrev={this.handleClickLightboxPrevious}
                        onClickThumbnail={this.handleClickLightboxThumbnail}
                        onClose={this.handleClickLightboxClose}
                        showImageCount={false}
                        showThumbnails={true}
                    />
                </div>}
            </div>
        );
    }
}

FavoritesPreview.propTypes = {
    dispatch: PropTypes.func.isRequired,
    favorites: PropTypes.array,
    lightbox: PropTypes.object
};

export default FavoritesPreview;
