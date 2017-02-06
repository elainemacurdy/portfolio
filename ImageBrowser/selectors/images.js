import _ from "lodash";
import { createSelector } from "reselect";

export const getUsableImageIds = createSelector(
    (sourceIds, favorites) => sourceIds, // eslint-disable-line no-unused-vars
    (sourceIds, favorites) => favorites,
    (sourceIds, favorites) => {
        // De-dupe the api response.
        const uniqueImageIds = _.uniq(sourceIds);
        // De-dupe ids already in favorites.
        const dedupedFavorites = _.difference(uniqueImageIds, favorites);
        // TBD: de-dupe ids already in blacklist.
        return dedupedFavorites;
    }
);

export const imageIdToLightboxDataSelector = createSelector(
    (imageId) => imageId,
    (imageId) => {
        return {
            src: `http://atmedia.imgix.net/${imageId}`,
            thumbnail: `http://atmedia.imgix.net/${imageId}?w=75&h=75&fit=crop&crop=edges`
        };
    }
);

export const imageIdsToLightboxDataSelector = createSelector(
    (imageIds) => imageIds,
    (imageIds) => {
        let data = [];
        if (imageIds.map) {
            data = imageIds.map((imageId) => {
                return imageIdToLightboxDataSelector(imageId);
            });
        }
        return data;
    }
);

export const preloadImageSelector = createSelector(
    (imageId) => imageId,
    (imageId) => {
        const lightboxData = imageIdToLightboxDataSelector(imageId);
        const imgFull = new Image();
        imgFull.src = lightboxData.src;
        const imgThumb = new Image();
        imgThumb.src = lightboxData.thumbnail;
    }
);
