import React, { useEffect, useMemo, useState } from 'react';
import constants from 'utils/constants';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { Autocomplete, FormControl, InputLabel, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

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

const initDefaultValues = {
    userInfo: {
        fullName: null,
        email: null,
        phoneNumber: null
    },
    username: null,
    role: null
};

export default ({ onSubmit, pageStatus, setPageStatus, parentCategories }) => {
    const [defaultValues, setDefaultValues] = useState({ ...initDefaultValues });

    const schema = yup.object().shape({
        parentCategoryId: yup.object().nullable().required('Trường thông tin bắt buộc'),
        categoryName: yup.string().nullable().required('Trường thông tin bắt buộc'),
        categoryCode: yup.string().nullable().required('Trường thông tin bắt buộc')
    });

    const {
        handleSubmit,
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

    return (
        <>
            <div className="py-3">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        {pageStatus?.status === constants?.PAGE_STATUS.CREATE.status
                            ? `Tạo mới danh mục`
                            : `Cập nhật danh mục (${pageStatus?.record?.categoryName})`}
                    </h2>
                </div>
            </div>

            <form>
                <div className="container bg-white p-3">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Thông tin danh mục</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={[{ label: 'Danh mục cha', id: 'null' }].concat(parentCategories)}
                                            className=" mt-3  w-full"
                                            getOptionLabel={(option) => option.label}
                                            {...field}
                                            onChange={(e, value)=>{
                                                field.onChange(value)
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    style={{ padding: '5px' }}
                                                    className="auto_input"
                                                    {...params}
                                                    label="Loại danh mục"
                                                    error={!!formState.errors?.parentCategoryId}
                                                />
                                            )}
                                            disableClearable
                                        />
                                    );
                                }}
                                name="parentCategoryId"
                                control={control}
                            />
                            <p className="text-red">{errors?.parentCategoryId?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Mã danh mục"
                                            error={!!formState.errors?.categoryCode}
                                            placeholder="Mã danh mục"
                                            className="mt-3 w-full"
                                            type="text"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="categoryCode"
                                control={control}
                            />
                            <p className="text-red">{errors?.categoryCode?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Tên danh mục"
                                            error={!!formState.errors?.categoryName}
                                            placeholder="Tên danh mục"
                                            className="mt-3 w-full"
                                            type="text"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="categoryName"
                                control={control}
                            />
                            <p className="text-red">{errors?.userInfo?.categoryName}</p>
                        </Box>
                    </div>
                </div>
                <div className="container flex justify-end p-3 mt-5">
                    <button
                        type="button "
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit(function (values) {
                            console.log(`values`, values)
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
