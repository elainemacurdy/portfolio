import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

export class Root extends Component {
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

Root.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps (state) {
    return state;
}

function mapDispatchToProps (dispatch) {
    return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
