/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

// common tools(npm)
import _ from 'lodash';

// components
import Card from './Card';
import Wrapper from './Wrapper';

const computeRotate = (index, len, base = 1) => {
  if (index + 1 === len) {
    return 0;
  }

  return 0 + ((len - index - 1) * base);
};

export default function CardStack(props) {
  const {
    cards,
    col,
    onClick,
    cardContent,
  } = props;

  const [base, setBase] = React.useState(0.5);

  if (!_.isArray(cards)) {
    return (<></>);
  }

  if (!_.isArray(cards)) {
    return (<></>);
  }

  return (
    <Wrapper
      col={col}
      onMouseEnter={() => setBase(1.5)}
      onMouseLeave={() => setBase(1)}
      onClick={onClick}
    >
      {
        _.takeRight(cards, 3).map((card, index, ary) => (
          <Card
            key={card.id}
            card={card}
            deg={computeRotate(index, ary.length, base)}
            cardContent={cardContent}
          />
        ))
      }
    </Wrapper>

  );
}
