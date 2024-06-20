import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import renderSidebar from './renderSidebar';

export default function querySidebar() {
  return (
    <StaticQuery
      query={query}
      render={({ allMdx }) => renderSidebar(allMdx)}
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





