// react
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import _ from 'lodash';

// atomize
import {
  Container, Row, Col, Div, Text, Button, Icon, Input, Switch, Label,
} from 'atomize';

// styled-components
import styled, { keyframes, css } from 'styled-components';

// custom components
import SlideFadeTitle from './SlideFadeTitle';
import FadeIn from './FadeIn';
import { Card } from '../../components';

// package.json info
const { version } = require('../../../package.json');

// styled-component
const Wrapper = styled('div')`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url("../assets/home-calendar-side.png");
  background-repeat: no-repeat;
  background-size: cover;

`;

export default function Home() {
  const user = useSelector((state) => state.auth.user);

  const [info, setInfo] = React.useState({
    api_ver: null,
  });

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get('/info');

      setInfo((pre) => ({
        ...pre,
        api_ver: _.get(data, 'data.version'),
      }));
    })();
  }, []);

  return (
    <Wrapper>
      <SlideFadeTitle>
        Time-Note
      </SlideFadeTitle>
      <FadeIn>
        <Card
          w={{
            xs: 'calc(100vw-20px)',
            md: '500px',
          }}
          m={{
            t: '50px',
            l: { xs: '10px', md: '0' },
            r: { xs: '10px', md: '0' },
          }}
          p="30px"
          rounded="md"
        >
          <Text tag="h2" textSize="display1">
            一個備忘紀錄的系統。
          </Text>

          <hr
            style={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
          />

          <Text tag="h3" textSize="title">
            目標
          </Text>
          <Text tag="p" textSize="subheader">
            期望打造一個行事曆 + 筆記功能的系統
          </Text>

          <Text tag="h3" textSize="title">
            核心理念
          </Text>
          <Text tag="p" textSize="subheader">
            想要讓紀錄與行事曆在同一個系統就能同時具備
          </Text>

          <hr
            style={{
              marginTop: '20px',
              marginBottom: '20px',
            }}
          />

          <Div m="1rem" d="flex" flexDir="row" justify="center">
            <Link to={user ? '/notes' : '/login'}>
              <Button
                bg="warning700"
                hoverBg="warning800"
                rounded="circle"
                p={{ r: '1.5rem', l: '1.5rem' }}
                shadow="3"
                hoverShadow="4"
                type="submit"
                m={{ t: '20px' }}
              >
                前往體驗
              </Button>
            </Link>
          </Div>

          <Div m="1rem" d="flex" flexDir="row" justify="flex-end">
            <Text textColor="gray700">
              前端:
              {` V${version}`}
            </Text>
            <Text textColor="gray700">
              {'  '}
              ／
              {'  '}
            </Text>
            <Text textColor="gray700">{info.api_ver ? `API: V${info.api_ver}` : 'API未連線' }</Text>
          </Div>
        </Card>
      </FadeIn>
    </Wrapper>
  );
}
