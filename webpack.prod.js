const {merge} = require('webpack-merge');
const common = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (env, argv) {
    return merge(common, {
        mode: 'production',
        module: {
            rules: [{
                test: /\.(js|jsx)$/i,
                // 排除不需要转码的目录，提高 babel 效率
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // babel-loader 特有配置，缓存 babel 转化结果，提高效率
                        cacheDirectory: true,
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    // 按需添加babel-polyfill，减少转码文件大小
                                    useBuiltIns: 'usage',
                                    corejs: '3.12'
                                }
                            ],
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            'lodash'
                        ]
                    }
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
        optimization: {
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
                `...`,
                new CssMinimizerPlugin()
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].css'
            }),
            // https://github.com/webpack-contrib/webpack-bundle-analyzer
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: 'bundle-report.html'
            })
        ]
    });
};
