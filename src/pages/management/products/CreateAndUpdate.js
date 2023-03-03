import React, { useEffect, useMemo, useState } from 'react';
import constants from 'utils/constants';

import { useForm, Controller, useFieldArray } from 'react-hook-form';

import * as yup from 'yup';
import { FormControl, InputLabel, Typography, Button, Tooltip } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';

// import TextField from '@mui/material/TextField';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
    TextField,
    Select,
    MenuItem,
    Box
} from '@mui/material';

import { CloseCircleOutlined } from '@ant-design/icons'
import dataUtils from 'utils/dataUtils';
const initDefaultValues = {
    productInfo: {
        productCode: null,
        quantity: null,
        size: [],
        tags: [],
        productName: null,
        description: null,
        images: [],
        thumbnail: null
        // amounts: [
        //     {quantity: null, size: null}
        // ]
    },
    productTypeCode: null,
    serviceType: 'CLOTHES'
};

export default ({ onSubmit, pageStatus, setPageStatus, categories, options, sizes }) => {
    const [defaultValues, setDefaultValues] = useState({ ...initDefaultValues });

    const [tagsOptions, setTagOptions] = useState([]);

    const [newImages, setNewImages] = useState([])

    const [thumbnail, setThumbnail] = useState(null)

    const [updating, setUpdating] = useState(false)

    const schema = yup.object().shape({
        productInfo: yup.object().shape({
            productCode: yup.string().nullable().required('Trường thông tin bắt buộc'),
            quantity: yup.string().nullable().required('Trường thông tin bắt buộc'),
            size: yup.array().required('Trường thông tin bắt buộc'),
            tags: yup.array().required('Trường thông tin bắt buộc'),
            productName: yup.string().nullable().required('Trường thông tin bắt buộc')
        }),
        productTypeCode: yup.string().nullable().required('Trường thông tin bắt buộc')
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
        register,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: useMemo(() => {
            return {
                ...initDefaultValues,
                ...pageStatus.record
            };
        }, [JSON.stringify(pageStatus)])
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "productInfo.amounts", // unique name for your Field Array
    });

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

    const onNewProductAmount = () => {
        append({quantity: null, size: null})
    }

    const onRemoveProductAmount = (idx) => {
        console.log(fields)
        remove(idx)
        console.log(idx)
        console.log(fields)
    }

    useEffect(() => {
        if (updating) {
            toast.info('Đang cập nhật')
        }
    }, [updating])

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
                                                error={!!formState.errors?.productTypeCode}
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
                                name="productTypeCode"
                                control={control}
                            />
                            <p className="text-red">{errors?.productTypeCode?.message}</p>
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
                                            type="number"
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
                                            type="number"
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
                {/* <div className='container bg-white pt-3 mt-5'>
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Số lượng sản phẩm</h3>
                        <Button style={{ margin: '5px' }} onClick={onNewProductAmount}>
                            Thêm mới
                        </Button>
                    </div>
                    {fields.map((item, idx) => {
                        return (
                            <div className="grid grid-cols-3 gap-4" key={idx}>
                                <Box>
                                    <TextField
                                        key={item.id}
                                        {...register(`productInfo.amounts[${idx}].quantity`)} 
                                        label="Số lượng"
                                        placeholder="Số lượng"
                                        className="mt-3 w-full"
                                        type="number"
                                        required
                                    />
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
                                                        key={item.id}
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        label="Kích thước"
                                                        {...field}
                                                        fullWidth
                                                        required
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
                                        {...register(`productInfo.amounts[${idx}].size`)}
                                        control={control}
                                    />
                                </Box>
                                <div className="flex items-center justify-start">
                                    <Button color='error' disabled={fields.length == 1} onClick={e => {
                                        e.preventDefault()
                                        onRemoveProductAmount(idx)
                                    }}>
                                        Xóa
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div> */}
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
                        {thumbnail && <div style={{
                            position: 'relative',
                            width: '200px',
                            height: '200px',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: `url(${thumbnail.url})` 
                        }}></div>}
                    </div>
                </div>
                <div className="container bg-white p-3 mt-5">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Hình ảnh sản phẩm</h3>

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
                            <div key={idx} style={{
                                position: 'relative',
                                width: '200px',
                                height: '200px',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
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
                    </div>
                </div>
                <div className="container bg-white p-3 mt-5">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Mô tả sản phẩm</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Controller
                            render={({field}) => {
                                return (
                                    <Box>
                                        <ReactQuill theme="snow"  {...field} placeholder="Mô tả sản phẩm" />
                                    </Box>
                                )
                            }}
                            name="productInfo.description"
                            control={control
                            }
                            />
                    </div>
                </div>
                <div className="container flex justify-end p-3 mt-5">
                    <button
                        type="button "
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleSubmit(function (values) {
                            setUpdating(true)
                            onSubmit({
                                newImages,
                                thumbnail,
                                product: dataUtils.camelToSnakeCase(values)
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
