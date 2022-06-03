import React from 'react';

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function FormModal(props) {
  const {
    isOpen,
    handleClose,
    note = null,
  } = props;

  console.log('note => ', note);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{ note === null ? '新增' : `編輯${note}` }</DialogTitle>
    </Dialog>
  );
}
