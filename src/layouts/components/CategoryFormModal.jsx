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
import { ColorPicker } from 'mui-color';

export default function CategoryFormModal(props) {
  const {
    isOpen,
    category,
    handleClose,
    editForm,
    handleSave,
  } = props;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{ !_.has(category, 'value') ? '新增' : '編輯' }</DialogTitle>
      <DialogContent>
        <TextField
          id="title"
          label="標籤名稱"
          type="text"
          fullWidth
          variant="outlined"
          value={category.name}
          onChange={(evt) => editForm(evt.target.value, 'name')}
          margin="dense"
        />
        <ColorPicker
          value={category.color}
          onChange={(color) => editForm(`#${color.hex}`, 'color')}
          disableAlpha
        />
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
