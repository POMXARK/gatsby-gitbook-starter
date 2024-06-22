import Helmet from 'react-helmet';
import { Edit, StyledHeading, StyledMainWrapper } from '../components/core/styles/Docs';
import NextPrevious from '../components/core/elements/NextPrevious';
import React from 'react';
import config from '../../config';
import { Layout, Link } from '$components';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

export default function layout(mdx, props, nav, docsLocation) {
  // meta tags
  const metaTitle = mdx.frontmatter.metaTitle;

  const metaDescription = mdx.frontmatter.metaDescription;

  let canonicalUrl = config.gatsby.siteUrl;

  canonicalUrl =
    config.gatsby.pathPrefix !== '/' ? canonicalUrl + config.gatsby.pathPrefix : canonicalUrl;
  canonicalUrl = canonicalUrl + mdx.fields.slug;

  const githubIcon = require('../components/images/github.svg').default;

  return (
    <Layout {...props}>
      <Helmet>
        {metaTitle ? <title>{metaTitle}</title> : null}
        {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        {metaDescription ? <meta name="description" content={metaDescription} /> : null}
        {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
        {metaDescription ? <meta property="og:description" content={metaDescription} /> : null}
        {metaTitle ? <meta property="twitter:title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta property="twitter:description" content={metaDescription} />
        ) : null}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div className={'titleWrapper'}>
        <StyledHeading>{mdx.fields.title}</StyledHeading>
        <Edit className={'mobileView'}>
          {docsLocation && mdx.parent && (
            <Link className={'gitBtn'} to={`${docsLocation}/${mdx.parent.relativePath}`}>
              <img src={githubIcon} alt={'Github logo'} /> Edit on GitHub
            </Link>
          )}
        </Edit>
      </div>
      <StyledMainWrapper>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </StyledMainWrapper>
      <div className={'addPaddTopBottom'}>
        <NextPrevious mdx={mdx} nav={nav} />
      </div>
    </Layout>
  );
}
