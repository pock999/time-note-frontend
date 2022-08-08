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

// atomize
import {
  Container, Row, Col, Div, Text, Button, Icon, Dropdown, Anchor,
} from 'atomize';

// use query params
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

// custom hooks
import { useQuery, useWindowSize } from '../../hooks';

// custom components
import {
  Empty, ToolBar, Card, FormModal,
} from '../../components';

// custom layout
import { BaseLayout } from '../../layouts';

// custom utils
import { delayFunction, dateFormat } from '../../utils/commons';
import SwalHelper from '../../utils/SwalHelper';

// store
import {
  fetchNoteList, fetchNoteDetail, createNote, updateNote, fetchNoteTypes, deleteNote,
} from '../../store/reducers/note';
import {
  fetchCategories,
} from '../../store/reducers/category';
import { showLoading, hideLoading } from '../../store/reducers/loading';

// yup schema
import { createSchema, updateSchema } from './formSchema';

const emptyNote = {
  title: '',
  content: '',
  CategoryId: null,
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
        resultAction = await dispatch(createNote({
          ...formData,
          search: location.search,
        }));
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
        await dispatch(fetchCategories());

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

  // empty
  if (_.has(notePagination, 'totalCount') && notePagination.totalCount === 0) {
    return (
      <BaseLayout>
        <Container
          p={{
            t: '1.5em',
            b: '2em',
          }}
          m={{
            b: '2em',
          }}
          d="flex"
        >
          <Container>
            <FormModal
              isOpen={modalOpen}
              note={formData}
              handleClose={() => closeForm()}
              editForm={editForm}
              handleSave={() => saveForm()}
            />

            <Div>
              <ToolBar>
                <Container
                  w="100%"
                  p="2"
                  d="flex"
                  justify="flex-end"
                >
                  {
                query.isGroup === 0 && (
                <Button
                  align="center"
                  m={{ r: 1 }}
                  // TODO: 改成真正上一頁
                  onClick={() => setQuery({ isGroup: 1, startAt: undefined, endAt: undefined })}
                >
                  返回
                </Button>
                )
              }
                  <Button
                    align="center"
                    onClick={() => openForm({})}
                  >
                    新增
                  </Button>
                </Container>
              </ToolBar>
            </Div>

            <Row p="5" m={{ t: '.5em' }}>
              <Col size="12">
                <Row>
                  <Col
                    minH="60vh"
                    d="flex"
                    justify="center"
                  >
                    <Card sx={{
                      boxShadow: '5px 5px 5px #ABABAB', border: '1px solid #ABABAB', height: '100%', flex: 1,
                    }}
                    >
                      {/* <CardContent sx={{ width: '100%', height: '100%' }}>
                        <Empty title="空的，請點擊上方新增鈕建立新資料" />
                      </CardContent> */}
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </BaseLayout>
    );
  }

  // null => not loading finish
  // 沒有資料 || 分組狀態但資料不為分組資料形式 || 不為分組狀態但資料為分組資料形式
  if (!noteList || ((query.isGroup || typeof query.isGroup === 'undefined' || query.isGroup === null) && !_.isObject(noteList)) || (query.isGroup === 0 && !_.isArray(noteList[Object.keys(noteList)[0]]))) {
    return (
      <BaseLayout>
        <Container
          p={{
            t: '1.5em',
            b: '2em',
          }}
          m={{
            b: '2em',
          }}
          d="flex"
        >
          <Div>
            <ToolBar>
              <Container
                w="100%"
                p="2"
                d="flex"
                justify="flex-end"
              >
                {
                query.isGroup === 0 && (
                <Button
                  align="center"
                  m={{ r: 1 }}
                  // TODO: 改成真正上一頁
                  onClick={() => setQuery({ isGroup: 1, startAt: undefined, endAt: undefined })}
                >
                  返回
                </Button>
                )
              }
                <Button
                  align="center"
                  onClick={() => openForm({})}
                >
                  新增
                </Button>
              </Container>
            </ToolBar>
          </Div>

          <Row>
            <Col size="12">
              <Row>
                <Col size={{ xs: 12, md: 4 }}>
                  <Card sx={{ boxShadow: '5px 5px 5px #ABABAB', border: '1px solid #ABABAB' }}>
                    {/* <CardContent>
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
                    </CardActions> */}
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
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
      <Container
        p={{
          t: '1.5em',
          b: '2em',
        }}
        m={{
          b: '2em',
        }}
      >
        <FormModal
          isOpen={modalOpen}
          note={formData}
          handleClose={() => closeForm()}
          editForm={editForm}
          handleSave={() => saveForm()}
        />

        <Div>
          <ToolBar>
            <Container
              w="100%"
              p="2"
              d="flex"
              justify="flex-end"
            >
              {
                query.isGroup === 0 && (
                <Button
                  align="center"
                  m={{ r: 1 }}
                  // TODO: 改成真正上一頁
                  onClick={() => setQuery({ isGroup: 1, startAt: undefined, endAt: undefined })}
                >
                  返回
                </Button>
                )
              }
              <Button
                align="center"
                onClick={() => openForm({})}
              >
                新增
              </Button>
            </Container>
          </ToolBar>
        </Div>

        <Row p="5" m={{ t: '.5em' }}>
          {
            (query.isGroup || typeof query.isGroup === 'undefined' || query.isGroup === null)
              ? (
                Object.keys(noteList).map((group, index) => (
                  <Col item key={group} xs={12}>
                    -
                    {group}
                    年
                    -
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'row wrap' }}>
                      {
                        Object.keys(noteList[group]).map((subGroup, ind) => (
                          <Card
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
                            // cardContent={(
                            //   <>
                            //     <CardContent>
                            //       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            //         { noteList[group][subGroup].startAt }
                            //         {' '}
                            //         ~
                            //         {' '}
                            //         { noteList[group][subGroup].endAt }
                            //       </Typography>
                            //       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            //         共
                            //         {' '}
                            //         {noteList[group][subGroup].count}
                            //         筆
                            //       </Typography>
                            //     </CardContent>
                            //     <CardActions
                            //       sx={{
                            //         display: 'center',
                            //         justifyContent: 'center',
                            //       }}
                            //     >
                            //       <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            //         點擊查看
                            //       </Typography>
                            //       <TouchAppIcon />
                            //     </CardActions>
                            //   </>
                            // )}
                          />
                        ))
                      }
                    </div>
                  </Col>

                ))
              )
              : Object.keys(noteList).map((group, index) => (
                <Col key={group} size="12">
                  -
                  {group}
                  年
                  -
                  <Row>
                    {
                      noteList[group].map((data) => (
                        <Col size={{ xs: 12, md: 4 }} key={data.id}>
                          <Card sx={{ boxShadow: '5px 5px 5px #ABABAB', border: '1px solid #ABABAB', height: '100%' }}>
                            {/* <CardContent>
                              <div
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                              >
                                <span
                                  style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    backgroundColor: _.get(data, 'Category.color') || 'white',
                                  }}
                                />
                                <Chip label={currentType(data.type)} />
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
                                onClick={async () => {
                                  const result = await SwalHelper.awiatQuestion('確定要刪除?', data.title);

                                  if (result.isConfirmed) {
                                    dispatch(deleteNote({ id: data.id }));
                                  }
                                }}
                              >
                                <DeleteIcon size="small" />
                                刪除
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                sx={{ alignItems: 'center', fontSize: 18 }}
                                onClick={() => openForm({ rowId: data.id })}
                              >
                                <EditIcon size="small" />
                                編輯
                              </Button>
                            </CardActions> */}
                          </Card>
                        </Col>
                      ))
                    }
                  </Row>
                </Col>

              ))
          }
        </Row>

      </Container>
    </BaseLayout>
  );
}
