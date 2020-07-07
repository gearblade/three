/**
 * 存放各种扩展配置
 */

const path = require("path")
const merge = require("webpack-merge")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin")

exports.devServer = ({
  host,
  port
} = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // 默认为 `localhost`
    port, // 默认为 8080
    open: true,
  },
})

exports.HTMLTemplate = (config) => ({
  plugins: [
    new HtmlWebpackPlugin(merge({
      title: "three",
    }, config)),
  ],
})

exports.extractCSS = ({
  include,
  exclude,
  use = []
} = {}) => {
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].[contenthash:4].css",
  })
  return {
    module: {
      rules: [{
        test: /\.css$/,
        include,
        exclude,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ].concat(use),
      }, ],
    },
    plugins: [plugin],
  }
}

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")()],
  },
})

exports.loadSourceMaps = ({
  type
}) => ({
  devtool: type,
});

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()],
});

exports.handleAssets = () => ({
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve('src/mod'),
          to: 'mod',
        }
      ]
    })
  ]
})