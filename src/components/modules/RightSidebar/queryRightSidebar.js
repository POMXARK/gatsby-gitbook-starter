import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import renderRightSidebar from './renderRightSidebar';

export default function queryRightSidebar() {
  return (
    <StaticQuery
      query={query}
      render={({ allMdx, allStrapiContent }) => renderRightSidebar(allMdx, allStrapiContent)}
    />
  );
}

const query = graphql`
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
