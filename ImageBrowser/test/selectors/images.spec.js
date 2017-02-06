import _ from "lodash";
import expect from "expect";
import * as selectors from "../../selectors/images";

describe("selectors", () => {
    describe("images", () => {
        describe("getUsableImageIds", () => {
            it("returns all ids when none is duped", () => {
                const actual = selectors.getUsableImageIds(["a", "b", "c"], ["d", "e", "f"]);
                const expected = ["a", "b", "c"];

                expect(actual).toEqual(expected);
            });

            it("removes any dupes in services data", () => {
                const actual = selectors.getUsableImageIds(["a", "b", "a"], ["d", "e", "f"]);
                const expected = ["a", "b"];

                expect(actual).toEqual(expected);
            });

            it("removes any dupes in favorites data", () => {
                const actual = selectors.getUsableImageIds(["a", "b", "c"], ["d", "b", "f"]);
                const expected = ["a", "c"];

                expect(actual).toEqual(expected);
            });

            it("removes all dupes", () => {
                const actual = selectors.getUsableImageIds(["a", "b", "a"], ["d", "b", "f"]);
                const expected = ["a"];

                expect(actual).toEqual(expected);
            });
        });

        describe("imageIdToLightboxDataSelector", () => {
            it("returns correct lightbox data with valid imageId", () => {
                const actual = selectors.imageIdToLightboxDataSelector("abc");
                const expected = {
                    src: "http://atmedia.imgix.net/abc",
                    thumbnail: "http://atmedia.imgix.net/abc?w=75&h=75&fit=crop&crop=edges"
                };

                expect(actual).toEqual(expected);
            });

            it("returns correct lightbox data with invalid imageId", () => {
                const actual = selectors.imageIdToLightboxDataSelector();
                const expected = {
                    src: "http://atmedia.imgix.net/undefined",
                    thumbnail: "http://atmedia.imgix.net/undefined?w=75&h=75&fit=crop&crop=edges"
                };

                expect(actual).toEqual(expected);
            });
        });

        describe("imageIdsToLightboxDataSelector", () => {
            it("returns correct lightbox data with valid imageIds", () => {
                const actual = selectors.imageIdsToLightboxDataSelector(["abc", "efg", "hjk"]);
                const expected = [
                    {
                        src: "http://atmedia.imgix.net/abc",
                        thumbnail: "http://atmedia.imgix.net/abc?w=75&h=75&fit=crop&crop=edges"
                    },
                    {
                        src: "http://atmedia.imgix.net/efg",
                        thumbnail: "http://atmedia.imgix.net/efg?w=75&h=75&fit=crop&crop=edges"
                    },
                    {
                        src: "http://atmedia.imgix.net/hjk",
                        thumbnail: "http://atmedia.imgix.net/hjk?w=75&h=75&fit=crop&crop=edges"
                    }
                ];

                expect(actual).toEqual(expected);
            });

            it("returns correct lightbox data with invalid imageIds", () => {
                let actual = selectors.imageIdsToLightboxDataSelector([null, undefined, NaN]);
                let expected = [
                    {
                        src: "http://atmedia.imgix.net/null",
                        thumbnail: "http://atmedia.imgix.net/null?w=75&h=75&fit=crop&crop=edges"
                    },
                    {
                        src: "http://atmedia.imgix.net/undefined",
                        thumbnail: "http://atmedia.imgix.net/undefined?w=75&h=75&fit=crop&crop=edges"
                    },
                    {
                        src: "http://atmedia.imgix.net/NaN",
                        thumbnail: "http://atmedia.imgix.net/NaN?w=75&h=75&fit=crop&crop=edges"
                    }
                ];

                expect(actual).toEqual(expected);

                actual = selectors.imageIdsToLightboxDataSelector([null, undefined, "abc", NaN]);
                expected = [
                    {
                        src: "http://atmedia.imgix.net/null",
                        thumbnail: "http://atmedia.imgix.net/null?w=75&h=75&fit=crop&crop=edges"
                    },
                    {
                        src: "http://atmedia.imgix.net/undefined",
                        thumbnail: "http://atmedia.imgix.net/undefined?w=75&h=75&fit=crop&crop=edges"
                    },
                    {
                        src: "http://atmedia.imgix.net/abc",
                        thumbnail: "http://atmedia.imgix.net/abc?w=75&h=75&fit=crop&crop=edges"
                    },
                    {
                        src: "http://atmedia.imgix.net/NaN",
                        thumbnail: "http://atmedia.imgix.net/NaN?w=75&h=75&fit=crop&crop=edges"
                    }
                ];

                expect(actual).toEqual(expected);
            });

            it("returns correct lightbox data with invalid data", () => {
                const actual = selectors.imageIdsToLightboxDataSelector("not an array");
                const expected = [];

                expect(actual).toEqual(expected);
            });
        });

        // Can't really test this one.
        describe("preloadImageSelector", () => {
        });
    });
});
