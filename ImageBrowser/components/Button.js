import _ from "lodash";
import React, { PropTypes } from "react";

import Icon from "./Icon";

export const ButtonTypes = {
    ICON: 0,
    IMAGE: 1
};

const Button = ({ clickArgs, handleClick, type="icon", typeData }) => {
    const getContent = () => {
        switch (type) {
            case ButtonTypes.ICON:
                if (_.isNil(typeData) || _.isNil(typeData.iconName)) {
                    throw new ReferenceError("Expected typeData specifying iconName for Button type ICON.");
                }
                return (<Icon name={typeData.iconName} />);
            case ButtonTypes.IMAGE:
                if (_.isNil(typeData) || _.isNil(typeData.imagePath)) {
                    throw new ReferenceError("Expected typeData specifying imagePath for Button type IMAGE.");
                }
                return (<img src={typeData.imagePath} />);
            default:
                throw new ReferenceError(`Unrecognized Button type: '${type}'`);
        }
    };

    return (
        <button className="atButton" onClick={(e) => handleClick.apply(this, [e].concat(clickArgs || []))}>
            {getContent()}
        </button>
    );
};

Button.propTypes = {
    clickArgs: PropTypes.array,
    handleClick: PropTypes.func.isRequired,
    type: PropTypes.number.isRequired,
    typeData: PropTypes.object
};

export default Button;
