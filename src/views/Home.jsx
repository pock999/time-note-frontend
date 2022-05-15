import React from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import history from '../libs/history';

const Parallax = styled('div')`
  background-image: url("../assets/home-calendar.jpeg");
  min-height: 300px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
`;

export default function Home() {

  return (
    <>
      <Parallax />
      <div
        style={{
          backgroundColor: '#F2DE77',
          minHeight: 'calc(100vh - 300px)',
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center',
            paddingTop: '100px',
            paddingBottom: '100px',
          }}
        >
          <Card
            sx={{
              width: '100%',
              minHeight: '50vh',
              maxWidth: '600px',
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Time-Note
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} size="small" to="/login">前往登入</Button>
              {/* <Button onClick={() => history.push('/login')} size="small" to="/login">前往登入</Button> */}
            </CardActions>
          </Card>
        </Container>
      </div>
    </>
  );
}
