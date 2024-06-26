import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import renderSidebar from './renderSidebar';
import config from '../../../../config';

export default function querySidebar() {
  if (config.driverContent.gitbook && config.driverContent.strapi) {
    return (
      <StaticQuery
        query={queryGitbookStrapi}
        render={({ allMdx, allStrapiContent }) => renderSidebar(allMdx, allStrapiContent)}
        // render={({ allMdx }) => renderSidebar(allMdx, null)}
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
        }
      }
    }
  }`

const queryStrapi = graphql`
      {
        allStrapiContent {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }`

const queryGitbook = graphql`
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
      }`

