import React from 'react';
import { useDispatch } from 'react-redux';

import Container from '@mui/material/Container';

import { fetchNoteList } from '../../store/reducers/note';


export default function NoteList() {

  const dispatch = useDispatch();

  // TODO: URL query
  const pageMode = 'list';

  React.useEffect(() => {
    // 取得Note List
    // dispatch(fetchNoteList({ pageMode }));
  }, []);

  return (
    <>
      <Container>Note List</Container>
    </>
  );
}
