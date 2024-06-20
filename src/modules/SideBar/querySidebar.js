import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import componentSidebar from './componentSidebar';

export default function querySidebar() {
  return (
    <StaticQuery
      query={query}
      render={({ allMdx }) => componentSidebar(allMdx)}
    />
  );
}

const query = graphql`
  query {
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
`





