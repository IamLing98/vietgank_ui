import React, { useEffect, useMemo, useState } from 'react';
import constants from 'utils/constants';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { FormControl, InputLabel, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

// import TextField from '@mui/material/TextField';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const initDefaultValues = {
    productInfo: {
        productCode: null,
        quantity: null,
        size: [],
        tags: [],
        productName: null
    },
    productType: null,
    serviceType: 'CLOTHES'
};

export default ({ onSubmit, pageStatus, setPageStatus, categories, options, sizes }) => {
    const [defaultValues, setDefaultValues] = useState({ ...initDefaultValues });

    const [tagsOptions, setTagOptions] = useState([]);

    const schema = yup.object().shape({
        productInfo: yup.object().shape({
            productCode: yup.string().nullable().required('Trường thông tin bắt buộc'),
            quantity: yup.string().nullable().required('Trường thông tin bắt buộc'),
            size: yup.array().required('Trường thông tin bắt buộc'),
            tags: yup.array().required('Trường thông tin bắt buộc'),
            productName: yup.string().nullable().required('Trường thông tin bắt buộc')
        }),
        productType: yup.string().nullable().required('Trường thông tin bắt buộc')
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue
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

    return (
        <>
            <div className="py-3">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        {pageStatus?.status === constants?.PAGE_STATUS.CREATE.status
                            ? `Tạo mới sản phẩm`
                            : `Cập nhật sản phẩm (${pageStatus?.record?.username})`}
                    </h2>
                </div>
            </div>

            <form>
                <div className="container bg-white p-3">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Thông tin sản phẩm</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <FormControl sx={{ minWidth: 120 }} className="mt-3 w-full" fullWidth>
                                            <InputLabel required id="demo-simple-select-helper-label">
                                                Loại sản phẩm
                                            </InputLabel>{' '}
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                label="Loại sản phẩm"
                                                {...field}
                                                fullWidth
                                                required
                                                defaultValue={[]}
                                                onChange={(e) => {
                                                    let newOptions = [];
                                                    let key = e?.target?.value;
                                                    let arr1 = options[key];
                                                    arr1?.forEach((category) => {
                                                        newOptions.push(category);
                                                    });
                                                    console.log(`newOptions: `, newOptions);
                                                    setTagOptions([...newOptions]);
                                                    field.onChange(e);
                                                    setValue('productInfo.tags', []);
                                                }}
                                                error={!!formState.errors?.productType}
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
                                name="productType"
                                control={control}
                            />
                            <p className="text-red">{errors?.productType?.message}</p>
                        </Box>

                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <FormControl sx={{ minWidth: 120 }} className="mt-3 w-full" fullWidth>
                                            <InputLabel required id="demo-simple-select-helper-label">
                                                Tags
                                            </InputLabel>{' '}
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                label="Tags"
                                                {...field}
                                                fullWidth
                                                required
                                                multiple
                                                defaultValue={[]}
                                                error={!!formState.errors?.productInfo?.tags}
                                            >
                                                {tagsOptions?.map((item, index) => {
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
                                name="productInfo.tags"
                                control={control}
                            />
                            <p className="text-red">{errors?.productInfo?.tags?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Tên sản phẩm"
                                            error={!!formState.errors?.productInfo?.productName}
                                            placeholder="Tên sản phẩm"
                                            className="mt-3 w-full"
                                            type="text"
                                            variant="outlined"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="productInfo.productName"
                                control={control}
                            />
                            <p className="text-red">{errors?.productInfo?.productName?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Mã sản phẩm"
                                            error={!!formState.errors?.productInfo?.productCode}
                                            placeholder="Mã sản phẩm"
                                            className="mt-3 w-full"
                                            type="text"
                                            variant="outlined"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="productInfo.productCode"
                                control={control}
                            />
                            <p className="text-red">{errors?.productInfo?.productCode?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Số lượng"
                                            error={!!formState.errors?.productInfo?.quantity}
                                            placeholder="Số lượng"
                                            className="mt-3 w-full"
                                            type="text"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="productInfo.quantity"
                                control={control}
                            />
                            <p className="text-red">{errors?.productInfo?.quantity?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <FormControl sx={{ minWidth: 120 }} className="mt-3 w-full" fullWidth>
                                            <InputLabel required id="demo-simple-select-helper-label">
                                                Kích thước
                                            </InputLabel>{' '}
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                label="Kích thước"
                                                {...field}
                                                fullWidth
                                                required
                                                multiple
                                                defaultValue={[]}
                                                error={!!formState.errors?.productInfo?.size}
                                            >
                                                 {sizes?.map((item, index) => {
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
                                name="productInfo.size"
                                control={control}
                            />
                            <p className="text-red">{errors?.productInfo?.size?.message}</p>
                        </Box>

                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Giá tiền"
                                            error={!!formState.errors?.productInfo?.price}
                                            placeholder="Giá tiền"
                                            className="mt-3 w-full"
                                            type="text"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="productInfo.price"
                                control={control}
                            />
                            <p className="text-red">{errors?.productInfo?.price?.message}</p>
                        </Box>
                    </div>
                </div>
                <div className="container bg-white p-3 mt-5">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Mô tả sản phẩm</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Box>
                            <ReactQuill theme="snow" value={'value'} />
                        </Box>
                    </div>
                </div>
                <div className="container flex justify-end p-3 mt-5">
                    <button
                        type="button "
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit(function (values) { 
                            console.log(dataUtils.camelToSnakeCase(values))
                            onSubmit(dataUtils.camelToSnakeCase(values)); 
                        })}
                    >
                        {pageStatus?.status === constants?.PAGE_STATUS.CREATE.status ? 'Tạo mới ' : 'Cập nhật '}
                    </button>
                    <button
                        type="button "
                        className="mx-3 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => setPageStatus(constants.PAGE_STATUS.LIST)}
                    >
                        Quay lại
                    </button>
                </div>
            </form>
        </>
    );
};
