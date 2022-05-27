import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useQuery } from '../../hooks';

import Swal from 'sweetalert2';

import {
  Container,
} from '@mui/material';

import { fetchNoteList } from '../../store/reducers/note';

import { BaseLayout } from '../../layouts';
import { DataTable } from '../../components';

export default function NoteList() {

  const dispatch = useDispatch();
  const location = useLocation();
  const query = useQuery();

  const noteList = useSelector(state => state.note.list);
  const notePagination = useSelector(state => state.note.pagination);

  const pageMode = query.get('pageMode');
  const page = Number.parseInt(query.get('page'));
  const pageSize = Number.parseInt(query.get('pageSize'));

  React.useEffect(() => {
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
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
  ];

  return (
    <BaseLayout>
      <Container>
        Note List
        {
          noteList && notePagination
            &&
          <DataTable
            columns={columns}
            rows={noteList}
            page={page - 1}
            totalCount={notePagination.totalCount}
            pageSize={pageSize}
            handleChangePage={(evt) => { console.log('handleChangePage evt => ', evt); }}
            handleChangePageSize={(evt) => { console.log('handleChangePageSize evt => ', evt); }}
          />
        }
        
      </Container>
    </BaseLayout>
  );
}
