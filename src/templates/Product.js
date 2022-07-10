import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "~/components/layout"
import { PrevNextPostNavigation } from "~/components/PrevNextPostNavigation"

const Product = ({ data, pageContext }) => {
  const product = data.wpProduct

  return (
    <Layout>
      <h1>{product.name}</h1>
      <PrevNextPostNavigation
        prev={pageContext?.prev}
        next={pageContext?.next}
        className="max-w-lg mt-0 mb-10 center-container"
      />
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query ($link: String!) {
    wpProduct(link: { eq: $link }) {
      name
    }
  }
`
