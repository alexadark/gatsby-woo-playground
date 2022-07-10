import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "~/components/layout"
import { Pagination } from "~/components/Pagination"

const ProductCategory = ({ data, pageContext }) => {
  console.log(data)
  const { allWpProduct: products, wpProductCategory: category } = data

  return (
    <Layout>
      <h1>Products from: {category.name}</h1>
      <div>
        {products?.nodes.map((product, index) => {
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

export default ProductCategory

export const pageQuery = graphql`
  query ($slug: String!, $limit: Int!, $skip: Int!) {
    allWpProduct(
      filter: {
        productCategories: { nodes: { elemMatch: { slug: { eq: $slug } } } }
      }
      limit: $limit
      skip: $skip
      sort: { order: DESC, fields: date }
    ) {
      nodes {
        name
        link
      }
    }
    wpProductCategory(slug: { eq: $slug }) {
      uri
      link
      name
      description
    }
  }
`
