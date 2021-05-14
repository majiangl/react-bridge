const path = require("path");
const merge = require("webpack-merge");
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
        devtool: "eval-cheap-source-map",
        mode: "development",
        output: {
            filename: "js/[name].js"
        },
        plugins: [
            new htmlWebpackPlugin({
                filename: env.template,
                template: `public/${env.template}`,
                chunks: env.chunks.split(",")
            })
        ]
    });
};
