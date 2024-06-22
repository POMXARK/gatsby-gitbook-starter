const matter = require('gray-matter');

exports.createNodeStrapi = (node, getNode, actions, createNodeField) => {
    const children = getNode(node.children)
    const title = matter(children.article).data.title

    createNodeField({
      name: `slug`,
      node,
      value: `/${title.toLowerCase()}`,
    });

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
}
