import React from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import _ from 'lodash';

// atomize
import {
  Div, Text, Button, Icon, Dropdown, Anchor,
} from 'atomize';

function ToolBar({ children }) {
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
      {children}
    </Div>
  );
}

export default ToolBar;
