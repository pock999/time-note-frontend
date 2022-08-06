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
    PropTypes.object,
  ]),
  m: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  w: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  h: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  maxW: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  maxH: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  minW: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  minH: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),

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
