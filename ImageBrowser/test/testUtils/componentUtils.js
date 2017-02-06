import expect from "expect";
import _ from "lodash";
import React from "react";
import { createRenderer } from "react-addons-test-utils";

import Root from "../../components/Root";

export function getFakeDomElement (tagName, attributes) {
    let domElement = {
        tagName: tagName,
        getAttribute: function(attributeName) {
            return this[attributeName];
        }
    };
    Object.keys(attributes).forEach((attributeName) => {
        domElement[attributeName] = attributes[attributeName];
    });
    return domElement;
}

export function getFakeEvent (eventData) {
    let evt = {
        cancelBubble: () => {},
        preventDefault: () => {},
        stopPropagation: () => {}
    };
    return Object.assign(evt, eventData);
}
