import React from 'react';
import _ from 'lodash';

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';

export default function FormModal(props) {
  const {
    isOpen,
    note = null,
    handleClose,
    editForm,
  } = props;

  console.log('note => ', note);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{ !_.has(note, 'id') ? '新增' : `編輯${note.id}` }</DialogTitle>
      <DialogContent>
        <TextField
          id="title"
          label="標題"
          type="text"
          fullWidth
          variant="standard"
          value={note.title}
          onChange={(evt) => editForm(evt.target.value, 'title')}
        />
      </DialogContent>
      <DialogActions>
        <Button>保存</Button>
      </DialogActions>
    </Dialog>
  );
}
