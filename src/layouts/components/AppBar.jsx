import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import _ from 'lodash';

// atomize
import {
  Div, Text, Button, Icon, Dropdown, Anchor,
} from 'atomize';

function AppBar({ handleToggler, topMenu }) {
  const location = useLocation();
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
        menu={topMenu}
        maxW="200px"
      >
        <Icon name="UserCircle" size="20px" color="gray700" />
        {
          location.pathname.includes('profile') && '個人資料'
        }
      </Dropdown>
    </Div>
  );
}

AppBar.defaultProps = {
  topMenu: <Div>menu</Div>,
  handleToggler: () => {},
};

AppBar.defaultProps = {
  topMenu: PropTypes.node,
  handleToggler: PropTypes.func,
};

export default AppBar;
