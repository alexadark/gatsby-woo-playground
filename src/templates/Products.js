import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "~/components/layout"
import { Pagination } from "~/components/Pagination"

const Products = ({ data, pageContext }) => {
  const products = data.allProducts.nodes
  return (
    <Layout>
      <h1>All Products</h1>
      <div>
        {products?.map((product, index) => {
          const { name, link, id } = product
          return (
            <Link to={link} key={index}>
              <h2>{name}</h2>
            </Link>
          )
        })}
      </div>
      <Pagination ctx={pageContext} />
    </Layout>
  )
}

export default Products

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    allProducts: allWpProduct(
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: date }
    ) {
      nodes {
        name
        link
        id
      }
    }
  }
`
