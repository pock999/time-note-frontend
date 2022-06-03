import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import dayjs from 'dayjs';

import Swal from 'sweetalert2';

import {
  Container,
  Button,
  Typography,
  Grid,
} from '@mui/material';

// 參考 https://fullcalendar.io/
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import twLocale from '@fullcalendar/core/locales/zh-tw';
import { DataTable } from '../../components';
import { BaseLayout } from '../../layouts';
import { fetchNoteList } from '../../store/reducers/note';
import { useQuery } from '../../hooks';

import '@fullcalendar/daygrid/main.css';

export default function NoteList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();

  const noteList = useSelector((state) => state.note.list);
  const notePagination = useSelector((state) => state.note.pagination);

  const [pageState, setPageState] = React.useState({
    pageMode: null,
    page: null,
    pageSize: null,
    startAt: null,
    endAt: null,
  });

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

  function ActionsRender(props) {
    const {
      rowId,
      editPath = '',
      text,
    } = props;
    return (
      <Button variant="contained">
        {text}
        {rowId}
      </Button>
    );
  }

  // for calendar

  // 顯示在行事曆上的資訊
  const renderEventContent = (eventInfo) =>
    // console.log('eventInfo => ', eventInfo);
    (
      <>
        <b>{eventInfo.event.title}</b>
        {/* <i>{eventInfo.timeText}</i> */}
      </>
    )
  ;

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
          <Button
            variant="contained"
            color="thirdColor"
          >
            新增
          </Button>
        </Grid>
        {
          noteList
            && pageState.pageMode === 'calendar'
            ? (
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth',
                }}
                eventContent={renderEventContent}
                locale={twLocale}
                events={noteList.map((note) => ({
                  ..._.omit(note, ['startAt', 'endAt']),
                  start: note.startAt,
                  end: note.endAt,
                }))}
                  // 更新, 刪除
                eventClick={(event) => console.log('event => ', event)}
                  // 新增
                dateClick={(arg) => console.log('dateClick arg => ', arg)}
              />
            )
            : notePagination
              && (
              <DataTable
                columns={columns}
                rows={noteList}
                page={pageState.page - 1}
                totalCount={notePagination.totalCount}
                pageSize={pageState.pageSize}
                handleChangePage={handleChangePage}
                handleChangePageSize={handleChangePageSize}
                actionsRender={ActionsRender}
              />
              )
        }
      </Container>
    </BaseLayout>
  );
}
