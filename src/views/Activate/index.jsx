// react
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  useLocation, useHistory, Link, useParams,
} from 'react-router-dom';

// common tools(npm)
import dayjs from 'dayjs';
import moment from 'moment';
import _ from 'lodash';

// store

// use query params
import {
  StringParam, useQueryParam,
} from 'use-query-params';

// atomize
import {
  Container, Row, Col, Div, Text, Button, Icon,
} from 'atomize';
import { activateAction } from '../../store/reducers/auth';

export default function Activate() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [token] = useQueryParam('token', StringParam);

  const [message, setMessage] = React.useState({
    type: null,
    content: null,
  });

  React.useEffect(() => {
    // 沒有token，回首頁
    if (!token) {
      history.push('/');
    }

    (async () => {
      try {
        const resultAction = await dispatch(activateAction({
          token,
        }));
        unwrapResult(resultAction);
        setMessage({
          type: 'success',
          content: '啟用成功',
        });
      } catch (e) {
        setMessage({
          type: 'failed',
          content: `啟用失敗，${_.get(e, 'message') || _.get(e, 'payload.error')}`,
        });
      }
    })();
  }, []);

  return (
    <Div w="100vw" h="100vh" d="flex" flexDir="column" justify="center" align="center">
      {
        !message.type && <Icon name="Loading2" size="200px" />
      }
      {
        message.type === 'success' && <Icon name="Checked" size="200px" />
      }
      {
        message.type === 'failed' && <Icon name="Cross" size="200px" />
      }
      <Text>{message.content}</Text>
      <Link to="/login">
        <Button
          bg="warning700"
          hoverBg="warning800"
          rounded="circle"
          p={{ r: '1.5rem', l: '1.5rem' }}
          shadow="3"
          hoverShadow="4"
        >
          回登入頁
        </Button>
      </Link>
    </Div>
  );
}
