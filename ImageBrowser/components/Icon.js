import React, { PropTypes } from "react";

import icons from "../static/icons.json";

const Icon = ({ name }) => {
    const icon = icons[name];
    return (
        <svg
            className="icon"
            viewBox={icon.viewBox}
        >
            <title>{name}</title>
            <desc>{icon.credit}</desc>
            <path d={icon.path}></path>
        </svg>
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired
};

export default Icon;
