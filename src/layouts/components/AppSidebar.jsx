import React from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import _ from 'lodash';

// atomize
import {
  Div, Text, Button, Icon, Dropdown, Anchor,
} from 'atomize';

// react-sidebar
import Sidebar from 'react-sidebar';

// custom hooks
import { useWindowSize } from '../../hooks';

function AppSidebar({
  children, appBar: AppBar, drawerContent, topMenu,
}) {
  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
  const [isExanded, setIsExanded] = React.useState(!sidebarCollapsed);
  const handleToggler = () => {
    setIsExanded((pre) => {
      // eslint-disable-next-line no-unused-expressions
      pre ? (localStorage.setItem('sidebar-collapsed', true)) : (localStorage.removeItem('sidebar-collapsed'));
      return !pre;
    });
  };

  // 螢幕寬度
  const [width] = useWindowSize();
  React.useEffect(() => {
    if (window.innerWidth > 720) {
      setIsExanded(true);
    } else {
      setIsExanded(false);
    }
  }, [width]);

  return (
    <Sidebar
      sidebar={drawerContent}
      onSetOpen={handleToggler}
      docked={isExanded}
      styles={{ sidebar: { background: 'white' } }}
    >
      { AppBar && <AppBar handleToggler={handleToggler} topMenu={topMenu} /> }
      { children }
    </Sidebar>
  );
}

AppSidebar.defaultProps = {
  children: null,
  appBar: null,
  drawerContent: <b>Sidebar content</b>,
  topMenu: <Div>menu</Div>,
};

AppSidebar.propTypes = {
  children: PropTypes.node,
  appBar: PropTypes.elementType,
  drawerContent: PropTypes.node,
  topMenu: PropTypes.node,
};

export default AppSidebar;
