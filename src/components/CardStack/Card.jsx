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
    boxShadow: '5px 5px 5px #ABABAB',
    border: '1px solid #ABABAB',
    position: 'absolute',
    transform: `rotate(${props.deg}deg)`,
  }),
}));

export default function InnerCard(props) {
  const {
    card,
    deg,
  } = props;

  const classes = useStyles({
    deg,
  });

  return (
    <Card
      className={classes.card}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          { card.title || '' }
        </Typography>
        <Typography variant="body2">
          { card.content || ''}
        </Typography>
      </CardContent>
    </Card>
  );
}
