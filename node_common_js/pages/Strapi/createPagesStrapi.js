const path = require('path');
const { queryPagesStrapi } = require('./queryPagesStrapi');

exports.createPagesStrapi = (resolve, reject, graphql, createPage) => {
  resolve(
    graphql(queryPagesStrapi)
      .then(result => {
        printErrors(result, reject)
        generateStrapiPages(result, createPage)
      })
  );
}

printErrors = (result, reject) => {
  if (result.errors) {
    console.log(result.errors); // eslint-disable-line no-console
    reject(result.errors);
  }
}

generateStrapiPages = (result, createPage) => {
  // Create blog posts pages.
  result.data.allStrapiContent.edges.forEach(({ node }) => {
    if (node.article.data) {
      const slug = node.article.data.childMdx.frontmatter.title
      createPage({
        path: node.fields.slug ? node.fields.slug : '/',
        component: path.resolve('./src/templates/docs.js'),
        context: {
          id: node.fields.id,
        },
      });
    }
  });
}
