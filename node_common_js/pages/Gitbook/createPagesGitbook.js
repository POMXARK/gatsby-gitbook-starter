const path = require('path');
const { queryPagesGitbook } = require('./queryPagesGitbook');

exports.createPagesGitbook = (resolve, reject, graphql, createPage) => {
  resolve(
    graphql(queryPagesGitbook)
      .then(result => {
        printErrors(result, reject)
        generateGitbookPages(result, createPage)
      })
  );
}

printErrors = (result, reject) => {
  if (result.errors) {
    console.log(result.errors); // eslint-disable-line no-console
    reject(result.errors);
  }
}

// сначала выполнится createNodePagesGitbook
generateGitbookPages = (result, createPage) => {
  // Create blog posts pages.
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug ? node.fields.slug : '/',
      component: path.resolve('./src/templates/docs.js'),
      context: {
        id: node.fields.id,
      },
    });
  });
}
