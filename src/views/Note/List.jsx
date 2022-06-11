/* eslint-disable radix */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useLocation, useHistory, Link } from 'react-router-dom';

import dayjs from 'dayjs';

import Swal from 'sweetalert2';

import {
  Container,
  Button,
  Typography,
  Grid,
  ButtonGroup,
} from '@mui/material';

// 參考 https://fullcalendar.io/
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import twLocale from '@fullcalendar/core/locales/zh-tw';
import { DataTable, FormModal } from '../../components';
import { BaseLayout } from '../../layouts';
import {
  fetchNoteList, fetchNoteDetail, createNote, updateNote,
} from '../../store/reducers/note';
import { useQuery } from '../../hooks';

import '@fullcalendar/daygrid/main.css';

import { createSchema, updateSchema } from './formSchema';
import { dateFormat } from '../../utils/commons';

const noteTypes = [
  {
    value: 1,
    text: '筆記',
  },
  {
    value: 2,
    text: '行程(提醒)',
  },
  {
    value: 3,
    text: '文章',
  },
];

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
  const query = useQuery();

  const noteList = useSelector((state) => state.note.list);
  const notePagination = useSelector((state) => state.note.pagination);

  // url query
  const [pageState, setPageState] = React.useState({
    pageMode: null,
    page: null,
    pageSize: null,
    startAt: null,
    endAt: null,
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
        // 更新
        const validData = await updateSchema.validate(formData);
        resultAction = await dispatch(updateNote(validData));
        await unwrapResult(resultAction);
        if (pageState.pageMode === 'calendar') {
          const current = dayjs(formData.startAt);
          const startAt = current
            .month(current.month())
            .date(1)
            .hour(0)
            .minute(0)
            .second(0)
            .format('YYYY-MM-DD HH:mm:ss');

          const endAt = current
            .month(current.month() + 1)
            .date(1)
            .hour(0)
            .minute(0)
            .second(0)
            .subtract(1, 'second')
            .format('YYYY-MM-DD HH:mm:ss');

          history.push(`${location.pathname}?pageMode=calendar&startAt=${encodeURIComponent(startAt)}&endAt=${encodeURIComponent(endAt)}`);
        }
        closeForm();
      } else {
        // 新增
        const validData = await createSchema.validate(formData);
        resultAction = await dispatch(createNote(validData));
        await unwrapResult(resultAction);
        if (pageState.pageMode === 'calendar') {
          const current = dayjs(formData.startAt);
          const startAt = current
            .month(current.month())
            .date(1)
            .hour(0)
            .minute(0)
            .second(0)
            .format('YYYY-MM-DD HH:mm:ss');

          const endAt = current
            .month(current.month() + 1)
            .date(1)
            .hour(0)
            .minute(0)
            .second(0)
            .subtract(1, 'second')
            .format('YYYY-MM-DD HH:mm:ss');

          history.push(`${location.pathname}?pageMode=calendar&startAt=${encodeURIComponent(startAt)}&endAt=${encodeURIComponent(endAt)}`);

          dispatch(fetchNoteList({
            searchStr: `pageMode=calendar&startAt=${encodeURIComponent(startAt)}&endAt=${encodeURIComponent(endAt)}`,
          }));
        } else {
          dispatch(fetchNoteList({
            searchStr: location.search.replace('?', ''),
          }));
        }

        closeForm();
      }
      Swal.fire({
        icon: 'success',
        title: `${formData.id ? '更新' : '新增'}成功`,
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
      });
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: e.message,
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
      });
    }
  };

  // for Datatable use
  const handleChangePage = (evt, newPage) => {
    history.push(`${location.pathname}${location.search.replace(/page=[0-9]*/, `page=${newPage + 1}`)}`);
  };

  const handleChangePageSize = (evt) => {
    const fullPath = `${location.pathname}${location.search.replace(/pageSize=[0-9]*/, `pageSize=${evt.target.value}`)}`;
    if (evt.target.value > pageState.pageSize) {
      history.push(fullPath.replace(/page=[0-9]*/, 'page=1'));
    } else {
      history.push(fullPath);
    }
  };

  const columns = [
    { id: 'id', label: 'ID', align: 'center' },
    { id: 'type', label: '類型', align: 'center' },
    { id: 'title', label: '標題', align: 'center' },
    { id: 'content', label: '內容', align: 'center' },
    { id: 'startAt', label: '開始時間', align: 'center' },
    { id: 'endAt', label: '結束時間', align: 'center' },
    { id: 'actions', label: '操作', align: 'center' },
  ];

  // eslint-disable-next-line react/no-unstable-nested-components
  function ActionsRender(props) {
    const {
      rowId,
      text,
    } = props;
    return (
      <Button variant="contained" onClick={() => openForm({ rowId })}>
        {text}
      </Button>
    );
  }

  // for calendar

  // calendar ref
  const calendarRef = React.useRef();

  // 顯示在行事曆上的資訊
  const renderEventContent = (eventInfo) =>
    // console.log('eventInfo => ', eventInfo);
    (
      <>
        <b>{eventInfo.event.title}</b>
        {/* <i>{eventInfo.timeText}</i> */}
      </>
    );

  // 日曆換頁(月)
  const calendarPageChange = (event) => {
    const calendarCurrStart = dateFormat(event.view.currentStart);
    const calendarCurrEnd = dateFormat(dayjs(event.view.currentEnd).subtract(1, 'second'));
    const startAt = dateFormat(pageState.startAt);
    const endAt = dateFormat(pageState.endAt);

    // url query日期區間不等於日曆的區間則將url query的日期區間調整成與日曆一樣
    if (startAt !== calendarCurrStart || endAt !== calendarCurrEnd) {
      history.push(`${location.pathname}?pageMode=calendar&startAt=${encodeURIComponent(calendarCurrStart)}&endAt=${encodeURIComponent(calendarCurrEnd)}`);
    }
  };

  // useEffect
  React.useEffect(() => {
    const pageMode = query.get('pageMode');
    const page = Number.parseInt(query.get('page'));
    const pageSize = Number.parseInt(query.get('pageSize'));
    const startAt = query.get('startAt');
    const endAt = query.get('endAt');

    setPageState((pre) => ({
      ...pre,
      pageMode,
      page,
      pageSize,
      startAt,
      endAt,
    }));

    try {
      if (pageMode === 'list') {
        if (!page || !pageSize) {
          history.push(`${location.pathname}?pageMode=list&page=1&pageSize=10`);
        } else {
          dispatch(fetchNoteList({
            searchStr: location.search.replace('?', ''),
          }));
        }
      } else if (pageMode === 'calendar') {
        if (!startAt || !endAt) {
          const now = dayjs();
          const startAt = now
            .month(now.month())
            .date(1)
            .hour(0)
            .minute(0)
            .second(0)
            .format('YYYY-MM-DD HH:mm:ss');

          const endAt = now
            .month(now.month() + 1)
            .date(1)
            .hour(0)
            .minute(0)
            .second(0)
            .subtract(1, 'second')
            .format('YYYY-MM-DD HH:mm:ss');

          history.push(`${location.pathname}?pageMode=calendar&startAt=${encodeURIComponent(startAt)}&endAt=${encodeURIComponent(endAt)}`);
        } else {
          dispatch(fetchNoteList({
            searchStr: location.search.replace('?', ''),
          }));
        }
      } else {
        // pageMode: list, page: 1, pageSize: 10
        history.push(`${location.pathname}?pageMode=list&page=1&pageSize=10`);
      }
    } catch (e) {
      Swal.fire(
        '錯誤',
        e.message,
        'error',
      );
    }
  }, [location.search]);

  return (
    <BaseLayout>
      <Container sx={{ paddingTop: '2em', paddingBottom: '2em', marginBottom: '2em' }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" sx={{ marginBottom: '1em' }}>行事曆</Typography>
          <ButtonGroup variant="text" color="secondary">
            <Button
              variant={pageState.pageMode !== 'list' && 'contained'}
              component={Link}
              to="/notes?pageMode=list"
              disabled={pageState.pageMode === 'list'}
            >
              列表模式
            </Button>
            <Button
              variant={pageState.pageMode !== 'calendar' && 'contained'}
              component={Link}
              to="/notes?pageMode=calendar"
              disabled={pageState.pageMode === 'calendar'}
            >
              日曆模式
            </Button>
          </ButtonGroup>
          <Button
            variant="contained"
            color="thirdColor"
            onClick={() => openForm({ dateTime: null, rowId: null })}
          >
            新增
          </Button>
          <FormModal
            isOpen={modalOpen}
            note={formData}
            handleClose={() => closeForm()}
            editForm={editForm}
            handleSave={saveForm}
          />
        </Grid>
        {
          _.isArray(noteList)
            && (pageState.pageMode === 'calendar'
              ? (
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth',
                  }}
                  ref={calendarRef}
                  initialDate={pageState.startAt}
                  eventContent={renderEventContent}
                  locale={twLocale}
                  datesSet={(event) => calendarPageChange(event)}
                  events={noteList.map((note) => ({
                    ..._.omit(note, ['startAt', 'endAt', 'type']),
                    start: note.startAt,
                    end: note.endAt,
                    type: noteTypes.find((type) => note.type === type.value).text,
                  }))}
                  // 更新, 刪除
                  eventClick={(eventInfo) => openForm({ rowId: eventInfo.event.id })}
                  // 新增
                  dateClick={(arg) => openForm({ dateTime: arg.date, rowId: null })}
                />
              )
              : notePagination
              && (
              <DataTable
                columns={columns}
                rows={noteList.map((note) => ({
                  ..._.omit(note, ['type']),
                  type: noteTypes.find((type) => note.type === type.value).text,
                }))}
                page={pageState.page - 1}
                totalCount={notePagination.totalCount}
                pageSize={pageState.pageSize}
                handleChangePage={handleChangePage}
                handleChangePageSize={handleChangePageSize}
                actionsRender={ActionsRender}
              />
              ))
        }
      </Container>
    </BaseLayout>
  );
}
