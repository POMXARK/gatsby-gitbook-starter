// gatsby-node.js - генерация страниц

exports.queryPagesGitbook = `
{
  allMdx(filter: {slug: {ne: null}}) {
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
