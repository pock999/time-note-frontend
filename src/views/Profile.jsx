import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocation, useHistory, Link } from 'react-router-dom';

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

import { BaseLayout } from '../layouts';

import { getProfileAction } from '../store/reducers/auth';

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const userProfile = useSelector((state) => state.auth.user);

  React.useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  console.log('userProfile => ', userProfile);

  return (
    <BaseLayout>
      <Container sx={{ paddingTop: '2em', paddingBottom: '2em', marginBottom: '2em' }}>
        Profile
      </Container>
    </BaseLayout>
  );
}
