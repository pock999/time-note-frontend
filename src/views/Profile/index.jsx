// react
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocation, useHistory, Link } from 'react-router-dom';

// common tools(npm)
import _ from 'lodash';

// atomize
import {
  Container, Row, Col, Div, Text, Button, Icon, Input, Switch, Label,
} from 'atomize';

// custom utils
import SwalHelper from '../../utils/SwalHelper';

// custom layout
import { BaseLayout } from '../../layouts';

// custom components
import { Card, PasswordInput } from '../../components';

// store
import { getProfileAction, updateProfileAction } from '../../store/reducers/auth';

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

      setIsResetPwd(false);
      SwalHelper.success('更新成功');
    } catch (e) {
      SwalHelper.fail(_.get(e, 'message') || _.get(e, 'payload.error'));
    }
  };
  return (
    <BaseLayout>
      <Container
        p="2em"
        m={{
          b: '2em',
        }}
      >
        <Card
          p="3em"
          rounded="md"
          shadow="3"
        >
          <Text textSize="heading">個人資料</Text>
          {
          formData && (
            <form onSubmit={handleSubmit}>
              <Text
                m=".5rem"
                p={{ l: '.15em' }}
                textSize="title"
              >
                {formData.email}
              </Text>

              <Input
                placeholder="名字"
                m={{
                  t: '1.5em',
                  r: '.5rem',
                  b: '.5rem',
                  l: '.5rem',
                }}
                name="name"
                value={formData.name}
                onChange={(e) => handleChanage(e)}
              />

              {
                isResetPwd && (
                  <>
                    <PasswordInput
                      m={{
                        t: '1.5em',
                        r: '.5rem',
                        b: '.5rem',
                        l: '.5rem',
                      }}
                      value={formData.password}
                      name="password"
                      onChange={(e) => handleChanage(e)}
                      placeholder="新密碼"
                    />
                    <PasswordInput
                      m={{
                        t: '1.5em',
                        r: '.5rem',
                        b: '.5rem',
                        l: '.5rem',
                      }}
                      name="repeatPassword"
                      value={formData.repeatPassword}
                      onChange={(e) => handleChanage(e)}
                      placeholder="密碼確認"
                    />
                  </>
                )
              }

              <Label
                onClick={() => setIsResetPwd((pre) => !pre)}
                align="center"
                textWeight="600"
                m={{
                  t: '1.5em',
                  r: '.5rem',
                  b: '.5rem',
                  l: '.75rem',
                }}
              >
                <Switch
                  checked={isResetPwd}
                />
                是否重設密碼
              </Label>

              <Div
                d="flex"
                justify="flex-end"
              >
                <Button
                  bg="warning700"
                  hoverBg="warning800"
                  rounded="circle"
                  p={{ r: '1.5rem', l: '1.5rem' }}
                  shadow="3"
                  hoverShadow="4"
                  type="submit"
                >
                  送出
                </Button>
              </Div>
            </form>
          )
        }
        </Card>
      </Container>
    </BaseLayout>
  );
}
