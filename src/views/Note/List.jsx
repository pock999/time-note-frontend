import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useQuery } from '../../hooks';

import Swal from 'sweetalert2';

import {
  Container,
  Button,
} from '@mui/material';

import { fetchNoteList } from '../../store/reducers/note';

import { BaseLayout } from '../../layouts';
import { DataTable } from '../../components';

export default function NoteList() {

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();

  const noteList = useSelector(state => state.note.list);
  const notePagination = useSelector(state => state.note.pagination);

  const [pageState, setPageState] = React.useState({
    pageMode: null,
    page: null,
    pageSize: null,
  });

  React.useEffect(() => {
    const pageMode = query.get('pageMode');
    const page = Number.parseInt(query.get('page'));
    const pageSize = Number.parseInt(query.get('pageSize'));

    setPageState(pre => ({
      ...pre,
      pageMode,
      page,
      pageSize,
    }));
    
    try {
      if(pageMode === 'list') {
        

        dispatch(fetchNoteList({
          searchStr: location.search.replace('?', ''),
        }));

      } else if(pageMode === 'calendar') {
        
      } else {
        // pageMode: list, page: 1, pageSize: 10
      }
    } catch(e) {
      Swal.fire(
        '錯誤',
        e.message,
        'error'
      );
    }
  }, [location.search]);

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

  const ActionsRender = (props) => {
    const {
      rowId,
      editPath = '',
      text,
    } = props;
    return (
      <Button variant="contained">{text}{rowId}</Button>
    )
  };

  return (
    <BaseLayout>
      <Container sx={{ paddingTop: '2em', paddingBottom: '2em', marginBottom: '2em',}}>
        Note List
        {
          noteList && notePagination
            &&
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
        }
        
      </Container>
    </BaseLayout>
  );
}
