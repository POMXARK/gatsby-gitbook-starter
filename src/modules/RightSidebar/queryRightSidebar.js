import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import componentRightSidebar from './componentRightSidebar';

export default function queryRightSidebar() {
  return (
    <StaticQuery
      query={query}
      render={({ allMdx }) => componentRightSidebar(allMdx)}
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
