const parts = require("./webpack.parts")
const merge = require("webpack-merge")

module.exports = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.extractCSS({
    use: [parts.autoprefix()],
  }),
  parts.loadSourceMaps({
    type: "source-map"
  }),
])