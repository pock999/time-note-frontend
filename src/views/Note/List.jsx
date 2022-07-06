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
  Skeleton,
  ButtonGroup,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

// use query params
import { useQueryParam, NumberParam } from 'use-query-params';

// custom hooks
import { useQuery, useWindowSize } from '../../hooks';

// custom components
import { FormModal, CardStack } from '../../components';

// custom layout
import { BaseLayout } from '../../layouts';

// custom utils
import { delayFunction, dateFormat } from '../../utils/commons';
import SwalHelper from '../../utils/SwalHelper';

// store
import {
  fetchNoteList, fetchNoteDetail, createNote, updateNote, fetchNoteTypes,
} from '../../store/reducers/note';
import { showLoading, hideLoading } from '../../store/reducers/loading';

// yup schema
import { createSchema, updateSchema } from './formSchema';

// TODO: fake
import FakeView from './FakeView';

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

  // 是否要分組
  const [isGroup, setIsGroup] = useQueryParam('isGroup', NumberParam);

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
      (async () => {
        await dispatch(fetchNoteTypes());

        const resultAction = await dispatch(fetchNoteList({
          searchStr: location.search.split('?')[1],
        }));

        const result = unwrapResult(resultAction);
      })();
    } catch (e) {
      SwalHelper.error('錯誤', e.message);
    }
  }, [location.search]);

  // 偵測螢幕尺寸
  React.useEffect(() => {
  }, [windowWidth]);

  // 沒有資料 || 分組狀態但資料不為分組資料形式 || 不為分組狀態但資料為分組資料形式
  if (!noteList || (isGroup && !_.isObject(noteList)) || (!isGroup && !_.isArray(noteList))) {
    return (
      <BaseLayout>
        <Container sx={{
          paddingTop: '3.5em',
          paddingBottom: '2em',
          marginBottom: '2em',
          display: 'flex',
        }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card sx={{ boxShadow: '5px 5px 5px #ABABAB', border: '1px solid #ABABAB' }}>
                <CardContent>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={150}
                  />
                </CardContent>
                <CardActions>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={20}
                  />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Container sx={{ paddingTop: '3.5em', paddingBottom: '2em', marginBottom: '2em' }}>
        <Grid container spacing={2}>
          {
            isGroup
              ? (
                Object.keys(noteList).map((group, index) => (
                  <CardStack
                    key={group}
                    col={6}
                    cards={noteList[group]}
                    onClick={() => setIsGroup(0)}
                  />
                ))
              )
              : noteList.map((data) => (
                <Grid item xs={12} md={4} key={data.id}>
                  <Card sx={{ boxShadow: '5px 5px 5px #ABABAB', border: '1px solid #ABABAB' }}>
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
              ))
          }
        </Grid>
      </Container>
    </BaseLayout>
  );
}
