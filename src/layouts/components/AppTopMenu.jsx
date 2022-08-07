import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import _ from 'lodash';

// atomize
import {
  Div, Text, Button, Icon, Dropdown, Anchor,
} from 'atomize';

// redux store
import { logoutAction } from '../../store/reducers/auth';

function MenuList() {
  const dispatch = useDispatch();
  return (
    <Div p={{ x: '1rem', y: '0.5rem' }}>
      {[{ name: '個人資料', to: '/profile' }, { name: '登出', action: () => dispatch(logoutAction()) }].map((menuItem, index) => (
        <Link to={menuItem.to || '#'} key={menuItem.name}>
          <Anchor
            d="block"
            p={{ y: '0.25rem' }}
            hoverBg="gray200"
            onClick={menuItem.action ? () => menuItem.action() : null}
          >
            {menuItem.name}
          </Anchor>
        </Link>
      ))}
    </Div>
  );
}

export default MenuList;
