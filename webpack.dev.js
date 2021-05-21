const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env = {}, argv) {
    return merge(common, {
        devServer: {
            contentBase: "./dist",
            historyApiFallback: true,
            hot: true
        },
        // See different source mapping options -> https://webpack.js.org/configuration/devtool/
        devtool: "source-map",
        mode: "development",
        plugins: [
            new htmlWebpackPlugin({
                template: 'public/index.html'
            })
        ]
    });
};
