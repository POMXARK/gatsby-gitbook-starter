import queryHeader from './queryHeader';

const Header = ({ location, isDarkThemeActive, toggleActiveTheme }) =>
  queryHeader({ location, isDarkThemeActive, toggleActiveTheme });


export default Header;
