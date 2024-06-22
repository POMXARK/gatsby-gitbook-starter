// gatsby-node.js - генерация страниц

// сначала выполнится createNodeStrapi, после поля можно извлечь в fields

exports.queryPagesStrapi = `
{
  allStrapiContent {
    edges {
      node {
       fields {
          id
          slug
        }
        article {
          data {
            childMdx {
              frontmatter {
                metaDescription
                metaTitle
                title
              }
              tableOfContents
            }
          }
        }
        id
        slug
      }
    }
  }
}
`
