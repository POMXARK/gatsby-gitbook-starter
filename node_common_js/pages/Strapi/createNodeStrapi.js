const matter = require('gray-matter');

exports.createNodeStrapi = (node, getNode, actions, createNodeField) => {
    const children = getNode(node.children)
    const title = matter(children.article).data.title
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

    createNodeField({
      name: `slug`,
      node,
      value: locale + slug,
    });
}
