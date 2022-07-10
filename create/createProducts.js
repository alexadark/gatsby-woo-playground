const path = require(`path`)
const { paginate } = require(`gatsby-awesome-pagination`)
const productsTemplate = path.resolve(`./src/templates/Products.js`)
const productTemplate = path.resolve(`./src/templates/Product.js`)

module.exports = async ({ actions, graphql }) => {
  const GET_PRODUCTS = `
  query ($limit: Int) {
     allWpProduct(
      limit: $limit
      sort: { order: DESC, fields: date }
    ) {
      edges {
        previous {
          link
        }
        node {
          link
          id
        }
        next {
          link
        }
      }
    }
  }
`
  const { createPage } = actions

  //create a page for each product
  const productsQuery = await graphql(GET_PRODUCTS)
  const products = productsQuery.data.allWpProduct.edges

  products.map(product => {
    createPage({
      path: product.node.link,
      component: productTemplate,
      context: {
        link: product.node.link,
        prev: product.previous ? product.previous.link : null,
        next: product.next ? product.next.link : null,
      },
    })
  })

  // Create a products page containing all "products" and paginate.

  paginate({
    createPage,
    pathPrefix: "/",
    component: productsTemplate,
    items: products,
    itemsPerPage: 4,
  })
}
