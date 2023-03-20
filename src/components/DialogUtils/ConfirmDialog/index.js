import React from 'react'
import {
  Button, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Box,
  TextField
} from '@mui/material'

function ConfirmDialog({title, content, open, handleCancel, handleConfirm, maxWidth}) {
  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={maxWidth || 'md'}
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
      keepMounted={false}
    >
      <DialogTitle>
        <h2 style={{
          fontSize: 'large'
        }}>{title}</h2>
      </DialogTitle>
      <DialogContent>
        <h5>{content}</h5>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Hủy</Button>
        <Button onClick={handleConfirm}>Xác nhận</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog