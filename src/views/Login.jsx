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

// mui(npm)
// import {
//   FormControl,
//   TextField,
//   Container,
//   // Card,
//   CardHeader,
//   CardActions,
//   CardContent,
//   Button,
//   Typography,
//   Divider,
//   Box,
//   Tabs,
//   Tab,
// } from '@mui/material';
import { Card } from '../components';

// custom utils
import SwalHelper from '../utils/SwalHelper';

// store
import { loginAction, registerAction } from '../store/reducers/auth';

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

  const loginSubmit = async () => {
    // TODO: yup
    const resultAction = await dispatch(loginAction({ ..._.pick(state, ['email', 'password']) }));
    try {
      unwrapResult(resultAction);
      history.push('/notes');
    } catch (e) {
      SwalHelper.fail(e.message);
    }
  };

  const registerSubmit = async () => {
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
      <Card>test</Card>
    </Wrapper>
  );

  // return (
  //   <Wrapper>
  //     <Left />
  //     <RightFormWrapper>
  //       <Card
  //         sx={{
  //           margin: '10px',
  //           width: '90%',
  //         }}
  //       >
  //         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  //           <Tabs value={focusTab} onChange={(evt, value) => setFocusTab(value)}>
  //             <Tab label="登入" value={0} />
  //             <Tab label="註冊" value={1} />
  //           </Tabs>
  //         </Box>
  //         <Divider />
  //         <CardContent>

  //           <FormControl sx={{ m: 1 }} fullWidth>
  //             <TextField
  //               id="email-input"
  //               label="Email"
  //               variant="outlined"
  //               size="small"
  //               value={state.email}
  //               onChange={(e) => handleChange('email', e)}
  //             />
  //           </FormControl>

  //           <FormControl sx={{ m: 1 }} fullWidth>
  //             {
  //               focusTab === 1 && (
  //                 <TextField
  //                   id="name-input"
  //                   label="名字"
  //                   variant="outlined"
  //                   size="small"
  //                   value={state.name}
  //                   onChange={(e) => handleChange('name', e)}
  //                 />
  //               )
  //             }
  //           </FormControl>
  //           <FormControl sx={{ m: 1 }} fullWidth>
  //             <TextField
  //               id="password-input"
  //               label="密碼"
  //               variant="outlined"
  //               type="password"
  //               size="small"
  //               value={state.password}
  //               onChange={(e) => handleChange('password', e)}
  //             />
  //           </FormControl>
  //           <FormControl sx={{ m: 1 }} fullWidth>
  //             {
  //               focusTab === 1 && (
  //                 <TextField
  //                   id="repeat-password-input"
  //                   label="密碼確認"
  //                   variant="outlined"
  //                   type="password"
  //                   size="small"
  //                   value={state.repeatPassword}
  //                   onChange={(e) => handleChange('repeatPassword', e)}
  //                 />
  //               )
  //             }
  //           </FormControl>
  //         </CardContent>
  //         <Divider />
  //         <CardActions
  //           sx={{
  //             display: 'flex',
  //             justifyContent: 'flex-end',
  //           }}
  //         >
  //           <Button
  //             size="small"
  //             variant="contained"
  //             component={Link}
  //             to="/"
  //             sx={{
  //               marginRight: 1,
  //             }}
  //           >
  //             首頁
  //           </Button>
  //           {
  //             focusTab === 0 && (
  //             <Button
  //               size="small"
  //               onClick={() => loginSubmit()}
  //               variant="contained"
  //             >
  //               登入
  //             </Button>
  //             )
  //           }
  //           {
  //             focusTab === 1 && (
  //             <Button
  //               size="small"
  //               onClick={() => registerSubmit()}
  //               variant="contained"
  //             >
  //               註冊
  //             </Button>
  //             )
  //           }
  //         </CardActions>
  //       </Card>
  //     </RightFormWrapper>
  //   </Wrapper>
  // );
}
