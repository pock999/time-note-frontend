/* eslint-disable radix */

// react
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocation, useHistory, Link } from 'react-router-dom';

// common tools(npm)
import dayjs from 'dayjs';
import _ from 'lodash';

// mui(npm)
import {
  Container,
  Button,
  Typography,
  Grid,
  ButtonGroup,
} from '@mui/material';

// custom hooks
import { useQuery, useWindowSize } from '../../hooks';

// custom components
import { FormModal } from '../../components';

// custom layout
import { BaseLayout } from '../../layouts';

// custom utils
import { delayFunction, dateFormat } from '../../utils/commons';
import SwalHelper from '../../utils/SwalHelper';

// store
import {
  fetchNoteList, fetchNoteDetail, createNote, updateNote,
} from '../../store/reducers/note';
import { showLoading, hideLoading } from '../../store/reducers/loading';

// yup schema
import { createSchema, updateSchema } from './formSchema';

const emptyNote = {
  title: '',
  content: '',
  type: null,
  startAt: null,
  endAt: null,
};

export default function NoteList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [windowWidth, windowHeight] = useWindowSize();

  const noteList = useSelector((state) => state.note.list);
  const notePagination = useSelector((state) => state.note.pagination);

  // FormModal is open
  const [modalOpen, setModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ ...emptyNote });
  const openForm = async ({ rowId = null, dateTime = null }) => {
    if (rowId) {
      const resultAction = await dispatch(fetchNoteDetail({ id: rowId }));
      const data = await unwrapResult(resultAction);
      setModalOpen((pre) => {
        setFormData(data);
        return true;
      });
    } else {
      setModalOpen((pre) => {
        setFormData({
          ...emptyNote,
          startAt: dateTime,
          endAt: dateTime,
        });
        return true;
      });
    }
  };

  // 對note編輯(onChange)
  const editForm = (value, target) => {
    // console.log('value => ', value);
    // console.log('target => ', target);
    setFormData({
      ...formData,
      [target]: value,
    });
  };

  // 關閉note編輯
  const closeForm = async () => {
    setModalOpen(false);
    setFormData({ ...emptyNote });
  };

  // 保存
  const saveForm = async () => {
    try {
      let resultAction;
      console.log('formData => ', formData);

      // TODO:

      SwalHelper.success(`${formData.id ? '更新' : '新增'}成功`);
    } catch (e) {
      SwalHelper.fail(e.message);
    }
  };

  //
  // useEffect
  //

  // 偵測 url query string
  React.useEffect(() => {
    try {
      //
    } catch (e) {
      SwalHelper.error('錯誤', e.message);
    }
  }, [location.search]);

  // 偵測螢幕尺寸
  React.useEffect(() => {
  }, [windowWidth]);

  return (
    <BaseLayout>
      <Container sx={{ paddingTop: '2em', paddingBottom: '2em', marginBottom: '2em' }}>
        gfdgfd
      </Container>
    </BaseLayout>
  );
}
