import React from 'react';
import _ from 'lodash';
import Swal from 'sweetalert2';
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
  Grid,
} from '@mui/material';

import { BaseLayout } from '../layouts';

import { getProfileAction, updateProfileAction } from '../store/reducers/auth';

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const userProfile = useSelector((state) => state.auth.user);

  const [isResetPwd, setIsResetPwd] = React.useState(false);
  const [formData, setFormData] = React.useState(null);

  React.useEffect(() => {
    dispatch(getProfileAction());
  }, []);

  React.useEffect(() => {
    setFormData(userProfile);
  }, [userProfile]);

  const handleChanage = (event) => {
    // TODO: when onchage password === repeatPassword
    setFormData((pre) => ({
      ...pre,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('formData => ', formData);

      if (isResetPwd) {
        if (formData.password !== formData.repeatPassword) {
          throw new Error('密碼需與密碼確認一致');
        }
        if (formData.password.length < 8) {
          throw new Error('密碼長度需大於8個字元');
        }
      }

      const resultAction = await dispatch(updateProfileAction({
        ..._.pick(formData, ['name']),
        ...isResetPwd ? { password: formData.password } : {},
      }));

      unwrapResult(resultAction);

      Swal.fire({
        icon: 'success',
        title: '更新成功',
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
      });
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

  return (
    <BaseLayout>
      <Container sx={{ paddingTop: '2em', paddingBottom: '2em', marginBottom: '2em' }}>
        <Typography variant="h5" sx={{ marginBottom: '1em' }}>行事曆</Typography>
        {
          formData && (
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.email}
                margin="dense"
                disabled
              />
              <TextField
                id="name"
                label="姓名"
                type="text"
                fullWidth
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={(e) => handleChanage(e)}
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
                      value={formData.password}
                      margin="dense"
                      name="password"
                      onChange={(e) => handleChanage(e)}
                    />
                    <TextField
                      id="repeat-password"
                      label="密碼確認"
                      type="password"
                      fullWidth
                      variant="outlined"
                      name="repeatPassword"
                      value={formData.repeatPassword}
                      margin="dense"
                      onChange={(e) => handleChanage(e)}
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

              <Grid container justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="thirdColor"
                  type="submit"
                >
                  送出
                </Button>
              </Grid>

            </form>
          )
        }

      </Container>
    </BaseLayout>
  );
}
