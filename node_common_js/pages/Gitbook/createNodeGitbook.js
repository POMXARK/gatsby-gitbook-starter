const config = require('../../../config');
const startCase = require('lodash.startcase');

exports.createNodeGitbook = (node, parent, getNode, createNodeField) => {
  let value = parent.relativePath.replace(parent.ext, '');

  if (value === 'index') {
    value = '';
  }

  if (config.gatsby && config.gatsby.trailingSlash) {
    createNodeField({
      name: `slug`,
      node,
      value: value === '' ? `/` : `/${value}/`,
    });
  } else {
    createNodeField({
      name: `slug`,
      node,
      value: `/${value}`,
    });
  }

  createNodeField({
    name: 'id',
    node,
    value: node.id,
  });

  createNodeField({
    name: 'title',
    node,
    value: node.frontmatter.title || startCase(parent.name),
  });
}
