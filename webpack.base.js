const path = require('path');
const webpack = require('webpack');
const config = require('./config');

module.exports = {
    entry: config.bundles,
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        clean: true
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/i,
            // to exclude images that came from URLs
            dependency: {not: ['url']},
            type: 'asset/resource',
            generator: {
                filename: 'images/[contenthash][ext]'
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'BRIDGE_API_NAMESPACE': JSON.stringify(config.bridgeAPINamespace)
        })
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
            images: path.resolve(__dirname, 'images')
        }
    }
};
