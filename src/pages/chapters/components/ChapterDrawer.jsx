import { EditOutlined } from '@ant-design/icons';
import { Box, Button, Drawer, Grid, IconButton, InputLabel, OutlinedInput, Tooltip, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import SimpleBarScroll from '../../../components/third-party/SimpleBar';
import AttachementSwitch from './AttachementSwitch';
import CourseSelect from './CourseSelect';
import { red } from '@mui/material/colors';

import '@react-page/editor/lib/index.css';
import './react-page-edit.css';
import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';
import image from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';
import html5video from '@react-page/plugins-html5-video';
import '@react-page/plugins-html5-video/lib/index.css';
import spacer from '@react-page/plugins-spacer';
import divider from '@react-page/plugins-divider';

import cellLayoutPluginWIthVideo from 'components/react-page-editor/cellLayoutPluginWIthVideo';

import { ChapterContext } from './ChapterDetail';
import { debugLog } from 'utils/tools';
import ReactPageEditor from '@react-page/editor';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const ChapterDrawer = () => {
    const [patching, setPatching] = useState(false);
    const context = useContext(ChapterContext);

    const { mode, closeDrawer, readOnly, handleChange, formData, setFormData, open, setReadOnly } = context;

    const cellPlugins = [slate(), image, html5video, divider, spacer, cellLayoutPluginWIthVideo];

    const shiftToEditMode = () => {
        setReadOnly(false);
    };
    const setContent = (data) => {
        setFormData({
            ...formData,
            content: data
        });
    };

    const queryClient = useQueryClient();

    const useTypeMutation = (type) =>
        useMutation({
            mutationFn: (data) => {
                const { id } = data;
                const request =
                    mode === 'add'
                        ? axios.post(`${process.env.REACT_APP_API_SERVER}/${type}`, data)
                        : mode === 'patch'
                        ? axios.patch(`${process.env.REACT_APP_API_SERVER}/${type}/${id}`, data)
                        : null;
                return request;
            },
            onMutate: () => {
                setPatching(true);
            },
            onSuccess: () => {
                setPatching(false);
                queryClient.invalidateQueries({ queryKey: ['fetch-chapters'] });
                setReadOnly(true);
                closeDrawer();
            }
        });

    const mutation = useTypeMutation('chapters');

    const attchmentSwitchChange = () => {};

    return (
        <Drawer style={{ zIndex: 1210 }} variant="temporary" anchor="right" open={open} onClose={closeDrawer}>
            <Box style={{ minWidth: 'calc(80vw - 96px)', maxWidth: 'calc(90vw - 48px)' }}>
                <SimpleBarScroll style={{ overflowX: 'hidden', maxHeight: 880 }} className="my-simple-bar">
                    <Grid container spacing={{ x: 3 }} justifyContent="center" direction="row">
                        <Grid item xs={12} p={2}>
                            <Grid container alignItems="center" display="flex" justifyContent="space-around">
                                <Grid item xs={10}>
                                    {readOnly ? (
                                        <Typography variant="body2" color="secondary">
                                            你现在正在查看课程章节信息，此模式下内容仅用于查看，不可以编辑
                                        </Typography>
                                    ) : mode === 'add' ? (
                                        <Typography variant="body2" color={blue[600]}>
                                            你现在正在添加新的课程章节
                                        </Typography>
                                    ) : (
                                        <Typography variant="body2" color={red[600]}>
                                            你现在正在编辑课程章节
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={2} display="flex" justifyContent="flex-end">
                                    <Tooltip title="切换至编辑模式">
                                        <IconButton onClick={shiftToEditMode}>
                                            <EditOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container direction="column" spacing={{ xs: 3 }} gap={1}>
                                <Grid item>
                                    <InputLabel>课程章节</InputLabel>
                                    <OutlinedInput
                                        name="name"
                                        onChange={handleChange}
                                        readOnly={readOnly}
                                        sx={{ marginTop: '10px' }}
                                        fullWidth
                                        value={formData.name}
                                    />
                                </Grid>
                                <Grid item>
                                    <CourseSelect value={formData.courseId} handleChange={handleChange} readOnly={readOnly} />
                                </Grid>
                                <Grid item>
                                    <AttachementSwitch />
                                </Grid>
                                <Grid item>
                                    <ReactPageEditor
                                        style={{
                                            zIndex: 3000
                                        }}
                                        readOnly={readOnly}
                                        lang="zh"
                                        languages={[{ lang: 'zh', label: '中文' }]}
                                        cellPlugins={cellPlugins}
                                        value={formData.content}
                                        onChange={setContent}
                                    />
                                </Grid>
                                {!readOnly && (
                                    <Grid item display="flex" justifyContent="flex-end" gap={3}>
                                        <Button variant="outlined" onClick={closeDrawer}>
                                            取消
                                        </Button>
                                        <Button variant="contained" disabled={patching} onClick={() => mutation.mutate(formData)}>
                                            保存
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </SimpleBarScroll>
            </Box>
        </Drawer>
    );
};

export default ChapterDrawer;
