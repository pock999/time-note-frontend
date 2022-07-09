/* eslint-disable radix */

// react
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  useLocation, useHistory, Link, useParams,
} from 'react-router-dom';

// common tools(npm)
import dayjs from 'dayjs';
import moment from 'moment';
import _ from 'lodash';

// mui(npm)
import {
  Container,
  AppBar,
  Button,
  Typography,
  Grid,
  Skeleton,
  ButtonGroup,
  Card,
  CardContent,
  CardActions,
  Divider,
  Chip,
} from '@mui/material';

// mui icons
import TouchAppIcon from '@mui/icons-material/TouchApp';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// use query params
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

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

const emptyNote = {
  title: '',
  content: '',
  type: null,
  startAt: null,
  endAt: null,
};

export default function NoteList() {
  // /notes/:type
  const { type } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [windowWidth, windowHeight] = useWindowSize();

  const noteList = useSelector((state) => state.note.list);
  const notePagination = useSelector((state) => state.note.pagination);
  const noteTypes = useSelector((state) => state.note.noteTypes);

  //
  // url params
  //
  const [query, setQuery] = useQueryParams({
    isGroup: NumberParam,
    startAt: StringParam,
    endAt: StringParam,
  });

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
          type: type || null,
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

      if (formData.id) {
        resultAction = await dispatch(updateNote(formData));
      } else {
        resultAction = await dispatch(createNote(formData));
      }

      await unwrapResult(resultAction);

      SwalHelper.success(`${formData.id ? '更新' : '新增'}成功`);

      closeForm();
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

        const typeQuery = (typeof type !== 'undefined' && type !== null) ? `type=${type}` : '';

        const resultAction = await dispatch(fetchNoteList({
          searchAry: [location.search.split('?')[1], typeQuery],
        }));

        const result = unwrapResult(resultAction);
      })();
    } catch (e) {
      SwalHelper.error('錯誤', e.message);
    }
  }, [location.search, location.pathname]);

  // 偵測螢幕尺寸
  React.useEffect(() => {
  }, [windowWidth]);

  // 沒有資料 || 分組狀態但資料不為分組資料形式 || 不為分組狀態但資料為分組資料形式
  if (!noteList || ((query.isGroup || typeof query.isGroup === 'undefined' || query.isGroup === null) && !_.isObject(noteList)) || (query.isGroup === 0 && !_.isArray(noteList[Object.keys(noteList)[0]]))) {
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
            <Grid item xs={12}>
              <AppBar position="static" color="inherit">
                <Container
                  maxWidth={false}
                  sx={{
                    width: '100%', p: 2, justifyContent: 'flex-end', display: 'flex',
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={100}
                    height={50}
                  />
                </Container>
              </AppBar>
            </Grid>
            <Grid container spacing={2}>
              <Divider
                sx={{ marginBottom: '4em', marginTop: '4em' }}
              />
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
          </Grid>
        </Container>
      </BaseLayout>
    );
  }

  const currentType = (typeId) => {
    if (_.isArray(noteTypes)) {
      return noteTypes.find((item) => item.value === typeId).name;
    }

    return null;
  };

  return (
    <BaseLayout>
      <Container sx={{ paddingTop: '4.5em', paddingBottom: '2em', marginBottom: '2em' }}>
        <FormModal
          isOpen={modalOpen}
          note={formData}
          handleClose={() => closeForm()}
          editForm={editForm}
          handleSave={() => saveForm()}
        />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AppBar position="static" color="inherit">
              <Container
                maxWidth={false}
                sx={{
                  width: '100%', p: 2, justifyContent: 'flex-end', display: 'flex',
                }}
              >
                {
                  query.isGroup === 0 && (
                  <Button
                    variant="contained"
                    sx={{ alignItems: 'center', fontSize: 18, mr: 1 }}
                    // TODO: 改成真正上一頁
                    onClick={() => setQuery({ isGroup: 1, startAt: undefined, endAt: undefined })}
                  >
                    <ArrowBackIcon size="small" />
                    返回
                  </Button>
                  )
                }

                <Button
                  variant="contained"
                  sx={{ alignItems: 'center', fontSize: 18 }}
                  onClick={() => openForm({})}
                >
                  <AddIcon size="small" />
                  新增
                </Button>
              </Container>
            </AppBar>
          </Grid>
        </Grid>

        <Grid container spacing={5} sx={{ marginTop: '.5em' }}>
          {
            (query.isGroup || typeof query.isGroup === 'undefined' || query.isGroup === null)
              ? (
                Object.keys(noteList).map((group, index) => (
                  <Grid item key={group} xs={12}>
                    <Divider
                      sx={{ marginBottom: '4em' }}
                    >
                      {group}
                      年
                    </Divider>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'row wrap' }}>
                      {
                        Object.keys(noteList[group]).map((subGroup, ind) => (
                          <CardStack
                            key={subGroup}
                            col={6}
                            cards={noteList[group][subGroup].notes}
                            onClick={() => {
                              setQuery({
                                isGroup: 0,
                                startAt: noteList[group][subGroup].startAt,
                                endAt: noteList[group][subGroup].endAt,
                              });
                            }}
                            cardContent={(
                              <>
                                <CardContent>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    { noteList[group][subGroup].startAt }
                                    {' '}
                                    ~
                                    {' '}
                                    { noteList[group][subGroup].endAt }
                                  </Typography>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    共
                                    {' '}
                                    {noteList[group][subGroup].count}
                                    筆
                                  </Typography>
                                </CardContent>
                                <CardActions
                                  sx={{
                                    display: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                    點擊查看
                                  </Typography>
                                  <TouchAppIcon />
                                </CardActions>
                              </>
                            )}
                          />
                        ))
                      }
                    </div>
                  </Grid>

                ))
              )
              : Object.keys(noteList).map((group, index) => (
                <Grid item key={group} xs={12}>
                  <Divider
                    sx={{ marginBottom: '2em' }}
                  >
                    {group}
                    年
                  </Divider>
                  <Grid container spacing={2}>
                    {
                      noteList[group].map((data) => (
                        <Grid item xs={12} md={4} key={data.id}>
                          <Card sx={{ boxShadow: '5px 5px 5px #ABABAB', border: '1px solid #ABABAB', height: '100%' }}>
                            <CardContent>
                              <div
                                style={{ display: 'flex', justifyContent: 'flex-end' }}
                              >
                                <Chip label={currentType(data.type)} color="warning" />
                              </div>
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
                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{ alignItems: 'center', fontSize: 18 }}
                                onClick={() => openForm({ rowId: data.id })}
                              >
                                <EditIcon size="small" />
                                編輯
                              </Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))
                    }
                  </Grid>
                </Grid>

              ))
          }
        </Grid>
      </Container>
    </BaseLayout>
  );
}
