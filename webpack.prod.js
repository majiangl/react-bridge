const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');


module.exports = function (env, argv) {
    return merge(common, {
        mode: "production",
        plugins: [
            new LodashModuleReplacementPlugin(),
            // https://github.com/webpack-contrib/webpack-bundle-analyzer
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                openAnalyzer: false,
                reportFilename: "bundle-report.html"
            })
        ]
    });
};
