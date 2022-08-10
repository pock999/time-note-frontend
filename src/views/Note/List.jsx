/* eslint-disable max-len */
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

// react-loading
import ReactLoading from 'react-loading';

// use query params
import {
  useQueryParams, NumberParam, StringParam, useQueryParam,
} from 'use-query-params';

// react-intersection-observer (for scroll api)
import { useInView } from 'react-intersection-observer';

// custom hooks
import { async } from 'regenerator-runtime';
import { useQuery, useWindowSize } from '../../hooks';

// custom components
import {
  Empty, ToolBar, Card, FormModal,
} from '../../components';

// custom layout
import { BaseLayout } from '../../layouts';

// custom utils
import { delayFunction, dateFormat, sleep } from '../../utils/commons';
import SwalHelper from '../../utils/SwalHelper';

// store
import {
  fetchNoteList, fetchNoteDetail, createNote, updateNote, fetchNoteTypes, deleteNote, setPagination,
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
  timePoint: null,
};

export default function NoteList() {
  // /notes/:type
  const { type } = useParams();
  const [categoryId, setCategoryId] = useQueryParam('CategoryId', NumberParam);

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
          timePoint: dateTime,
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
        resultAction = await dispatch(updateNote({
          ...formData,
          // 傳送當前頁面的type, categoryId
          currentType: type || null,
          currentCategoryId: categoryId || null,
        }));
      } else {
        resultAction = await dispatch(createNote({
          ...formData,
          search: location.search,
          // 傳送當前頁面的type, categoryId
          currentType: type || null,
          currentCategoryId: categoryId || null,
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
  // api
  //

  // types, categories
  React.useEffect(() => {
    (async () => {
      await dispatch(fetchNoteTypes());
      await dispatch(fetchCategories());
    })();
  }, []);

  // 檢測是否到底
  const [isLast, setIsLast] = React.useState(false);

  // note list
  const loadData = async () => {
    try {
      const typeQuery = (typeof type !== 'undefined' && type !== null) ? `type=${type}` : '';

      const resultAction = await dispatch(fetchNoteList({
        searchAry: [...location.search.includes('?') ? [location.search.split('?')[1]] : [], typeQuery],
      }));

      const result = unwrapResult(resultAction);
      // console.log('result => ', result);

      // 表示到底了
      if (!result.data || _.isEmpty(result.data)) {
        setIsLast(true);
      }
    } catch (e) {
      SwalHelper.error('錯誤', e.message);
    }
  };

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  // 偵測 url query string
  React.useEffect(() => {
    (async () => {
      setIsLast(false);
      await dispatch(setPagination({
        page: 1,
      }));
      await loadData();
      await dispatch(setPagination({
        page: 2,
      }));
    })();
  }, [location.search, location.pathname]);

  // 偵測 有無滑到底
  React.useEffect(() => {
    if (inView) {
      (async () => {
        if (notePagination.page !== 1) {
          await sleep(350);
          await loadData();
          await dispatch(setPagination({
            page: notePagination.page + 1,
          }));
        }
      })();
    }
  }, [inView]);

  // 取得當前種類名稱
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
        d="flex"
        flexDir="column"
      >
        <Div
          d="flex"
          flexDir="row"
          m={{ b: '2em', r: '.75em', l: '.75em' }}
          p={{
            b: '.75em', t: '.75em', r: '.5em', l: '.5em',
          }}
          bg="gray200"
          rounded="sm"
          shadow="2"
          justify="flex-end"
          align="center"
        >
          <Button
            bg="warning700"
            hoverBg="warning800"
            rounded="circle"
            p={{ r: '1.5rem', l: '1.5rem' }}
            shadow="3"
            hoverShadow="4"
            onClick={() => openForm({})}
          >
            新增
          </Button>
        </Div>
        <FormModal
          isOpen={modalOpen}
          note={formData}
          handleClose={() => closeForm()}
          editForm={editForm}
          handleSave={() => saveForm()}
        />
        <Row
          d="flex"
          flexDir="row"
          m={{ b: '2em' }}
        >
          {
            noteList && _.isArray(noteList)
            && noteList.map((data) => (
              <Col
                size={{ xs: '12', md: '6' }}
              >
                <Card
                  key={data.id}
                  bg="gray100"
                  hoverBg="gray300"
                  rounded="md"
                  shadow="3"
                  hoverShadow="4"
                  w="100%"
                  p={{
                    r: '1em',
                    l: '1em',
                    t: '.5em',
                  }}
                  m={{
                    t: '.5em',
                    b: '.5em',
                  }}
                  minH="200px"
                >
                  <Div
                    d="flex"
                    flexDir="row"
                    justify="space-between"
                    align="center"
                    m={{ b: '.5em' }}
                  >
                    <Div
                      d="flex"
                      flexDir="row"
                      justify="flex-start"
                      align="center"
                    >
                      <Text
                        m={{ r: '.5em' }}
                        textSize="paragraph"
                        textWeight="800"
                      >
                        { currentType(data.type) }
                      </Text>
                      <div
                        style={{
                          backgroundColor: _.get(data, 'Category.color'),
                          width: 15,
                          height: 15,
                          borderRadius: '50%',
                          ...!_.get(data, 'Category.color') && {
                            border: '1px dashed black',
                          },
                        }}
                      />
                    </Div>
                    <Text
                      textColor="gray800"
                      textSize="caption"
                    >
                      { data.timePoint }
                    </Text>
                  </Div>
                  <hr />
                  <Div>
                    <Text textSize="heading">
                      { data.title }
                    </Text>
                  </Div>
                  <Div>
                    { data.content }
                  </Div>
                  <Div
                    d="flex"
                    flexDir="row"
                    justify="flex-end"
                    m={{ t: '2em' }}
                  >
                    <Button
                      bg="danger700"
                      hoverBg="danger600"
                      rounded="circle"
                      m={{ r: '1rem' }}
                      p={{ r: '1.5rem', l: '1.5rem' }}
                      shadow="2"
                      hoverShadow="4"
                      onClick={async () => {
                        const result = await SwalHelper.awiatQuestion('確定要刪除?', data.title);

                        if (result.isConfirmed) {
                          dispatch(deleteNote({ id: data.id }));
                        }
                      }}
                    >
                      <Icon name="DeleteSolid" size="20px" color="white" />
                      刪除
                    </Button>
                    <Button
                      bg="info700"
                      hoverBg="info600"
                      rounded="circle"
                      m={{ r: '1rem' }}
                      p={{ r: '1.5rem', l: '1.5rem' }}
                      shadow="2"
                      hoverShadow="4"
                      onClick={() => openForm({ rowId: data.id })}
                    >
                      <Icon name="EditSolid" size="20px" color="white" />
                      編輯
                    </Button>
                  </Div>
                </Card>
              </Col>
            ))
          }
        </Row>
        {/* loading */}
        {
          // 到底就把偵測的組件藏起來
          !isLast ? (
            <div ref={ref}>
              <Div
                bg="success600"
                w="100%"
                d="flex"
                flexDir="column"
                justify="center"
                align="center"
                p="5em"
                rounded="md"
              >
                <ReactLoading type="cubes" color="#fff" width="200px" height="200px" delay={2} />
                <Text textColor="white" textSize="heading">- 載入更多，沒有就到底了 -</Text>
              </Div>
            </div>
          ) : (
            <Div
              bg="success600"
              w="100%"
              d="flex"
              flexDir="column"
              justify="center"
              align="center"
              p="5em"
              rounded="md"
            >
              <ReactLoading type="cubes" color="#fff" width="200px" height="200px" delay={2} />
              <Text textColor="white" textSize="heading">- 到底了 -</Text>
            </Div>
          )
        }

      </Container>
    </BaseLayout>
  );
}
