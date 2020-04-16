const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

function getDefaultEntry() {
  let entry = {};
  let allFiles = glob.sync("src/bridge/*.js");

  allFiles.forEach(function (file) {
    let chunk = file.slice(11, -3);
    entry[chunk] = path.resolve(__dirname, file);
  });

  return entry;
}

module.exports = {
  entry: getDefaultEntry(),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name]_[chunkhash].js"
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
      "GLOBAL_NAMESPACE": JSON.stringify("reactBridge")
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  }
};
