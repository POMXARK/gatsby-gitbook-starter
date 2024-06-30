import * as React from 'react';
import OpenedSvg from '../../../images/opened';
import ClosedSvg from '../../../images/closed';
import config from '../../../../../config';
import Link from '../../../core/elements/link';
import { myStore } from '../../Header/renderHeader';
import { useStore } from 'react-stores';
import { graphql, useStaticQuery } from 'gatsby';
import { globalHistory } from '@reach/router';

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

const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, locale, items, ...rest }) => {

  const isCollapsed = collapsed[url];
  const collapse = () => {
    setCollapsed(url);
  };

  const subItems = items.find(item => item.items.length > 0);
  const hasChildren = items.length !== 0 || subItems;

  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }

  if (globalHistory.location.protocol !== 'http:') {
    location = globalHistory.location
  }

  const active =
    location && (globalHistory.location.protocol === 'http:' ? location.pathname === url :
      location.pathname === config.gatsby.pathPrefix + url);

  console.log('---active', active)
  console.log('location.pathname === url', location.pathname === url)
  console.log('location.pathname === config.gatsby.pathPrefix + url', location.pathname === config.gatsby.pathPrefix + url)
  console.log('location.pathname', location.pathname)
  console.log('url', url)

  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;

  const myStoreState = useStore(myStore);

  const res = Object.values(((useStaticQuery(query))['allSitePage'])['edges'])
  const paths = res.reduce((acc, current, index) => {
    return { ...acc, [index]: current.node.path};
  }, {})
  const urls = new Set(Object.values(paths));
  const path = url !== undefined ? (url.split('/')).slice(2) : ['null']
  const localedUrl = `/${myStoreState.lang.value}/${path.join('/')}`

  return (
    <>
      <li className={calculatedClassName}
          hidden={locale && locale.length > 0 && urls.has(localedUrl) && locale !== myStoreState.lang.value}
      >
        {title && (
          <Link to={url}>
            {title}
            {!config.sidebar.frontLine && title && hasChildren ? (
              <button onClick={collapse} aria-label="collapse" className="collapser">
                {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
              </button>
            ) : null}
          </Link>
        )}
        {!isCollapsed && hasChildren ? (
          <ul>
            {items.map((item, index) => {
              return (
                <TreeNode
                  key={item.url + index.toString()}
                  setCollapsed={setCollapsed}
                  collapsed={collapsed}
                  {...item}
                />
              );
            })}
          </ul>
        ) : null}
      </li>
    </>
  );
};

export default TreeNode;
