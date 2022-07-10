const path = require("path")
const createProducts = require("./create/createProducts")
const createProductCategories = require("./create/createProductCategories")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src/"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
  })
}

exports.createPages = async ({ actions, graphql }) => {
  await createProducts({ actions, graphql })
  await createProductCategories({ actions, graphql })
}
