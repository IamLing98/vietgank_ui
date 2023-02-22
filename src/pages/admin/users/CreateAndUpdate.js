import React from 'react';
import constants from 'utils/constants';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';


// import TextField from '@mui/material/TextField';




import DateFnsUtils from "@date-io/date-fns";
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
    Slider
} from "@mui/material";
// import {
//   KeyboardDatePicker,
//   MuiPickersUtilsProvider
// } from "@mui/material";
// import MuiAutoComplete from "./MuiAutoComplete";

import DatePicker from '@mui/lab/DatePicker';

const schema = yup.object().shape({
    fullname: yup.string().required("Required")
});


export default ({ }) => {

    const validationSchema = yup.object().shape({
        fullname: yup.string().required('Fullname is required'),
        username: yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: yup.string()
            .required('Confirm Password is required')
            .oneOf([yup.ref('password'), null], 'Confirm Password does not match'),
        acceptTerms: yup.bool().oneOf([true], 'Accept Terms is required')
    });

    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        resolver: yupResolver(schema),
        mode:'onChange'
    });


    return (

        <div className="container">
            <form>
                <Controller
                    render={({field, formState, fieldState }) => {
                        return <TextField {...field}label="Title" error={!!formState.errors?.fullname} />;
                    }}
                    name="fullname"
                    control={control}
                />
                <span>{errors?.fullname?.message}</span>
            </form>
        </div>
    )
};



{/* <button
type="button "
className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
Tạo mới
</button>
<button
type="button "
className="mx-3 text-white bg-blue-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
onClick={() => setPageStatus(constants.PAGE_STATUS.LIST)}
>
Quay lại
</button> */}

