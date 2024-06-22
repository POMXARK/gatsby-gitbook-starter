// in browser

import{ Component } from 'react';
import { graphql } from 'gatsby';
import config from '../../config';
import layout from './layout';

const forcedNavOrder = config.sidebar.forcedNavOrder;

export default class MDXRuntimeTest extends Component {
  render() {
    const { data } = this.props;

    if (!data) {
      return this.props.children;
    }
    const {
      allMdx,
      mdx,
      allStrapiContent,
      strapiContent,
      site: {
        siteMetadata: { docsLocation, title },
      },
    } = data;

    let navGitbook = navLinks(allMdx)
    let navStrapi = navLinks(allStrapiContent)
    const nav = navGitbook.concat(navStrapi)

    if (mdx) {
      return layout(mdx, this.props, nav);
    }

    const strapi = {...strapiContent.article.data.childMdx, ...strapiContent}

    return layout(strapi, this.props, nav, docsLocation);
  }
}

const navLinks = (mdx) => {
  const navItems = mdx.edges
    .map(({ node }) => node.fields.slug)
    .filter(slug => slug !== '/')
    .sort()
    .reduce(
      (acc, cur) => {
        if (forcedNavOrder.find(url => url === cur)) {
          return { ...acc, [cur]: [cur] };
        }

        let prefix = cur.split('/')[1];

        if (config.gatsby && config.gatsby.trailingSlash) {
          prefix = prefix + '/';
        }

        if (prefix && forcedNavOrder.find(url => url === `/${prefix}`)) {
          return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
        } else {
          return { ...acc, items: [...acc.items, cur] };
        }
      },
      { items: [] }
    );

   const nav = forcedNavOrder
    .reduce((acc, cur) => {
      return acc.concat(navItems[cur]);
    }, [])
    .concat(navItems.items)
    .map(slug => {
      if (slug) {
        const { node } = mdx.edges.find(({ node }) => node.fields.slug === slug);
        return { title: node.fields.title, url: node.fields.slug };
      }
    });

  return nav.filter(item   => item);
}

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: {id: {eq: $id}}) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
      }
    }
    allMdx(filter: {slug: {ne: null}}) {
      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
    strapiContent(id: {eq: $id}) {
      id
      slug
      article {
        data {
          childMdx {
            body
            tableOfContents
            frontmatter {
              metaTitle
              metaDescription
              title
            }
          }
        }
      }
      fields {
        id
        slug
        title
      }
    }
    allStrapiContent(filter: {}) {
      edges {
        node {
          fields {
            id
            title
            slug
          }
          article {
            data {
              childMdx {
                frontmatter {
                  title
                }
              }
            }
          }
          slug
        }
      }
    }
  }
`;
