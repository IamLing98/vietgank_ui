/* eslint-disable react/prop-types */
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
    Switch,
    IconButton,
    Tooltip
} from '@mui/material';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import Slide from '@mui/material/Slide';
import SimpleBarScroll from '../../../components/third-party/SimpleBar';
import { useCategory } from '../../../hooks';
import { useDropzone } from 'react-dropzone';

import { red, blue } from '@mui/material/colors';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CourseFormDialog = ({ node, mode, open, handleClose }) => {
    const now = new Date().toLocaleString();
    const initialData = {
        totall_view: 0,
        totall_study: 0,
        totall_classes: 0,
        categoryId: 1,
        update_time: now,
        insert_time: now,
        teacher: '杨坤'
    };
    const [readOnly, setReadOnly] = useState(mode === 'view');
    const [needConfirmStatus, setNeedConfirmStatus] = useState({ important: false, type: null });
    const [formData, setFormData] = useState(node?.data || initialData);
    const [imageData, setImageData] = useState(formData.image);
    const [openDialog, setOpenDialog] = useState(false);
    const [patching, setPatching] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        setOpenDialog(open);
    }, [open, mode]);

    const useTypeMutation = (type) =>
        useMutation({
            mutationFn: (data) => {
                const { id } = data;
                const request =
                    mode === 'add'
                        ? axios.post(`${process.env.REACT_APP_API_SERVER}/${type}`, data)
                        : axios.patch(`${process.env.REACT_APP_API_SERVER}/${type}/${id}`, data);
                return request;
            },
            onMutate: () => {
                setPatching(true);
            },
            onSuccess: (data, variables) => {
                setPatching(false);
                queryClient.invalidateQueries({ queryKey: ['fetch-courses'] });
                console.log('[DEBUG]: adding/patching data successfully');
                setFormData(initialData);
                setOpenDialog(false);
            }
        });

    const mutation = useTypeMutation('courses');

    const { data: categories, isLoading } = useCategory();

    // Drag & drop
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 1) return;
        const uploadImagefile = acceptedFiles[0];
        // setImageFile(uploadImagefile);
        const reader = new FileReader();

        reader.onabort = () => console.log('[DEBUG]: file reading was aborted');
        reader.onerror = () => console.log('[DEBUG]: file reading was failed');
        reader.onload = () => {
            const binaryStr = reader.result;
            setImageData(binaryStr);
        };
        // reader.onloadend = () => setTimeout(() => setShowImage(true), 500);
        reader.readAsDataURL(uploadImagefile);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png']
        }
    });

    if (isLoading) {
        return <Typography variant="body1">加载...</Typography>;
    }

    const handleChange = (e) => {
        const value = e.target.name === 'is_shop' ? e.target.checked : e.target.value;
        if (e.target.name === 'is_shop' && !e.target.checked) {
            setNeedConfirmStatus({
                important: true,
                type: 'offline'
            });
        }
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };
    const confirmDelete = () => {
        setNeedConfirmStatus({
            important: true,
            type: 'delete'
        });
    };

    const shiftToEditMode = () => {
        setReadOnly(false);
    };

    const saveDataCloseDialog = () => {
        if (needConfirmStatus.important && formData.name === formData.confirm) {
            const removeConfirmData = Object.assign({}, formData);
            delete removeConfirmData[confirm];
            mutation.mutate(removeConfirmData, 'courses');
            setOpenDialog(false);
            return;
        }
        if (!needConfirmStatus.important) {
            mutation.mutate(formData, 'courses');
            setOpenDialog(false);
        }
    };

    return (
        <Dialog TransitionComponent={Transition} onClose={handleClose} open={openDialog} fullWidth maxWidth="md">
            <SimpleBarScroll
                className="my-simple-bar"
                style={{
                    maxHeight: 880
                }}
            >
                <form action="#" autoComplete="off" noValidate>
                    <DialogTitle>{readOnly ? '查看' : '编辑'}课程信息</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Grid container spacing={{ x: 3 }} justifyContent="center" direction="row">
                            <Grid item xs={12} p={2}>
                                <Grid container alignItems="center">
                                    <Grid item xs={9}>
                                        {readOnly ? (
                                            <Typography variant="body2" color="secondary">
                                                你现在正在查看课程信息，此模式下内容仅用于查看，不可以编辑
                                            </Typography>
                                        ) : mode === 'add' ? (
                                            <Typography variant="body2" color={blue[600]}>
                                                你现在正在添加新的课程信息
                                            </Typography>
                                        ) : (
                                            <Typography variant="body2" color={red[600]}>
                                                你现在正在编辑课程信息
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={3} display="flex" justifyContent="flex-end">
                                        <Tooltip title="切换至编辑模式">
                                            <IconButton onClick={shiftToEditMode}>
                                                <EditOutlined />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={3} gap={2} paddingRight={2} alignItems="center" display="flex" flexDirection="column">
                                <Box
                                    justifyContent="center"
                                    display="flex"
                                    gap={2}
                                    alignItems="center"
                                    flexDirection="column"
                                    padding="64"
                                    {...(readOnly ? {} : getRootProps())}
                                >
                                    <Avatar sx={{ width: '172px', height: '172px', borderRadius: 3 }}>
                                        <img
                                            src={imageData || formData.image}
                                            alt=""
                                            style={{ objectFit: 'cover', width: '172px', height: '172px' }}
                                        />
                                    </Avatar>
                                    {!readOnly && <Typography variant="caption">点击图片后更换图片</Typography>}
                                    <input {...getInputProps()} />
                                </Box>
                                <OutlinedInput fullWidth name="image" readOnly={readOnly} value={formData.image} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Grid container direction="column" spacing={{ xs: 3 }}>
                                    <Grid item>
                                        <InputLabel>课程名称</InputLabel>
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
                                        {/* <FormControl fullWidth> */}
                                        <InputLabel>分类</InputLabel>
                                        <Select
                                            style={{ marginTop: '10px' }}
                                            fullWidth
                                            name="categoryId"
                                            value={formData.categortId || categories[0].id}
                                            labelId="status-label"
                                            readOnly={readOnly}
                                            onChange={handleChange}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {/* <FormHelperText error>Name is required</FormHelperText> */}
                                        {/* </FormControl> */}
                                    </Grid>
                                    <Grid item>
                                        <InputLabel>课程描述</InputLabel>
                                        <TextField
                                            name="description"
                                            InputProps={{
                                                readOnly
                                            }}
                                            sx={{ marginTop: '10px' }}
                                            multiline
                                            rows={2}
                                            fullWidth
                                            onChange={handleChange}
                                            value={formData.description}
                                            placeholder="输入课程描述信息"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputLabel>视频录制教师</InputLabel>
                                        <OutlinedInput
                                            name="teacher"
                                            onChange={handleChange}
                                            readOnly={readOnly}
                                            style={{ marginTop: '10px' }}
                                            fullWidth={true}
                                            value={formData.teacher}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <InputLabel>其他事项</InputLabel>
                                        <OutlinedInput
                                            name="mark"
                                            onChange={handleChange}
                                            readOnly={readOnly}
                                            style={{ marginTop: '10px' }}
                                            fullWidth={true}
                                            value={formData.mark}
                                        />
                                    </Grid>

                                    <Grid item sx={{ gap: '24px', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant="h6">是否上线课程</Typography>
                                                <Typography variant="caption" color="#8c8c8c">
                                                    如果课程还在录制中且进度不及一半，你可以先设置课程处于下线模式，一旦课程上线将在首页可见。
                                                </Typography>
                                            </div>
                                            <Switch checked={formData.is_shop} disabled={readOnly} name="is_shop" onChange={handleChange} />
                                        </div>

                                        {/* Confirm delete action */}
                                        <Divider />
                                        {needConfirmStatus.important && (
                                            <Box display="flex" gap={2} flexDirection="column">
                                                <Typography variant="h6" color="error">
                                                    请确认操作
                                                </Typography>
                                                <Box display="flex" gap={1}>
                                                    输入括号内信息
                                                    <Typography variant="body1" style={{ fontWeight: 600 }}>
                                                        {formData.name}
                                                    </Typography>
                                                    {needConfirmStatus.type === 'delete' && (
                                                        <>
                                                            确认你即将删除操作的对象，一旦确定将
                                                            <Typography color="error">不可恢复。</Typography>
                                                        </>
                                                    )}
                                                </Box>

                                                <OutlinedInput name="confirm" onChange={handleChange} fullWidth />
                                            </Box>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '20px' }}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <IconButton color="error" size="large" onClick={confirmDelete}>
                                    <DeleteFilled />
                                </IconButton>
                            </Grid>
                            <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <Button size="small" variant="outlined" color="secondary" onClick={handleClose}>
                                    取消
                                </Button>
                                {!readOnly && (
                                    <Button
                                        onClick={saveDataCloseDialog}
                                        disabled={patching}
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                    >
                                        保存
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                    </DialogActions>
                </form>
            </SimpleBarScroll>
        </Dialog>
    );
};

export default CourseFormDialog;
