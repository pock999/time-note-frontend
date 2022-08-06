// react
import React from 'react';
import PropTypes from 'prop-types';

import { Div } from 'atomize';

function Card({ children, ...others }) {
  return (
    <Div
      {...others}
      transition
    >
      { children }
    </Div>
  );
}

Card.defaultProps = {
  children: null,
  p: 0,
  m: null,

  d: null,
  align: null,
  justify: null,
  flexDir: null,
  flexGrow: null,
  flexWrap: null,

  rounded: null,

  bg: 'gray100',
  hoverBg: 'gray200',

  shadow: null,
  hoverShadow: null,
};

Card.propTypes = {
  id: PropTypes.string,
  class: PropTypes.string,
  children: PropTypes.node,

  p: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  m: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  w: PropTypes.string,
  h: PropTypes.string,
  maxW: PropTypes.string,
  maxH: PropTypes.string,
  minW: PropTypes.string,
  minH: PropTypes.string,

  d: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
  flexDir: PropTypes.string,
  flexGrow: PropTypes.string,
  flexWrap: PropTypes.string,

  // 圓角
  rounded: PropTypes.string,

  bg: PropTypes.string,
  hoverBg: PropTypes.string,

  shadow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  hoverShadow: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Card;
