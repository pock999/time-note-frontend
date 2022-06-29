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

const computeRotate = (index, len) => {
  if (index + 1 === len) {
    return 0;
  }

  return 0 + ((len - index) * 0.5);
};

export default function CardStack(props) {
  const {
    cards,
    col,
  } = props;

  if (!_.isArray(cards)) {
    return (<></>);
  }

  return (
    <div
      style={{
        width: `${(100 / 12) * col}%`,
        minHeight: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      {
        cards.map((card, index, ary) => (
          <Card
            key={card.id}
            sx={{
              width: '100%',
              boxShadow: '5px 5px 5px #ABABAB',
              border: '1px solid #ABABAB',
              position: 'absolute',
              transform: `rotate(${computeRotate(index, ary.length)}deg)`,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                { card.title || '' }
                ==
                {index}
              </Typography>
              <Typography variant="body2">
                { card.content || ''}
              </Typography>
            </CardContent>
          </Card>

        ))
      }
    </div>
  );
}
