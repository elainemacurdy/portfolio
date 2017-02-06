var path = require("path")
var webpack = require("webpack")

module.exports = {
    devtool: "#cheap-module-eval-source-map",
    entry: [
        "webpack-hot-middleware/client",
        "./index",
        "./less/styles.less"
    ],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/static/"
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    node: {
        net: "empty",
        tls: "empty",
        dns: "empty"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader"
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    cacheDirectory: true,
                    plugins: ["transform-decorators-legacy"],
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },
    eslint: {
        configFile: ".eslintrc.json"
    }
}
