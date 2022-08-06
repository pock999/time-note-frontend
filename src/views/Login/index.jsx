// react
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// redux
import { unwrapResult } from '@reduxjs/toolkit';

// common tools(npm)
import _ from 'lodash';

// styled-components
import styled from 'styled-components';

// atomize
import {
  Row, Col, Div, Text, Input, Button, Icon,
} from 'atomize';

// custom components
import { Card } from '../../components';
import AccountInput from './AccountInput';
import PasswordInput from './PasswordInput';

// custom utils
import SwalHelper from '../../utils/SwalHelper';

// store
import { loginAction, registerAction } from '../../store/reducers/auth';

// styled-component
const Wrapper = styled('div')`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-image: url("../assets/home-calendar-side.png");
  background-repeat: no-repeat;
  background-size: cover;

  opacity: 0.6;
`;

const initFormState = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = React.useState(initFormState);
  // Tabs
  const [focusTab, setFocusTab] = React.useState(0);

  const handleChange = (target, evt) => {
    setState((pre) => ({
      ...pre,
      ...target === 'email' ? { email: evt.target.value } : {},
      ...target === 'password' ? { password: evt.target.value } : {},
      ...target === 'name' ? { name: evt.target.value } : {},
      ...target === 'repeatPassword' ? { repeatPassword: evt.target.value } : {},
    }));
  };

  const loginSubmit = async (evt) => {
    evt.preventDefault();
    // TODO: yup
    const resultAction = await dispatch(loginAction({ ..._.pick(state, ['email', 'password']) }));
    try {
      unwrapResult(resultAction);
      history.push('/notes');
    } catch (e) {
      SwalHelper.fail(e.message);
    }
  };

  const registerSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (state.password !== state.repeatPassword) {
        throw new Error('密碼需與密碼確認一致');
      }

      if (state.password.length < 8) {
        throw new Error('密碼長度需大於8個字元');
      }

      // TODO: yup
      const resultAction = await dispatch(registerAction({ ..._.pick(state, ['email', 'password', 'name']) }));
      unwrapResult(resultAction);

      SwalHelper.success('註冊成功');

      setFocusTab((pre) => {
        setState(initFormState);
        return 0;
      });
    } catch (e) {
      SwalHelper.fail(e.message);
    }
  };

  return (
    <Wrapper>
      <Card minW={{ xs: '100%', md: '500px' }}>
        <Row>
          <Col size="5">
            <Text tag="h1" textSize="heading" m="1rem">
              { focusTab === 0 ? '登入' : '註冊' }
            </Text>
          </Col>
        </Row>
        {
        focusTab === 0
          ? (
            <form onSubmit={(evt) => loginSubmit(evt)}>
              <AccountInput
                value={state.email}
                onChange={(evt) => handleChange('email', evt)}
              />
              <PasswordInput
                value={state.password}
                onChange={(evt) => handleChange('password', evt)}
              />
              <Row>
                <Col size="12">
                  <Div m="1rem" d="flex" flexDir="row" justify="flex-end">
                    <Button
                      bg="warning700"
                      hoverBg="warning800"
                      rounded="circle"
                      p={{ r: '1.5rem', l: '1.5rem' }}
                      shadow="3"
                      hoverShadow="4"
                      type="button"
                      onClick={() => setFocusTab(1)}
                    >
                      切換註冊
                    </Button>
                    <Button
                      bg="warning700"
                      hoverBg="warning800"
                      rounded="circle"
                      p={{ r: '1.5rem', l: '1.5rem' }}
                      shadow="3"
                      hoverShadow="4"
                      type="submit"
                    >
                      登入
                    </Button>
                  </Div>
                </Col>
              </Row>
            </form>
          )
          : (
            <form onSubmit={(evt) => registerSubmit(evt)}>
              <Input
                placeholder="名字"
                m=".5rem"
                value={state.name}
                onChange={(evt) => handleChange('name', evt)}
              />
              <AccountInput
                value={state.email}
                onChange={(evt) => handleChange('email', evt)}
              />
              <PasswordInput
                value={state.password}
                onChange={(evt) => handleChange('password', evt)}
              />
              <PasswordInput
                placeholder="密碼確認"
                value={state.repeatPassword}
                onChange={(evt) => handleChange('repeatPassword', evt)}
              />
              <Row>
                <Col size="12">
                  <Div m="1rem" d="flex" flexDir="row" justify="flex-end">
                    <Button
                      bg="warning700"
                      hoverBg="warning800"
                      rounded="circle"
                      p={{ r: '1.5rem', l: '1.5rem' }}
                      shadow="3"
                      hoverShadow="4"
                      type="button"
                      onClick={() => setFocusTab(0)}
                    >
                      切換登入
                    </Button>
                    <Button
                      bg="warning700"
                      hoverBg="warning800"
                      rounded="circle"
                      p={{ r: '1.5rem', l: '1.5rem' }}
                      shadow="3"
                      hoverShadow="4"
                      type="submit"
                    >
                      註冊
                    </Button>
                  </Div>
                </Col>
              </Row>
            </form>
          )
      }
      </Card>
    </Wrapper>
  );
}
