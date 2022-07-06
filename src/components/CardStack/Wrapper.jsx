/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */
/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */

import React from 'react';

// common tools(npm)
import _ from 'lodash';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: (props) => ({
    width: `${(100 / 12) * props.col}%`,
    minHeight: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
  }),
}));

export default function Warpper(props) {
  const {
    col,
    children,
    onMouseEnter,
    onMouseLeave,
    onClick,
  } = props;

  const classes = useStyles({
    col,
  });

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classes.wrapper}
      onClick={onClick}
      role="button"
    >
      {children}
    </div>
  );
}
