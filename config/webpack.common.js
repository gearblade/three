/**
 *  生产环境与开发环境通用的配置
 */
const merge = require("webpack-merge")
const parts = require("./webpack.parts")
const path = require("path")
module.exports = merge([
  //使用html模板插件
  parts.HTMLTemplate({
    template: path.resolve(__dirname,"../","public/template.html"),
  }),
  //生成sourceMap
  parts.loadSourceMaps({
    type: "source-map"
  }),
])