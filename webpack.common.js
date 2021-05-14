const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const config = require('./config');

module.exports = {
    entry: config.bundles,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            // 排除不需要转码的目录，提高 babel 效率
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    // babel-loader 特有配置，缓存 babel 转化结果，提高效率
                    cacheDirectory: true
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "BRIDGE_API_NAMESPACE": JSON.stringify(config.bridgeAPINamespace)
        })
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    }
};
