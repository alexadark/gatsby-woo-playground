import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Layout from "~/components/layout"
import { Pagination } from "~/components/Pagination"

const Products = ({ data, pageContext }) => {
  const products = data.allProducts.nodes
  const categories = data.allCategories.nodes.filter(cat => cat.count)

  return (
    <Layout>
      <h1>All Products</h1>
      <div className="categories">
        {categories.map((category, index) => {
          const { name, uri } = category
          return (
            <Link to={uri} key={index}>
              <p>{name}</p>
            </Link>
          )
        })}
      </div>
      <div>
        {products?.map((product, index) => {
          const { name, link } = product
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
    allCategories: allWpProductCategory {
      nodes {
        name
        uri
        slug
        count
      }
    }
  }
`
