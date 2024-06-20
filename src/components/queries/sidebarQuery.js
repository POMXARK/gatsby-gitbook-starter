import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import Sidebar from '../Sidebar';

export default function sidebarQuery() {
  return (
    <StaticQuery
      query={query}
      render={({ allMdx }) => Sidebar(allMdx)}
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





