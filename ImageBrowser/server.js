var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var config = require("./webpack.config");
var request = require("request");
var proxy = require("express-http-proxy");

var Express = require("express");
var app = new Express();

var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(Express.static("static"));

app.use("/apartmenttherapy", proxy("http://www.apartmenttherapy.com", {
    forwardPath: function (req, res) {
        return require("url").parse(req.url).path
    }
}));

app.use(function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎    Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
