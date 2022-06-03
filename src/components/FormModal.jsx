import React from 'react';
import _ from 'lodash';

import {
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
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
          margin="dense"
        />
        <TextField
          id="content"
          label="內容"
          multiline
          rows={4}
          fullWidth
          value={note.content}
          variant="standard"
          onChange={(evt) => editForm(evt.target.value, 'content')}
          margin="dense"
        />
        <FormControl variant="standard" fullWidth>
          <InputLabel id="type-label">類型</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={note.type}
            onChange={(evt) => editForm(evt.target.value, 'type')}
            label="類型"
            fullWidth
            variant="standard"
            margin="dense"
          >
            <MenuItem value={1}>筆記</MenuItem>
            <MenuItem value={2}>行程(提醒)</MenuItem>
            <MenuItem value={3}>文章</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button>保存</Button>
      </DialogActions>
    </Dialog>
  );
}
