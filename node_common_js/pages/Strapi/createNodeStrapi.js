const matter = require('gray-matter');
const config = require('../../../config');

exports.createNodeStrapi = (node, getNode, createNodeField) => {
  let title;
  if (node.children.length > 0) {
    const children = getNode(node.children)
    title = matter(children.article).data.title
  } else {
    title = matter(node.article.data).data.title
  }

  const locale = node.locale ? '/' + node.locale : '/default'

  createNodeField({
    name: 'id',
    node,
    value: node.id,
  });

  createNodeField({
    name: 'title',
    node,
    value: title,
  });

  let slug = '/' + title.replace(/\s+/g, '-').toLowerCase();

  if (node.category___NODE) {
    let categories = '/' + getNode(node.category___NODE).name.replace(/\s+/g, '-').toLowerCase();
    if (node.sub_category___NODE) {
      categories += '/' + getNode(node.sub_category___NODE).name.replace(/\s+/g, '-').toLowerCase()
    }
    slug = categories + slug
  }

  if (config.gatsby && config.gatsby.trailingSlash) {
    createNodeField({
      name: `slug`,
      node,
      value: locale + slug + '/',
    });
  } else {
    createNodeField({
      name: `slug`,
      node,
      value: locale + slug,
    });
  }
}
