// gatsby-node.js - генерация страниц

exports.gitbookContent = `
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
