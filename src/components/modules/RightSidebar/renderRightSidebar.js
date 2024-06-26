import config from '../../../../config';
import { ListItem } from '../SideBar/styles';
import * as React from 'react';
import { SidebarStyles } from './styles';

export default function renderRightSidebar(allMdx, allStrapiContent) {

  let finalNavItems;

  finalNavItems = items(allMdx, finalNavItems)
  finalNavItems = items(allStrapiContent, finalNavItems)

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


const items = (allMdx, finalNavItems) => {
  if (allMdx && allMdx.edges !== undefined && allMdx.edges.length > 0) {
    const navItems = allMdx.edges.map((item, index) => {
      let innerItems;

      if (item !== undefined) {
        if (
          item.node.fields.slug === location.pathname ||
          config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
        ) {

          if (item.node.tableOfContents) {
            if (item.node.tableOfContents.items) {
              innerItems = listItems(innerItems, item.node.tableOfContents.items)
            }
          }

          if (item.node.article && item.node.article.data.childMdx.tableOfContents) {
            if (item.node.article.data.childMdx.tableOfContents.items) {
              innerItems = listItems(innerItems, item.node.article.data.childMdx.tableOfContents.items)
            }
          }

        }
      }
      if (innerItems) {
        finalNavItems = innerItems;
      }
    });
  }
  return finalNavItems;
}

const listItems = (innerItems, items) => {
  innerItems = items.map((innerItem, index) => {
    const itemId = innerItem.title
      ? innerItem.title.replace(/\s+/g, '').toLowerCase()
      : '#';

    return (
      <ListItem key={index} to={`#${itemId}`} level={1}>
        {innerItem.title}
      </ListItem>
    );
  });

  return innerItems;
}
