/*eslint-disable */
/*
 * Set up the global document and window for testing react components.
 * From http://jaketrent.com/post/testing-react-with-jsdom/
 */
var jsdom = require("jsdom");


// setup the simplest document possible
var doc = jsdom.jsdom("<!doctype html><html><body></body></html>");

// get the window object out of the document
var win = doc.defaultView;

var getStorage = function() {
    var Storage = {};

    Object.defineProperties(Storage, {
        _store: {
            value: {},
            writable: true
        },
        clear: {
            value: function() { this._store = {}; }
        },
        getItem: {
            value: function(key) {
                return (this._store.hasOwnProperty(key)) ? this._store[key] : undefined;
            }
        },
        hasOwnProperty: {
            value: function(key) { return this._store.hasOwnProperty(key); }
        },
        key: {
            value: function(index) {
                var i = 0;
                for (var key in this._store) {
                    if (i++ === index) {
                        return key;
                    }
                }
                return undefined
            }
        },
        length: {
            get: function() {
                var i = 0;
                for (var key in this._store) {
                    i++
                }
                return i;
            }
        },
        removeItem: {
            value: function(removeKey) {
                var newStore = {};
                for (var key in this._store) {
                    if (key !== removeKey) {
                        newStore[key] = this._store[key];
                    }
                }
                this._store = newStore;
                return undefined;
            }
        },
        setItem: {
            value: function(key, value) { this._store[key] = value; }
        }
    });

    return Storage;
}
win.localStorage = getStorage();
win.sessionStorage = getStorage();

win.Image = function() {};

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc;
global.window = win;

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue;
        if (key in global) continue;

        global[key] = window[key];
    }
}
