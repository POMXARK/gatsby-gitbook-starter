import config from '../../../config';
import Tree from './tree';
import { Divider, ListItem } from './styles';
import { ExternalLink } from 'react-feather';
import * as React from 'react';
import styled from '@emotion/styled';


export default function componentSidebar(allMdx) {
  return (
    <SidebarStyles>
      {config.sidebar.title ? (
        <div
          className={'sidebarTitle hiddenMobile'}
          dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
        />
      ) : null}
      <ul className={'sideBarUL'}>
        <Tree edges={allMdx.edges} />
        {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}
        {config.sidebar.links.map((link, key) => {
          if (link.link !== '' && link.text !== '') {
            return (
              <ListItem key={key} to={link.link}>
                {link.text}
                <ExternalLink size={14} />
              </ListItem>
            );
          }
        })}
      </ul>
    </SidebarStyles>
  );
}

const SidebarStyles = styled('aside')`
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  -webkit-box-shadow: -1px 0px 4px 1px rgba(175, 158, 232, 0.4);

  @media only screen and (max-width: 1023px) {
    width: 100%;
    /* position: relative; */
    height: 100vh;
  }

  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }

  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    height: auto;
  }
`;
