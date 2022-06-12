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
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  Switch,
  FormControlLabel,
} from '@mui/material';

import { BaseLayout } from '../layouts';

import { getProfileAction } from '../store/reducers/auth';

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const userProfile = useSelector((state) => state.auth.user);

  const [isResetPwd, setIsResetPwd] = React.useState(false);

  React.useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  console.log('userProfile => ', userProfile);

  return (
    <BaseLayout>
      <Container sx={{ paddingTop: '2em', paddingBottom: '2em', marginBottom: '2em' }}>
        <Typography variant="h5" sx={{ marginBottom: '1em' }}>行事曆</Typography>
        {
          userProfile && (
            <>
              <TextField
                id="email"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                value={userProfile.email}
                margin="dense"
                disabled
              />
              <TextField
                id="name"
                label="姓名"
                type="text"
                fullWidth
                variant="outlined"
                value={userProfile.name}
                margin="dense"
              />
              {
                isResetPwd && (
                  <>
                    <TextField
                      id="password"
                      label="密碼"
                      type="password"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                    />
                    <TextField
                      id="repeat-password"
                      label="密碼確認"
                      type="password"
                      fullWidth
                      variant="outlined"
                      margin="dense"
                    />
                  </>
                )
              }
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">是否更改密碼</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch checked={isResetPwd} onChange={() => setIsResetPwd((pre) => !pre)} name="gilad" />
                    }
                  />
                </FormGroup>
              </FormControl>

            </>
          )
        }

      </Container>
    </BaseLayout>
  );
}
