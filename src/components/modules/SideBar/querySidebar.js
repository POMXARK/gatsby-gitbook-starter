import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import renderSidebar from './renderSidebar';

export default function querySidebar() {
  return (
    <StaticQuery
      query={query}
      render={({ allMdx, allStrapiContent }) => renderSidebar(allMdx, allStrapiContent)}
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
            title
          }
        }
      }
    }
    allStrapiContent {
      edges {
        node {
          fields {
            slug
            title
          }
          slug
          article {
            data {
              childMdx {
                frontmatter {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`




