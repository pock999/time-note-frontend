import React from 'react';
import { useHistory } from 'react-router-dom';

// atomize
import {
  Div, Button,
} from 'atomize';

// custom components
import WaveText from './WaveText';

export default function Page404() {
  const history = useHistory();
  return (
    <Div d="flex" justify="center" align="center" w="100vw" h="100vh">
      <WaveText>404</WaveText>
      <Button
        bg="warning700"
        hoverBg="warning800"
        rounded="circle"
        p={{ r: '1.5rem', l: '1.5rem' }}
        shadow="3"
        hoverShadow="4"
        m={{ t: '5rem' }}
        onClick={() => history.goBack()}
      >
        回上一頁
      </Button>
    </Div>
  );
}
