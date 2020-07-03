const parts = require("./webpack.parts")
const merge = require("webpack-merge")

module.exports = merge([
  parts.devServer({
    //这里可以自定义 host/port
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
  parts.loadFonts(),
  parts.loadSourceMaps({
    type: "source-map"
  }),
])