import config from '../../../config';
import { ListItem } from '../SideBar/styles';
import * as React from 'react';
import styled from '@emotion/styled';

export default function componentRightSidebar(allMdx) {
  let navItems = [];

  let finalNavItems;

  if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
    const navItems = allMdx.edges.map((item, index) => {
      let innerItems;

      if (item !== undefined) {
        if (
          item.node.fields.slug === location.pathname ||
          config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
        ) {
          if (item.node.tableOfContents.items) {
            innerItems = item.node.tableOfContents.items.map((innerItem, index) => {
              const itemId = innerItem.title
                ? innerItem.title.replace(/\s+/g, '').toLowerCase()
                : '#';

              return (
                <ListItem key={index} to={`#${itemId}`} level={1}>
                  {innerItem.title}
                </ListItem>
              );
            });
          }
        }
      }
      if (innerItems) {
        finalNavItems = innerItems;
      }
    });
  }

  if (finalNavItems && finalNavItems.length) {
    return (
      <SidebarStyles>
        <ul className={'rightSideBarUL'}>
          <li className={'rightSideTitle'}>CONTENTS</li>
          {finalNavItems}
        </ul>
      </SidebarStyles>
    );
  } else {
    return (
      <SidebarStyles>
        <ul></ul>
      </SidebarStyles>
    );
  }
}

const SidebarStyles = styled('aside')`
  width: 100%;
  border-right: 1px solid #ede7f3;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 24px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;

  background: ${props => props.theme.colors.background};

  .rightSideTitle {
    font-size: 10px;
    line-height: 1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    padding: 7px 24px 7px 16px;
    border-left: 1px solid #e6ecf1;
    border-left-color: rgb(230, 236, 241);

    color: ${props => props.theme.colors.text};
  }

  .rightSideBarUL {
    margin-top: 32px;
  }

  .rightSideBarUL li {
    list-style-type: none;
    border-left: 1px solid #e6ecf1;
    border-left-color: rgb(230, 236, 241);
  }

  .rightSideBarUL li a {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    padding: 7px 24px 7px 16px;

    color: ${props => props.theme.colors.text};
  }

  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }
`;
