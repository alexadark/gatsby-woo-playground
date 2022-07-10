const path = require(`path`)
const normalize = require("normalize-path")
const { paginate } = require(`gatsby-awesome-pagination`)
const categoryTemplate = path.resolve(`./src/templates/ProductCategory.js`)

module.exports = async ({ actions, graphql }) => {
  const GET_CATEGORIES = `
  query MyQuery {
    allWpProductCategory {
      nodes {
        count
        uri
        slug
        products {
          nodes {
            id
          }
        }
      }
    }
  }

  `

  const { createPage } = actions
  const categoriesQuery = await graphql(GET_CATEGORIES)
  const categories = categoriesQuery.data.allWpProductCategory.nodes

  return Promise.all(
    categories
      .filter(category => category.count)
      .map(category =>
        paginate({
          createPage,
          pathPrefix: normalize(category.uri),
          component: categoryTemplate,
          items: category.products.nodes,
          itemsPerPage: 4,
          context: {
            slug: category.slug,
          },
        })
      )
  )
}
