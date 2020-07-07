const merge = require("webpack-merge")
const parts = require("./webpack.parts")

module.exports = merge([
  //设置hash
  {
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
    },
  },
  //抽离css
  parts.extractCSS({
    use: [parts.autoprefix()],
  }),
  //构建时清理目录
  parts.clean(),
  parts.handleAssets(),
])