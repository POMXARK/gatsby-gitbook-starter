import config from '../../../../config';
import { ListItem } from '../SideBar/styles';
import * as React from 'react';
import styled from '@emotion/styled';
import { SidebarStyles } from './styles';

export default function renderRightSidebar(allMdx) {
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
