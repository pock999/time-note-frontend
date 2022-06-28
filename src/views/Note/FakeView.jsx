/* eslint-disable radix */

// react
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocation, useHistory, Link } from 'react-router-dom';

// mui(npm)
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

export default function FakeView() {
  const fakeData = [
    {
      id: 1,
      title: '標題1',
      content: '內容1',
      type: 1,
      startAt: '2022-06-13 12:12:12',
      endAt: '2022-06-20 12:12:12',
    },
    {
      id: 2,
      title: '標題2',
      content: '內容2',
      type: 1,
      startAt: '2022-06-20 10:50:10',
      endAt: '2022-06-24 18:12:22',
    },
    {
      id: 3,
      title: '標題3',
      content: '內容3',
      type: 2,
      startAt: '2022-06-21 13:07:10',
      endAt: '2022-06-23 19:17:41',
    },
  ];

  const groupDataByDate = fakeData.reduce((group, data) => {
    const { startAt } = data;
    group[startAt.slice(0, 10)] = group[startAt.slice(0, 10)] ?? [];
    group[startAt.slice(0, 10)].push(data);
    return group;
  }, {});

  return (
    <Grid container spacing={2}>
      {
        Object.keys(groupDataByDate).map((group) => (
          <Grid item key={group} xs={12}>
            <Divider>{group}</Divider>
            <Grid container>

              {groupDataByDate[group].map((data) => (
                <Grid item xs={12} md={4} key={data.id}>
                  <Card sx={{ boxShadow: '5px 10px 5px #DCDCDC' }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        { data.startAt }
                        {' '}
                        ~
                        {' '}
                        { data.endAt }
                      </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        { data.title }
                      </Typography>
                      <Typography variant="body2">
                        { data.content }
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">編輯</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  );
}
