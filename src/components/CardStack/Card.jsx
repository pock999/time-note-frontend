/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

// common tools(npm)
import _ from 'lodash';

// mui(npm)
import {
  Typography,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  card: (props) => ({
    width: '100%',
    boxShadow: '2px 2px 3px #ABABAB',
    border: '1px solid #ABABAB',
    position: 'absolute',
    transform: `rotate(${props.deg}deg)`,
  }),
}));

export default function InnerCard(props) {
  const {
    card,
    deg,
    cardContent,
  } = props;

  const classes = useStyles({
    deg,
  });

  return (
    <Card
      className={classes.card}
    >
      {cardContent}
    </Card>
  );
}
