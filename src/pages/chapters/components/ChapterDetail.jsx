import { EyeOutlined } from '@ant-design/icons';
import { Box, IconButton } from '@mui/material';
import React, { createContext, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import ChapterDrawer from './ChapterDrawer';

export const ChapterContext = createContext(null);

const ChapterDetail = (props) => {
    const dispatch = useDispatch();

    const { node } = props;
    const chapter = node.data;
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(chapter);
    const [readOnly, setReadOnly] = useState(true);
    const [mode, setMode] = useState('patch'); // or 'add' new chapter mode.

    const openDrawer = () => {
        dispatch({ type: 'menu/openDrawer', payload: { drawerOpen: false } });
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
        setReadOnly(true);
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const context = {
        mode,
        setMode,
        open,
        setOpen,
        readOnly,
        setReadOnly,
        formData,
        setFormData,

        closeDrawer,
        handleChange
    };

    return (
        <ChapterContext.Provider value={context}>
            <Box>
                <IconButton color="primary" aria-label="" onClick={openDrawer}>
                    <EyeOutlined />
                </IconButton>
                <ChapterDrawer />
            </Box>
        </ChapterContext.Provider>
    );
};

ChapterDetail.propTypes = {
    node: PropTypes.object
};

export default ChapterDetail;
