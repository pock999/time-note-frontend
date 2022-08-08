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
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

// react-intersection-observer (for scroll api)
import { useInView } from 'react-intersection-observer';

// custom hooks
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
  // api
  //

  // types, categories
  React.useEffect(() => {
    (async () => {
      await dispatch(fetchNoteTypes());
      await dispatch(fetchCategories());
    })();
  }, []);

  // note list
  const loadData = async () => {
    try {
      const typeQuery = (typeof type !== 'undefined' && type !== null) ? `type=${type}` : '';

      const resultAction = await dispatch(fetchNoteList({
        searchAry: [...location.search.includes('?') ? [location.search.split('?')[1]] : [], typeQuery],
      }));

      const result = unwrapResult(resultAction);
    } catch (e) {
      SwalHelper.error('錯誤', e.message);
    }
  };

  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  // 偵測 有無滑到底
  React.useEffect(() => {
    // TODO: 避免到底一直敲
    if (inView) {
      (async () => {
        await sleep(350);
        await loadData();
        dispatch(setPagination({
          page: notePagination.page + 1,
        }));
      })();
    }
  }, [inView]);

  // 偵測 url query string
  React.useEffect(() => {
    dispatch(setPagination({
      page: 1,
    }));
  }, [location.search, location.pathname]);

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
                  bg="gray200"
                  hoverBg="gray300"
                  rounded="md"
                  shadow="3"
                  hoverShadow="4"
                  w="100%"
                  p={{
                    r: '1em',
                    l: '1em',
                  }}
                  m={{
                    t: '.5em',
                    b: '.5em',
                  }}
                  minH="150px"
                >
                  <Div>
                    { data.startAt }
                    {' '}
                    ~
                    {' '}
                    { data.endAt }
                  </Div>
                  <Div>
                    { data.color }
                    { data.title }
                  </Div>
                  <Div>
                    { data.content }
                  </Div>
                  <Div>
                    {/* action */}
                  </Div>
                </Card>
              </Col>
            ))
          }
        </Row>
        {/* loading */}
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
            <ReactLoading type="spinningBubbles" color="#fff" width="200px" height="200px" delay={2} />
            <Text textColor="white" textSize="heading">- 載入更多，沒有就到底了 -</Text>
          </Div>
        </div>
      </Container>
    </BaseLayout>
  );
}
