import React from 'react';
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

  return (
    <Wrapper>
      <Left />
      <RightFormWrapper>
        <Card
          sx={{
            margin: '10px',
          }}
        >
          <CardHeader title="登入頁" />
          <Divider />
          <CardContent>
            <FormControl sx={{ m: 1 }} fullWidth>
              <TextField id="email-input" label="Email" variant="outlined" size="small" />
            </FormControl>
            <FormControl sx={{ m: 1 }} fullWidth>
              <TextField id="password-input" label="密碼" variant="outlined" type="password" size="small" />
            </FormControl>
          </CardContent>
          <Divider />
          <CardActions
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button size="small">登入</Button>
          </CardActions>
        </Card>
      </RightFormWrapper>
    </Wrapper>
  );
}
