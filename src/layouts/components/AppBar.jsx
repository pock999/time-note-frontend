import React from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import _ from 'lodash';

// atomize
import {
  Div, Text, Button, Icon, Dropdown, Anchor,
} from 'atomize';

const menuList = (
  <Div p={{ x: '1rem', y: '0.5rem' }}>
    {[{ name: '個人資料', to: '/profile' }, { name: '登出' }].map((menuItem, index) => (
      <Anchor d="block" p={{ y: '0.25rem' }}>
        {menuItem.name}
      </Anchor>
    ))}
  </Div>
);

function AppBar({ handleToggler }) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  return (
    <Div
      width="100%"
      height="50px"
      bg="gray100"
      shadow="2"
      p="1rem"
      d="flex"
      flexDir="row"
      justify="space-between"
    >
      <Button
        h="2.5rem"
        w="2.5rem"
        bg="gray300"
        hoverBg="gray400"
        onClick={() => handleToggler()}
        rounded="lg"
        transition
      >
        <Icon name="Menu" size="20px" color="gray700" />
      </Button>
      <Dropdown
        isOpen={showDropdown}
        onClick={() => setShowDropdown((pre) => !pre)}
        menu={menuList}
        maxW="100px"
      >
        <Icon name="UserCircle" size="20px" color="gray700" />
      </Dropdown>
    </Div>
  );
}

export default AppBar;
