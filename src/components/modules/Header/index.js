import Loadable from 'react-loadable';

import config from '../../../../config.js';
import LoadingProvider from '../../mdxComponents/loading';

const help = require('../../images/help.svg');

const isSearchEnabled = config.header.search && config.header.search.enabled ? true : false;

let searchIndices = [];

if (isSearchEnabled && config.header.search.indexName) {
  searchIndices.push({
    name: `${config.header.search.indexName}`,
    title: `Results`,
    hitComp: `PageHit`,
  });
}

import Sidebar from '../SideBar';
import queryHeader from './queryHeader';

const LoadableComponent = Loadable({
  loader: () => import('../../search'),
  loading: LoadingProvider,
});



const Header = ({ location, isDarkThemeActive, toggleActiveTheme }) =>
  queryHeader({ location, isDarkThemeActive, toggleActiveTheme },
    isSearchEnabled
  );


export default Header;
