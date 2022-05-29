import React from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import {
  Container,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
} from '@mui/material';

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
            <CardHeader title="Time-Note" />
            <Divider />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                開通功能
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                登入
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                列表
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                component={Link}
                size="small"
                to="/login"
                variant="contained"
                color="thirdColor"
              >
                前往登入
              </Button>
            </CardActions>
          </Card>
        </Container>
      </div>
    </>
  );
}
