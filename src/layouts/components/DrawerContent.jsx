import React from 'react';
import { Link } from 'react-router-dom';

// use query params
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';

import _ from 'lodash';

// atomize
import {
  Div, Text, Button, Icon,
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

const fullMenuItemStyle = {
  w: '100%',
  ...menuItemStyle,
};

// 菜單項目(on focus)
const focusMenuItemStyle = {
  ...menuItemStyle,
  bg: 'gray400',
};

const focusFullMenuItemStyle = {
  ...fullMenuItemStyle,
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
      minW="250px"
    >
      <Link
        to="/notes"
      >
        <Button
          {...pathname === '/notes' ? focusMenuItemStyle : fullMenuItemStyle}
        >
          全部類型
        </Button>
      </Link>
      {
        _.isArray(drawerTypes)
          ? drawerTypes.map((typeItem, index) => (
            <Link
              to={`/notes/${typeItem.value}${categoryId ? `?CategoryId=${categoryId}` : ''}`}
              key={typeItem.value}
            >
              <Button
                {...pathname === `/notes/${typeItem.value}` ? focusFullMenuItemStyle : fullMenuItemStyle}
              >
                {typeItem.name}
              </Button>
            </Link>
          ))
          : (
            <Skeleton count={3} />
          )
      }
      <hr />
      <Button
        {...(!categoryId && pathname.includes('/notes')) ? focusFullMenuItemStyle : fullMenuItemStyle}
        onClick={() => (categoryId ? setCategoryId(undefined) : null)}
      >
        全部分類(自定義分類)
      </Button>
      {
         _.isArray(drawerCategories)
           ? drawerCategories.map((category, index) => (
             <Div w="100%" d="flex" flexDir="row">
               <Button
                 key={category.id}
                 {...(categoryId === category.id && pathname.includes('/notes')) ? focusMenuItemStyle : menuItemStyle}
                 w={categoryId !== category.id ? 'calc(100% - 70px)' : 'calc(100% - 35px)'}
                 onClick={() => (categoryId !== category.id ? setCategoryId(category.id) : null)}
               >
                 <Icon
                   name="Dot"
                   size="20px"
                   color={category.color}
                   m={{ r: '.25em' }}
                 />
                 {category.name}
               </Button>
               <Button
                 {...menuItemStyle}
                 w="35px"
                 d="flex"
                 justify="center"
                 align="center"
                 onClick={() => openForm({ rowId: category.id })}
               >
                 <Icon name="Edit" size="20px" />
               </Button>
               {
                categoryId !== category.id
                && (
                <Button
                  {...menuItemStyle}
                  w="35px"
                  d="flex"
                  justify="center"
                  align="center"
                  onClick={() => deleteCategory(category.id, category.name)}
                >
                  <Icon name="Delete" size="20px" />
                </Button>
                )
               }

             </Div>
           ))
           : (
             <Skeleton count={3} />
           )
      }
      <Button
        {...fullMenuItemStyle}
        onClick={() => openForm({})}
      >
        <Icon name="Add" color="black" size="20px" m={{ r: '1em' }} />
        新增分類
      </Button>
    </Div>
  );
}

export default DrawerContent;
