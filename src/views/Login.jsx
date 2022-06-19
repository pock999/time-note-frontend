// react
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// redux
import { unwrapResult } from '@reduxjs/toolkit';

// common tools(npm)
import Swal from 'sweetalert2';
import _ from 'lodash';

// mui(npm)
import { styled } from '@mui/material/styles';
import {
  FormControl,
  TextField,
  Container,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Box,
  Tabs,
  Tab,
} from '@mui/material';

// store
import { loginAction } from '../store/reducers/auth';

// styled-component
const Wrapper = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  @media (max-width: ${578}px) {
    flex-direction: column;
  }
`;

const Left = styled('div')`
  background-image: url("../assets/home-calendar-side.png");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
  width: 60%;
  height: 100%;

  @media (max-width: ${578}px) {
    width: 100%;
    height: 0vh;
  }
`;

const RightFormWrapper = styled('div')`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items:center;
  background-color: #F2DE77;
  @media (max-width: ${578}px) {
    width: 100%;
  }
`;

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleChange = (target, evt) => {
    setState((pre) => ({
      ...pre,
      ...target === 'email' ? { email: evt.target.value } : {},
      ...target === 'password' ? { password: evt.target.value } : {},
      ...target === 'name' ? { name: evt.target.value } : {},
      ...target === 'repeatPassword' ? { repeatPassword: evt.target.value } : {},
    }));
  };

  const loginSubmit = async () => {
    const resultAction = await dispatch(loginAction({ ..._.pick(state, ['email', 'password']) }));
    try {
      unwrapResult(resultAction);
      history.push('/notes');
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: e.message,
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
      });
    }
  };

  const registerSubmit = async () => {};

  // Tabs
  const [focusTab, setFocusTab] = React.useState(0);

  return (
    <Wrapper>
      <Left />
      <RightFormWrapper>
        <Card
          sx={{
            margin: '10px',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={focusTab} onChange={(evt, value) => setFocusTab(value)}>
              <Tab label="登入" value={0} />
              <Tab label="註冊" value={1} />
            </Tabs>
          </Box>
          <Divider />
          <CardContent>

            <FormControl sx={{ m: 1 }} fullWidth>
              <TextField
                id="email-input"
                label="Email"
                variant="outlined"
                size="small"
                value={state.email}
                onChange={(e) => handleChange('email', e)}
              />
            </FormControl>

            <FormControl sx={{ m: 1 }} fullWidth>
              {
                focusTab === 1 && (
                  <TextField
                    id="name-input"
                    label="名字"
                    variant="outlined"
                    size="small"
                    value={state.name}
                    onChange={(e) => handleChange('name', e)}
                  />
                )
              }
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth>
              <TextField
                id="password-input"
                label="密碼"
                variant="outlined"
                type="password"
                size="small"
                value={state.password}
                onChange={(e) => handleChange('password', e)}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth>
              {
                focusTab === 1 && (
                  <TextField
                    id="repeat-password-input"
                    label="密碼確認"
                    variant="outlined"
                    type="password"
                    size="small"
                    value={state.repeatPassword}
                    onChange={(e) => handleChange('repeatPassword', e)}
                  />
                )
              }
            </FormControl>
          </CardContent>
          <Divider />
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              size="small"
              color="thirdColor"
              variant="contained"
              component={Link}
              to="/"
              sx={{
                marginRight: 1,
              }}
            >
              首頁
            </Button>
            {
              focusTab === 0 && (
              <Button
                size="small"
                onClick={() => loginSubmit()}
                color="thirdColor"
                variant="contained"
              >
                登入
              </Button>
              )
            }
            {
              focusTab === 1 && (
              <Button
                size="small"
                onClick={() => registerSubmit()}
                color="thirdColor"
                variant="contained"
              >
                註冊
              </Button>
              )
            }
          </CardActions>
        </Card>
      </RightFormWrapper>
    </Wrapper>
  );
}
