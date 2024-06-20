const path = require('path');
const { createPagesGitbook } = require('./node_common_js/pages/Gitbook/createPagesGitbook');
const { createNodeGitbook } = require('./node_common_js/pages/Gitbook/createNodeGitbook');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    createPagesGitbook(resolve, reject, graphql, createPage)
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  createNodeGitbook(node, getNode, actions, createNodeField)
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
        buble: '@philpl/buble', // to reduce bundle size
      },
    },
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-proposal-export-default-from',
  });
};
