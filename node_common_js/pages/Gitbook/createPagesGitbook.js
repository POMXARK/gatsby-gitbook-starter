const path = require('path');
const { gitbookContent } = require('../../queries');

exports.createPagesGitbook = (resolve, reject, graphql, createPage) => {
  resolve(
    graphql(gitbookContent)
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
