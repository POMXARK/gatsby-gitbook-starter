import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import renderRightSidebar from './renderRightSidebar';
import config from '../../../../config';

export default function queryRightSidebar() {
  if (config.driverContent.gitbook && config.driverContent.strapi) {
    return (
      <StaticQuery
        query={queryGitbookStrapi}
        render={({ allMdx, allStrapiContent }) => renderRightSidebar(allMdx, allStrapiContent)}
        // render={({ allMdx }) => renderRightSidebar(allMdx, null)}
      />
    );
  }
}

const queryGitbookStrapi = graphql`
  {
    allMdx(filter: {slug: {ne: null}}) {
      edges {
        node {
          fields {
            slug
          }
          tableOfContents
        }
      }
    }
    allStrapiContent {
      edges {
        node {
          fields {
            slug
          }
          article {
            data {
              childMdx {
                tableOfContents
              }
            }
          }
        }
      }
    }
  }
`

const queryGitbook = graphql`
  {
    allMdx(filter: {slug: {ne: null}}) {
      edges {
        node {
          fields {
            slug
          }
          tableOfContents
        }
      }
    }

  }
`

const queryStrapi = graphql`
  {
    allStrapiContent {
      edges {
        node {
          fields {
            slug
          }
          article {
            data {
              childMdx {
                tableOfContents
              }
            }
          }
        }
      }
    }
  }
`
