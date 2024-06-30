import Link from '../../core/elements/link';
import config from '../../../../config';
import Sidebar from '../SideBar';
import help from '../../images/help.svg';
import GitHubButton from 'react-github-btn';
import * as React from 'react';
import { DarkModeSwitch } from './Theme/DarkModeSwitch';
import { StyledBgDiv, myFunction } from './styles';
import Loadable from 'react-loadable';
import LoadingProvider from '../../mdxComponents/loading';
import Select from 'react-select'
import { Store, useStore } from 'react-stores';
import { graphql, useStaticQuery } from 'gatsby';
import { globalHistory } from '@reach/router';

export const myStore = new Store({
  lang: { value: 'en', label: 'en' } , // initial state values
} , {
  persistence: true,
});

const options = [
  { value: 'en', label: 'en' },
  { value: 'ru-RU', label: 'ru' }
]

const query =
graphql`
  {
    allSitePage {
      edges {
        node {
          path
        }
      }
    }
  }
`

export default function renderHeader({ location, isDarkThemeActive, toggleActiveTheme }, data) {

  const myStoreState = useStore(myStore);

  const res = Object.values(((useStaticQuery(query))['allSitePage'])['edges'])
  const paths = res.reduce((acc, current, index) => {
    return { ...acc, [index]: current.node.path};
  }, {})
  const urls = new Set(Object.values(paths));

  const setUserChoice = (choice) => {
    myStore.setState({ lang: choice });
    const path = globalHistory.location.protocol === 'http:' ?
      (window.location.pathname.split('/')).slice(2) : (window.location.pathname.split('/')).slice(3)
    const url = `/${choice.value}/${path.join('/')}`
    console.log('urls', urls)
    console.log('url', url)
    if (urls.has(url)) {
      window.location.href = globalHistory.location.protocol === 'http:' ? url : config.gatsby.pathPrefix + url;
    }
  }

  //----------
  const isSearchEnabled = config.header.search && config.header.search.enabled;

  let searchIndices = [];

  if (isSearchEnabled && config.header.search.indexName) {
    searchIndices.push({
      name: `${config.header.search.indexName}`,
      title: `Results`,
      hitComp: `PageHit`,
    });
  }

  const LoadableComponent = Loadable({
    loader: () => import('../../search'),
    loading: LoadingProvider,
  });

  //----------
  const logoImg = require('../../images/logo.svg');

  const twitter = require('../../images/twitter.svg');

  const discordBrandsBlock = require('../../images/discord-brands-block.svg');

  const twitterBrandsBlock = require('../../images/twitter-brands-block.svg');

  const {
    site: {
      siteMetadata: { headerTitle, githubUrl, helpUrl, tweetText, logo, headerLinks },
    },
  } = data;

  const finalLogoLink = logo.link !== '' ? logo.link : 'https://hasura.io/';

  return (
    <div className={'navBarWrapper'}>
      <nav className={'navBarDefault'}>
        <div className={'navBarHeader'}>
          <Link to={finalLogoLink} className={'navBarBrand'}>
            <img
              className={'img-responsive displayInline'}
              src={logo.image !== '' ? logo.image : logoImg}
              alt={'logo'}
            />
          </Link>
          <div
            className={'headerTitle displayInline'}
            dangerouslySetInnerHTML={{ __html: headerTitle }}
          />
        </div>
        {config.header.social ? (
          <ul
            className="socialWrapper visibleMobileView"
            dangerouslySetInnerHTML={{ __html: config.header.social }}
          ></ul>
        ) : null}
        {isSearchEnabled ? (
          <div className={'searchWrapper hiddenMobile navBarUL'}>
            <LoadableComponent collapse={true} indices={searchIndices} />
          </div>
        ) : null}
        <div id="navbar" className={'topnav'}>
          <div className={'visibleMobile'}>
            <Sidebar location={location} />
            <hr />
          </div>
          <ul className={'navBarUL navBarNav navBarULRight'}>
            {headerLinks.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <li key={key}>
                    <a
                      className="sidebarLink"
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      dangerouslySetInnerHTML={{ __html: link.text }}
                    />
                  </li>
                );
              }
            })}
            {helpUrl !== '' ? (
              <li>
                <a href={helpUrl}>
                  <img src={help} alt={'Help icon'} />
                </a>
              </li>
            ) : null}

            {tweetText !== '' ? (
              <li>
                <a
                  href={'https://twitter.com/intent/tweet?&text=' + tweetText}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className={'shareIcon'} src={twitter} alt={'Twitter'} />
                </a>
              </li>
            ) : null}
            {tweetText !== '' || githubUrl !== '' ? (
              <li className="divider hiddenMobile"></li>
            ) : null}
            {config.header.social ? (
              <li className={'hiddenMobile'}>
                <ul
                  className="socialWrapper"
                  dangerouslySetInnerHTML={{ __html: config.header.social }}
                ></ul>
              </li>
            ) : null}
            {githubUrl !== '' ? (
              <li className={'githubBtn'}>
                <GitHubButton
                  href={githubUrl}
                  data-show-count="true"
                  aria-label="Star on GitHub"
                >
                  Star
                </GitHubButton>
              </li>
            ) : null}
            <li>
              <DarkModeSwitch
                isDarkThemeActive={isDarkThemeActive}
                toggleActiveTheme={toggleActiveTheme}
              />
            </li>
            <li>
              <Select
                options={options}
                onChange={(choice) => setUserChoice(choice)}
                defaultValue={myStoreState.lang}
              />
            </li>
          </ul>
        </div>
      </nav>
      <StyledBgDiv isDarkThemeActive={isDarkThemeActive}>
        <div className={'navBarDefault removePadd'}>
              <span
                onClick={myFunction}
                className={'navBarToggle'}
                onKeyDown={myFunction}
                role="button"
                tabIndex={0}
              >
                <span className={'iconBar'}></span>
                <span className={'iconBar'}></span>
                <span className={'iconBar'}></span>
              </span>
        </div>
        {isSearchEnabled ? (
          <div className={'searchWrapper'}>
            <LoadableComponent collapse={true} indices={searchIndices} />
          </div>
        ) : null}
      </StyledBgDiv>
    </div>
  );
}
