/* eslint-disable react/jsx-no-useless-fragment */
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
  } = props;

  const classes = useStyles({
    col,
  });

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classes.wrapper}
    >
      {children}
    </div>
  );
}
