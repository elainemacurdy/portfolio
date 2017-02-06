import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { browserHistory, Route, Router } from "react-router";
import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import ImageBrowser from "./components/ImageBrowser";
import Root from "./components/Root";

import rootReducer from "./reducers/index";

const store = createStore(rootReducer, {}, compose(
    applyMiddleware(thunkMiddleware)
));

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={Root}>
                <Route path="/" component={ImageBrowser}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
);

