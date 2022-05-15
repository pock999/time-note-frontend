import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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
} from '@mui/material';

import { loginAction } from '../store/reducers/auth';

const Wrapper = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  @media (max-width: ${578}px) {
    flex-direction: column;
  }
`;

const Right = styled('div')`
  background-image: url("../assets/home-calendar.jpeg");
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

const LeftFormWrapper = styled('div')`
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

  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (target, evt) => {
    setState(pre => ({
      ...pre,
      ...target === 'email' ? { email: evt.target.value } : {},
      ...target === 'password' ? { password: evt.target.value } : {},
    }));
  };

  const loginSubmit = async () => {
    dispatch(loginAction(state));
  };

  return (
    <Wrapper>
      
      <LeftFormWrapper>
        <Card
          sx={{
            margin: '10px',
          }}
        >
          <CardHeader title="登入頁" />
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
              onClick={() => loginSubmit()}
            >
              登入
            </Button>
          </CardActions>
        </Card>
      </LeftFormWrapper>
      <Right />
    </Wrapper>
  );
}
