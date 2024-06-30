// in browser

import{ Component } from 'react';
import config from '../../config';
import layout from './layout';
import { graphql } from 'gatsby';

const forcedNavOrder = config.sidebar.forcedNavOrder;

export default class MDXRuntimeTest extends Component {
  render() {
    const { data } = this.props;

    let navGitbook, navStrapi, nav;

    if (!data) {
      return this.props.children;
    }
    if (config.driverContent.gitbook) {
      var { allMdx, mdx , site: { siteMetadata: { docsLocation, title }, }, } = data;
     // var { allMdx, mdx } = data;

      nav = navGitbook = navLinks(allMdx)
    }
    if (config.driverContent.strapi) {
      var {allStrapiContent, strapiContent } = data;
      nav = navStrapi = navLinks(allStrapiContent)
    }

    if (strapiContent && config.driverContent.gitbook && config.driverContent.strapi) {
       nav = navGitbook.concat(navStrapi)
       const strapi = {...strapiContent.article.data.childMdx, ...strapiContent}

       return layout(strapi, this.props, nav, docsLocation);
    }

    if (config.driverContent.gitbook) {
      return layout(mdx, this.props, nav);
    }
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
        return { title: node.fields.title, url: node.fields.slug, locale: node.locale ?? null };
      }
    });

  return nav.filter(item   => item);
}

// if (config.driverContent.gitbook && config.driverContent.strapi) {
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
        locale
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
            locale
          }
        }
      }
    }
  `;




const pageQueryGitbook = graphql`
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

  }
`;

const pageQueryStrapi = graphql`
  query ($id: String!) {
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
