const {merge} = require('webpack-merge');
const common = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = function (env, argv) {
    return merge(common, {
        mode: 'production',
        optimization: {
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
                `...`,
                new CssMinimizerPlugin()
            ]
        },
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
