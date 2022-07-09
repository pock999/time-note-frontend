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

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import zhTW from 'dayjs/locale/zh-tw';
import { dateFormat } from '../utils/commons';

export default function FormModal(props) {
  const {
    isOpen,
    note,
    handleClose,
    editForm,
    handleSave,
  } = props;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{ !_.has(note, 'id') ? '新增' : '編輯' }</DialogTitle>
      <DialogContent>
        <TextField
          id="title"
          label="標題"
          type="text"
          fullWidth
          variant="outlined"
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
          variant="outlined"
          onChange={(evt) => editForm(evt.target.value, 'content')}
          margin="dense"
        />
        <FormControl variant="standard" fullWidth margin="dense">
          <InputLabel id="type-label">&emsp;類型</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={note.type}
            onChange={(evt) => editForm(evt.target.value, 'type')}
            label="類型"
            fullWidth
            variant="outlined"
            margin="dense"
          >
            <MenuItem value={1}>筆記</MenuItem>
            <MenuItem value={2}>行程(提醒)</MenuItem>
            <MenuItem value={3}>文章</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={zhTW}>
          <DateTimePicker
            label="開始時間"
            value={note.startAt}
            onChange={(val) => editForm(dateFormat(val), 'startAt')}
            inputFormat="YYYY-MM-DD HH:mm:ss"
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                fullWidth
              />
            )}
          />
          <DateTimePicker
            label="結束時間"
            value={note.endAt}
            onChange={(val) => editForm(dateFormat(val), 'endAt')}
            inputFormat="YYYY-MM-DD HH:mm:ss"
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                fullWidth
              />
            )}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSave}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
}
