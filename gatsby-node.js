const path = require('path');
const { createPagesGitbook } = require('./node_common_js/pages/Gitbook/createPagesGitbook');
const { createNodeGitbook } = require('./node_common_js/pages/Gitbook/createNodeGitbook');
const { createPagesStrapi } = require('./node_common_js/pages/Strapi/createPagesStrapi');
const { createNodeStrapi } = require('./node_common_js/pages/Strapi/createNodeStrapi');
const config  =  require('./config');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    if (config.driverContent.gitbook) {
      createPagesGitbook(resolve, reject, graphql, createPage)
    }
    if (config.driverContent.strapi) {
      createPagesStrapi(resolve, reject, graphql, createPage)
    }
  });
};

// transformer
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
    if (config.driverContent.gitbook && node.internal.type === 'Mdx') {
      createNodeGitbook(node, getNode, actions, createNodeField)
    }
    if (config.driverContent.strapi && node.internal.type === 'STRAPI_CONTENT') {
      createNodeStrapi(node, getNode, actions, createNodeField);
    }
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
