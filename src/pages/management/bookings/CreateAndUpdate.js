import React, { useEffect, useMemo, useState } from 'react';
import constants from 'utils/constants';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { FormControl, InputLabel, Typography, Button, Tooltip } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import CKEditor from 'components/Editor'

// import TextField from '@mui/material/TextField';

import DateFnsUtils from '@date-io/date-fns';
import {
    TextField,
    Checkbox,
    Select,
    MenuItem,
    Switch,
    RadioGroup,
    FormControlLabel,
    ThemeProvider,
    Radio,
    createMuiTheme,
    Slider,
    Box
} from '@mui/material';
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider
// } from "@mui/material";
// import MuiAutoComplete from "./MuiAutoComplete";

import DatePicker from '@mui/lab/DatePicker';
import dataUtils from 'utils/dataUtils';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CloseCircleOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

const initDefaultValues = {
    bookingInfo: {
        name: null,
        description: null,
        address: null,
        images: [],
        thumbnail: null
    },
    bookingTypeCode: null
};

export default ({ onSubmit, pageStatus, setPageStatus, categories }) => {
    const [defaultValues, setDefaultValues] = useState({ ...initDefaultValues });

    const [newImages, setNewImages] = useState([])

    const [thumbnail, setThumbnail] = useState(null)

    const [currentImages, setCurrentImages] = useState([])

    const [updating, setUpdating] = useState(false)

    const schema = yup.object().shape({
        bookingInfo: yup.object().shape({
            name: yup.string().nullable().required('Trường thông tin bắt buộc'),
            address: yup.string().nullable().required('Trường thông tin bắt buộc'),
            numberOfTables: yup.number().required('Trường thông tin bắt buộc').min(1, 'Trường thông tin bắt buộc'),
        }),
        bookingTypeCode: yup.string().nullable().required('Trường thông tin bắt buộc')
    });

    const {
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        control
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: useMemo(() => {
            return pageStatus.record;
        }, [JSON.stringify(pageStatus)])
    });

    // useEffect(() => {
    //     if (pageStatus?.status === constants.PAGE_STATUS.UPDATE.status) { 
    //         setDefaultValues(pageStatus?.record);
    //     }
    // }, [JSON.stringify(pageStatus)]);

    const onNewImages = e => {
        e.preventDefault();
        const newFiles = []
        const files = e.target.files
        for (const file of files) {
            let url = URL.createObjectURL(file)
            file.url = url
            newFiles.push(file)
        }   
        setNewImages([
            ...newImages,
            ...newFiles
        ])
    }

    const onNewThumbnail = e => {
        e.preventDefault()
        console.log(e.target.files)
        let file = e.target.files[0]
        let url = URL.createObjectURL(file)
        file.url = url
        setThumbnail(file)
    }

    const onRemoveNewImage = idx => {
        setNewImages([
            ...newImages.slice(0, idx),
            ...newImages.slice(idx + 1, newImages.length)
        ])
    }

    const onRemoveImage = idx => {
        console.log(idx)
        setCurrentImages([
            ...currentImages.slice(0, idx),
            ...currentImages.slice(idx + 1, currentImages.length)
        ])
    }

    useEffect(() => {
        if (updating) {
            toast.info('Đang cập nhật')
        }
    }, [updating])

    useEffect(() => {
        if (pageStatus.status == 'UPDATE') {
            setCurrentImages([...pageStatus.record?.bookingInfo?.images])
        }
    }, [JSON.stringify(pageStatus.record?.bookingInfo?.images )])

    return (
        <>
            <div className="py-3">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        {pageStatus?.status === constants?.PAGE_STATUS.CREATE.status ? `Tạo mới địa điểm` : `Cập nhật địa điểm (${pageStatus?.record?.bookingInfo?.name})`} 
                    </h2>
                </div>
            </div>

            <form>
                <div className="container bg-white p-3">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Thông tin địa điểm</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <FormControl sx={{ minWidth: 120 }} className="mt-3 w-full" fullWidth>
                                            <InputLabel required id="demo-simple-select-helper-label">
                                                Loại địa điểm
                                            </InputLabel>{' '}
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                label="Loại địa điểm"
                                                {...field}
                                                fullWidth
                                                required
                                                defaultValue={null}
                                                error={!!formState.errors?.bookingTypeCode}
                                            >
                                                {categories?.map((item, index) => {
                                                    return (
                                                        <MenuItem key={index + item?._id} value={item?.category_code}>
                                                            {item?.category_name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    );
                                }}
                                name="bookingTypeCode"
                                control={control}
                            />
                            <p className="text-red">{errors?.bookingTypeCode?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Tên địa điểm"
                                            error={!!formState.errors?.bookingInfo?.name}
                                            placeholder="Tên địa điểm"
                                            className="mt-3 w-full"
                                            type="text"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="bookingInfo.name"
                                control={control}
                            />
                            <p className="text-red">{errors?.bookingInfo?.name?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Địa chỉ"
                                            error={!!formState.errors?.bookingInfo?.address}
                                            placeholder="Địa chỉ"
                                            className="mt-3 w-full"
                                            type="text"
                                            required
                                        />
                                    );
                                }}
                                name="bookingInfo.address"
                                control={control}
                            />
                            <p className="text-red">{errors?.bookingInfo?.address?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Số bàn"
                                            error={!!formState.errors?.bookingInfo?.numberOfTables}
                                            placeholder="Số bàn"
                                            className="mt-3 w-full"
                                            type="number"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="bookingInfo.numberOfTables"
                                control={control}
                            />
                            <p className="text-red">{errors?.bookingInfo?.numberOfTables?.message}</p>
                        </Box>
                    </div>
                </div>
                <div className="container bg-white p-3 mt-5">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Thumbnail</h3>

                        <Button style={{ margin: '5px' }}>
                            <label style={{
                                cursor: 'pointer',
                                }}
                                htmlFor="thumbnail">
                                    Cập nhật
                            </label>
                            <input type="file"
                                accept='image/*'
                                onChange={onNewThumbnail}
                                id="thumbnail"
                                style={{
                                    display: 'none'
                                }}
                            />
                        </Button>
                    </div>
                    <div className="flex items-center gap-x-3 flex-wrap">
                        {thumbnail && <div 
                            className="cursor-pointer bg-cover bg-no-repeat bg-center"
                            style={{
                                position: 'relative',
                                width: '200px',
                                height: '200px',
                                backgroundImage: `url(${thumbnail.url})` 
                        }}></div>}
                        {!thumbnail && pageStatus.record?.bookingInfo?.thumbnail && <div 
                            className="cursor-pointer bg-cover bg-no-repeat bg-center"
                            style={{
                                position: 'relative',
                                width: '200px',
                                height: '200px',
                                backgroundImage: `url(${pageStatus.record?.bookingInfo?.thumbnail})` 
                        }}></div>}
                    </div>
                </div>
                <div className="container bg-white p-3 mt-5">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Hình ảnh địa điểm</h3>

                        <Button style={{ margin: '5px' }}>
                            <label style={{
                                cursor: 'pointer',
                                }}
                                htmlFor="files">
                                    Thêm mới
                            </label>
                            <input type="file"
                                accept='image/*'
                                onChange={onNewImages}
                                multiple="multiple"
                                id="files"
                                style={{
                                    display: 'none'
                                }}
                            />
                        </Button>
                    </div>
                    <div className="flex items-center gap-x-3 flex-wrap">
                        {newImages.map((image, idx) => (
                            <div key={idx} 
                                className="cursor-pointer bg-cover bg-no-repeat bg-center" 
                                style={{
                                    position: 'relative',
                                    width: '200px',
                                    height: '200px',
                                    backgroundImage: `url(${image.url})` 
                                }}>
                                <Tooltip title="Xóa">
                                    <CloseCircleOutlined color='red' size='large' style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        fontSize: '25px',
                                        cursor: 'pointer',
                                        color: 'red'
                                    }} onClick={e => {
                                        e.preventDefault()
                                        onRemoveNewImage(idx)}} 
                                    />
                                </Tooltip>
                            </div>
                        ))}
                        {currentImages.map((image, idx) => (
                            <div key={image} 
                                className="cursor-pointer bg-cover bg-no-repeat bg-center" 
                                style={{
                                    position: 'relative',
                                    width: '200px',
                                    height: '200px',
                                    backgroundImage: `url(${image})` 
                                }}>
                                <Tooltip title="Xóa">
                                    <CloseCircleOutlined color='red' size='large' style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        fontSize: '25px',
                                        cursor: 'pointer',
                                        color: 'red'
                                    }} onClick={e => {
                                        e.preventDefault()
                                        onRemoveImage(idx)}} 
                                    />
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container bg-white p-3 mt-5">
                    <CKEditor
                    title='Mô tả chi nhánh'
                    onChange={(event, editor, data) => {
                        setValue('bookingInfo.description', event.data)
                    }}
                    defaultData={getValues('bookingInfo.description')}
                    />
                </div>
                <CKEditor
                    onChange={(event, editor, data) => {
                        console.log(event, editor, data)
                    }}
                />
                <div className="container flex justify-end p-3 mt-5">
                    <button
                        type="button "
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit(function (values) {
                            values.bookingInfo.images = currentImages
                            setUpdating(true)
                            onSubmit({
                                newImages,
                                thumbnail,
                                booking: dataUtils.camelToSnakeCase(values)
                            }, () => setUpdating(false)); 
                        })}
                        disabled={updating}
                    >
                        {pageStatus?.status === constants?.PAGE_STATUS.CREATE.status ? 'Tạo mới ' : 'Cập nhật '}
                    </button>
                    <button
                        type="button "
                        className="mx-3 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => setPageStatus(constants.PAGE_STATUS.LIST)}
                        disabled={updating}
                    >
                        Quay lại
                    </button>
                </div>
            </form>
        </>
    );
};