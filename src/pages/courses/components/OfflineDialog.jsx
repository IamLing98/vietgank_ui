/* eslint-disable react/prop-types */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const OfflineDialog = ({ open, handleClose, offlinedCourse }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>下线课程</DialogTitle>
            <DialogContent>
                <DialogContentText>请输入下线课程的原因</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={handleClose} color="primary">
                    取消操作
                </Button>
                <Button size="small" onClick={offlinedCourse} color="primary">
                    确认下架
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OfflineDialog;
