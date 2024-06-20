import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import renderRightSidebar from './renderRightSidebar';

export default function queryRightSidebar() {
  return (
    <StaticQuery
      query={query}
      render={({ allMdx }) => renderRightSidebar(allMdx)}
    />
  );
}

const query = graphql`
  query {
    allMdx {
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
