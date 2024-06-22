// gatsby-node.js - генерация страниц

// сначала выполнится createNodeGitbook, после поля можно извлечь в fields

exports.queryPagesGitbook = `
{
  allMdx(filter: {slug: {ne: null}}) {
    edges {
      node {
        fields {
          id
          slug
        }
        tableOfContents
      }
    }
  }
}
`
