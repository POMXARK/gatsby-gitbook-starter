// gatsby-node.js - генерация страниц

exports.query_1 = `
{
  allMdx {
    edges {
      node {
        fields {
          id
        }
        tableOfContents
        fields {
          slug
        }
      }
    }
  }
}
`
