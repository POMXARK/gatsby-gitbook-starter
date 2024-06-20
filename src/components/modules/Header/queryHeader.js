import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import renderHeader from './renderHeader';

export default function queryHeader ({ location, isDarkThemeActive, toggleActiveTheme },
  isSearchEnabled
) {
  return (
    <StaticQuery
      query={query}
      render={(data) => renderHeader(
        { location, isDarkThemeActive, toggleActiveTheme },
        isSearchEnabled, data
        )}
    />
  )
}

const query = graphql`
  query headerTitleQuery {
    site {
      siteMetadata {
        headerTitle
        githubUrl
        helpUrl
        tweetText
        logo {
          link
          image
        }
        headerLinks {
          link
          text
        }
      }
    }
  }
`
