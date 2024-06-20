import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import RightSidebar from '../RightSidebar';

export default function rightSidebarQuery() {
  return (
    <StaticQuery
      query={query}
      render={({ allMdx }) => RightSidebar(allMdx)}
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
