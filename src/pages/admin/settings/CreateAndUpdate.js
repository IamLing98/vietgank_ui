import React, { useEffect, useMemo, useState } from 'react';
import constants from 'utils/constants';

import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { FormControl, InputLabel, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

import DatePicker from '@mui/lab/DatePicker';
import dataUtils from 'utils/dataUtils';
import { toast } from 'react-toastify';
import axios from 'axios';

const initDefaultValues = {
    c: null
};

export default ({ onSubmit, pageStatus, setPageStatus }) => {
    const [defaultValues, setDefaultValues] = useState({ ...initDefaultValues });

    const [imagePreviewUrl, setImagePreviewUrl] = useState();

    const schema = yup.object().shape({
        value: yup.string().nullable().required('Trường thông tin bắt buộc')
    });

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: useMemo(() => {
            let newDefaultValues = {...pageStatus?.record}
            setImagePreviewUrl(newDefaultValues.value)
            newDefaultValues.value = null 
            return newDefaultValues;
        }, [JSON.stringify(pageStatus)])
    });

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            toast.error('Chỉ cho phép upload ảnh!');
        }
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            toast.error('File ảnh phải nhỏ hơn 10MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            // setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                // setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <>
            <div className="py-3">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        {pageStatus?.status === constants?.PAGE_STATUS.CREATE.status
                            ? `Tạo mới tài khoản`
                            : `Cập nhật cấu hình (${pageStatus?.record?.description})`}
                    </h2>
                </div>
            </div>

            <form>
                <div className="container bg-white p-3">
                    <div className="flex items-center gap-x-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Thông tin cấu hình </h3>
                    </div>
                    <div className=" container flex justify-between">
                        <div>
                            <Upload
                                name="avatar"
                                listType="picture-circle"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={async (file) => {
                                    setLoading(true);
                                    console.log(`Handle upload file`, file);
                                    let formData = new FormData();
                                    formData.append('file', file);
                                    let data = await axios
                                        .post('/api/file/upload', formData)
                                        .then(async (response) => {
                                            let url = response.data?.url;
                                            setImagePreviewUrl(url);
                                            setValue('value', url);
                                            setLoading(false);
                                            return true;
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                        });
                                    return data;
                                }}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%'
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                            <p className="text-red">{errors?.value?.message}</p>
                            <div className="image-preview">
                                {imagePreviewUrl ? <img width={'500'} height="500" src={imagePreviewUrl} alt="preiverw" /> : ''}
                            </div>
                        </div>

                        <p className="text-red">{errors?.userInfo?.email?.message}</p>
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
