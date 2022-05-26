import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { useQuery } from '../../hooks';

import Swal from 'sweetalert2';

import Container from '@mui/material/Container';

import { fetchNoteList } from '../../store/reducers/note';


export default function NoteList() {

  const dispatch = useDispatch();

  // TODO: URL query
  const query = useQuery();

  React.useEffect(() => {
    const pageMode = query.get('pageMode');

    try {
      if(pageMode === 'list') {
        
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
    

    // 取得Note List
    // dispatch(fetchNoteList({ pageMode }));
  }, []);

  return (
    <>
      <Container>Note List</Container>
    </>
  );
}
