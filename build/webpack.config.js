const merge = require("webpack-merge")

const commonConfig = require("./webpack.common")
const developmentConfig = require("./webpack.development")
const productionConfig = require("./webpack.production")

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode })
  }
  return merge(commonConfig, developmentConfig, { mode })
}