import React, { useState } from 'react';
import config from '../../../../../config';
import TreeNode from './treeNode';

const calculateTreeData = edges => {
  const originalData = getWithoutMainPage(edges)

  const tree = originalData.reduce(
    (
      accu,
      {
        node: {
          fields: { slug, title },
          locale,
        },
      }
    ) => {

      const parts = slug.split('/');

      let { items: prevItems } = accu;

      prevItems = getPrevItemsStepOne(prevItems, parts)

      const slicedLength =
        config.gatsby && config.gatsby.trailingSlash ? parts.length - 2 : parts.length - 1;

      const existingItem = prevItems.find(({ label }) => label === parts[slicedLength])

      if (existingItem) {
        existingItem.url = slug;
        existingItem.title = title;
      } else {
          prevItems.push({
            label: parts[slicedLength],
            url: slug,
            items: [],
            title,
            locale
          });
      }

      return accu;
    },
    { items: [] }
  );

  // if (config.gatsby && config.gatsby.trailingSlash) {
  // }

  return getOrderTree(getConfigOrder(), tree);
};

const Tree = ({ edges }) => {
  let [treeData] = useState(() => {
    return calculateTreeData(edges);
  });

  const defaultCollapsed = {};

  treeData.items.forEach(item => {
    defaultCollapsed[item.url] = config.sidebar.collapsedNav && config.sidebar.collapsedNav.includes(item.url);
  });
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggle = url => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url],
    });
  };

  return (
    <TreeNode
      className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
      setCollapsed={toggle}
      collapsed={collapsed}
      {...treeData}
    />
  );
};

export default Tree;

/**
 * Исключить из обработки главную страницу.
 */
const getWithoutMainPage = (edges) => {
  return config.sidebar.ignoreIndex
    ? edges.filter(
      ({
         node: {
           fields: { slug },
         },
       }) => slug !== '/'
    )
    : edges;
}

const getPrevItemsStepOne = (prevItems, parts) => {
  const slicedParts =
    config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);

  for (const part of slicedParts) {
    let tmp = prevItems && prevItems.find(({ label }) => label === part);

    if (tmp) {
      if (!tmp.items) {
        tmp.items = [];
      }
    } else {
      tmp = { label: part, items: [] };
      prevItems.push(tmp);
    }
    prevItems = tmp.items;
  }

  return prevItems;
}

/**
 * Получить список упорядоченных элементов бокового меню, по значениям из конфигурации.
 */
const getOrderTree = (tmp, tree) => {
  tmp.reverse();

  return tmp.reduce((accu, slug) => {
    const parts = slug.split('/');

    let { items: prevItems } = accu;

    prevItems = getPrevItemsStepTwo(prevItems, parts)

    // sort items alphabetically.
    prevItems.map(item => {
      item.items = item.items.sort(function(a, b) {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
    });
    const slicedLength =
      config.gatsby && config.gatsby.trailingSlash ? parts.length - 2 : parts.length - 1;

    const index = prevItems.findIndex(({ label }) => label === parts[slicedLength]);

    if (prevItems.length) {
      accu.items.unshift(prevItems.splice(index, 1)[0]);
    }
    return accu;
  }, tree);
}

const getPrevItemsStepTwo = (prevItems, parts) => {
  const slicedParts =
    config.gatsby && config.gatsby.trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);

  for (const part of slicedParts) {
    let tmp = prevItems.find(item => item && item.label === part);

    if (tmp) {
      if (!tmp.items) {
        tmp.items = [];
      }
    } else {
      tmp = { label: part, items: [] };
      prevItems.push(tmp);
    }
    if (tmp && tmp.items) {
      prevItems = tmp.items;
    }
  }

  return prevItems;
}

/**
 * Получить порядок сортировки элементов бокового меню.
 */
const getConfigOrder = () => {

  const {
    sidebar: { forcedNavOrder = [] },
  } = config;

  return [...forcedNavOrder];
}
