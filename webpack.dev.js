const {merge} = require('webpack-merge');
const common = require('./webpack.base.js');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function () {
  return merge(common, {
    devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      hot: true
    },
    // See different source mapping options -> https://webpack.js.org/configuration/devtool/
    devtool: 'eval-source-map',
    mode: 'development',
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
              'react-refresh/babel'
            ]
          }
        }
      }, {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // number of loaders applied before CSS loader
              importLoaders: 1,
              modules: {
                localIdentName: '[local]__[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
      }]
    },
    plugins: [
      new ReactRefreshWebpackPlugin(),
      new htmlWebpackPlugin({
        template: 'public/index.html'
      })
    ],
    // Fix HMR not working issue when webpack5 meets browserslist
    target: 'web'
  })
}
