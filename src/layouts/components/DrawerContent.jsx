import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

// use query params
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

import _ from 'lodash';

// atomize
import {
  Div, Text, Button, Icon, Dropdown, Anchor,
} from 'atomize';

// custom components
import {
  Skeleton,
} from '../../components';

// 菜單項目
const menuItemStyle = {
  w: '100%',
  bg: 'gray100',
  textColor: 'black700',
  rounded: '0',
  d: 'flex',
  justify: 'flex-start',
  transition: true,

  hoverBg: 'gray500',
};

// 菜單項目(on focus)
const focusMenuItemStyle = {
  ...menuItemStyle,
  bg: 'gray400',
};

function DrawerContent(props) {
  const {
    drawerTypes,
    drawerCategories,
    pathname,
    openForm,
    deleteCategory,
  } = props;

  //
  // url params
  //
  const [categoryId, setCategoryId] = useQueryParam('CategoryId', NumberParam);

  return (
    <Div
      bg="gray100"
      h="100%"
    >
      <Button
        {...pathname === '/notes' ? focusMenuItemStyle : menuItemStyle}
      >
        全部類型
      </Button>
      {
        _.isArray(drawerTypes)
          ? drawerTypes.map((typeItem, index) => (
            <Button
              key={typeItem.value}
              {...pathname === `/notes/${typeItem.value}` ? focusMenuItemStyle : menuItemStyle}
            >
              {typeItem.name}
            </Button>
          ))
          : (
            <Skeleton count={3} />
          )
      }
      <hr />
      <Button
        {...(!categoryId && pathname.includes('/notes')) ? focusMenuItemStyle : menuItemStyle}
      >
        全部分類(自定義分類)
      </Button>
      {
         _.isArray(drawerCategories)
           ? drawerCategories.map((category, index) => (
             <Button
               key={category.id}
               {...(categoryId === category.id && pathname.includes('/notes')) ? focusMenuItemStyle : menuItemStyle}
             >
               {category.name}
             </Button>
           ))
           : (
             <Skeleton count={3} />
           )
      }
    </Div>
  );
}

export default DrawerContent;
