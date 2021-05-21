const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const config = require('./config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: config.bundles,
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "js/[name].js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/i,
            // 排除不需要转码的目录，提高 babel 效率
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    // babel-loader 特有配置，缓存 babel 转化结果，提高效率
                    cacheDirectory: true
                }
            }
        },{
            test: /\.(png|jpg|gif)$/i,
            // to exclude images that came from URLs
            dependency: {not: ['url']},
            type: 'asset/resource',
            generator: {
                filename: 'images/[contenthash][ext]'
            }
        },{
            test: /\.scss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        // number of loaders applied before CSS loader
                        importLoaders: 2,
                        modules: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                ['autoprefixer']
                            ]
                        }
                    }
                },
                'sass-loader'
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            "BRIDGE_API_NAMESPACE": JSON.stringify(config.bridgeAPINamespace)
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        })
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            images: path.resolve(__dirname, 'images')
        }
    }
};
