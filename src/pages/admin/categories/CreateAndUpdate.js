import React, { useEffect, useMemo, useState } from 'react';
import constants from 'utils/constants';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { FormControl, InputLabel, Typography } from '@mui/material';
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

export default ({ onSubmit, pageStatus, setPageStatus }) => {
    const [defaultValues, setDefaultValues] = useState({ ...initDefaultValues });

    const schema = yup.object().shape({
        userInfo: yup.object().shape({
            fullName: yup.string().nullable().required('Trường thông tin bắt buộc'),
            email: yup.string().nullable().required('Trường thông tin bắt buộc').email('Định dạng mail không đúng'),
            phoneNumber: yup.string().nullable().required('Trường thông tin bắt buộc')
        }),
        username: yup.string().nullable().required('Trường thông tin bắt buộc'),
        role: yup.string().nullable().required('Trường thông tin bắt buộc')
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
                        {pageStatus?.status === constants?.PAGE_STATUS.CREATE.status ? `Tạo mới tài khoản` : `Cập nhật tài khoản (${pageStatus?.record?.username})`} 
                    </h2>
                </div>
            </div>

            <form>
                <div className="container bg-white p-3">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Thông tin cá nhân</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Họ và tên"
                                            error={!!formState.errors?.userInfo?.fullName}
                                            placeholder="Họ và tên"
                                            className="mt-3 w-full"
                                            type="text"
                                            variant="outlined"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="userInfo.fullName"
                                control={control}
                            />
                            <p className="text-red">{errors?.userInfo?.fullName?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Số điện thoại"
                                            error={!!formState.errors?.userInfo?.phoneNumber}
                                            placeholder="Số điện thoại"
                                            className="mt-3 w-full"
                                            type="text"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="userInfo.phoneNumber"
                                control={control}
                            />
                            <p className="text-red">{errors?.userInfo?.phoneNumber?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            error={!!formState.errors?.userInfo?.email}
                                            placeholder="Email"
                                            className="mt-3 w-full"
                                            type="email"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                        />
                                    );
                                }}
                                name="userInfo.email"
                                control={control}
                            />
                            <p className="text-red">{errors?.userInfo?.email?.message}</p>
                        </Box>
                    </div>
                </div>
                <div className="container bg-white p-3 mt-5">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Thông tin tài khoản</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <TextField
                                            {...field}
                                            label="Tài khoản"
                                            error={!!formState.errors?.username}
                                            placeholder="Tài khoản"
                                            className="mt-3 w-full"
                                            type="text"
                                            variant="outlined"
                                            required
                                            inputProps={{ maxLength: 50 }}
                                            disabled={pageStatus?.status === constants?.PAGE_STATUS.UPDATE.status }

inputProps={{ style: { color: 'black' } }}
                                        />
                                    );
                                }}
                                name="username"
                                control={control}
                            />
                            <p className="text-red">{errors?.username?.message}</p>
                        </Box>
                        <Box>
                            <Controller
                                render={({ field, formState, fieldState }) => {
                                    return (
                                        <FormControl sx={{ m: 1, minWidth: 120 }} className="mt-3 w-full" fullWidth>
                                            <InputLabel id="demo-simple-select-helper-label">Quyền</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                label="Quyền"
                                                {...field}
                                                fullWidth
                                                required
                                                error={!!formState.errors?.role}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={`super_admin`}>Quản trị viên</MenuItem>
                                                <MenuItem value={'admin'}>Nhân viên</MenuItem>
                                            </Select>
                                        </FormControl>
                                    );
                                }}
                                name="role"
                                control={control}
                                className="w-full"
                                style={{ width: '100%' }}
                            />
                            <p className="text-red">{errors?.role?.message}</p>
                        </Box>
                    </div>
                </div>
                <div className="container flex justify-end p-3 mt-5">
                    <button
                        type="button "
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit(function (values) {
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
