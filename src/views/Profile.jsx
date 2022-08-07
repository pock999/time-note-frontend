// react
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocation, useHistory, Link } from 'react-router-dom';

// common tools(npm)
import _ from 'lodash';

// custom utils
import SwalHelper from '../utils/SwalHelper';

// custom layout
import { BaseLayout } from '../layouts';

// store
import { getProfileAction, updateProfileAction } from '../store/reducers/auth';

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const userProfile = useSelector((state) => state.auth.user);

  const [isResetPwd, setIsResetPwd] = React.useState(false);
  const [formData, setFormData] = React.useState(null);
  return (
    <BaseLayout>
      個人資料
    </BaseLayout>
  );
}
