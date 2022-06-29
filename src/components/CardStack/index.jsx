/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

// common tools(npm)
import _ from 'lodash';

// components
import Card from './Card';
import Wrapper from './Wrapper';

const computeRotate = (index, len, base = 0.5) => {
  if (index + 1 === len) {
    return 0;
  }

  return 0 + ((len - index) * base);
};

export default function CardStack(props) {
  const {
    cards,
    col,
  } = props;

  const [base, setBase] = React.useState(0.5);

  if (!_.isArray(cards)) {
    return (<></>);
  }

  return (

    <Wrapper
      col={col}
      onMouseEnter={() => setBase(1)}
      onMouseLeave={() => setBase(0.5)}
    >
      {
        cards.map((card, index, ary) => (
          <Card
            key={card.id}
            card={card}
            deg={computeRotate(index, ary.length, base)}
          />
        ))
      }
    </Wrapper>

  );
}
