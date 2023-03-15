import React, {useState, useEffect} from 'react'
import constants from 'utils/constants'
import List from './List'
import axios from 'axios'
import { toast } from 'react-toastify';

import { alpha } from '@mui/material/styles';
import {
    Grid
} from '@mui/material'

import Loading from '../../../components/Loading';
import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Tooltip } from '@mui/material';
import DeleteConfirm from './branch/DeleteConfirm'
import CreateAndUpdate from './branch/CreateAndUpdate'
import dataUtils from 'utils/dataUtils'

export default function ({ }) {
    const [loading, setLoading] = useState(false);

    const [columns, setColumns] = useState([]);

    const [dataSource, setDataSource] = useState({
        data: [],
        total: 0
    });

    const [pageStatus, setPageStatus] = useState({ ...constants.PAGE_STATUS.LIST });

    const [searchValues, setSearchValues] = useState({
        page: 0,
        size: 10,
        is_deleted: 'false'
    });

    const [services, setServices] = useState([])

    const headCells = [
        {
            id: 'bookingName',
            numeric: false,
            disablePadding: true,
            label: 'Chi nhánh',
            render: (value, record, index) => {
                return (
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap" style={{
                        maxWidth: '200px'
                    }}>
                        {record?.bookingInfo?.name}
                    </p>
                );
            }
        },
        {
            id: 'bookingAddress',
            numeric: false,
            disablePadding: true,
            label: 'Địa điểm',
            render: (value, record, index) => {
                return (
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap" style={{
                        maxWidth: '200px'
                    }}>
                        {record?.bookingInfo?.address}
                    </p>
                );
            }
        },
        {
            id: 'setting',
            numeric: false,
            disablePadding: true,
            label: 'Thao tác',
            render: (value, record, index) => {
                return (
                    <div className="flex gap-3 ">
                        <Tooltip title="Chỉnh sửa" placement="top">
                            <button
                                className="flex items-center justify-center w-1/2 px-4 py-2 text-sm tracking-wide text-black transition-colors duration-200 bg-blue-100 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-300 dark:hover:bg-blue-300 dark:bg-blue-300"
                                onClick={() => {
                                    setPageStatus({ ...constants.PAGE_STATUS.UPDATE, record: record });
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                </svg>
                            </button>
                        </Tooltip>
                        <Tooltip title="Xóa" placement="top">
                            <button
                                className="flex items-center justify-center w-1/2 px-4 py-2 text-sm tracking-wide text-red transition-colors duration-200 bg-gray-100 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-gray-300 dark:hover:bg-gray-300 dark:bg-gray-300"
                                onClick={() => {
                                    setPageStatus({ ...constants.PAGE_STATUS.DELETE, record: record });
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </Tooltip>
                    </div>
                );
            }
        }
    ]

    async function fetchServices() {
        axios
            .get('/api/horse-service')
            .then((response) => { 
                setServices(dataUtils.snakeToCamelCaseWithArray(response.data?.data || []))
            })
            .catch((error) => {
                console.error(`Errorr: `, error);
                setSizes([]);
            });
    }

    async function getDataSource(searchValues) {
        await setLoading(true);
        let object = { ...searchValues };
        object.page = object.page + 1;
        const qs = '?' + new URLSearchParams(dataUtils?.removeNullOrUndefined(object)).toString();
        axios
            .get(`/api/booking${qs}&booking_type_code=HORSE_CLUB`)
            .then(async (response) => {
                let data = response.data;
                if (data?.success) {
                    setDataSource({
                        data: data?.data?.map((item) => {
                            if (item.services && item.services.length) {
                                item.services = dataUtils.snakeToCamelCaseWithArray(item.services)
                            }
                            return dataUtils?.snakeToCamelCase(item)
                        }),
                        total: data?.meta?.total
                    });
                }
                await setLoading(false);
                return data.dataSource;
            })
            .catch((err) => {
                setDataSource({ data: [], total: 0 }); 
                setLoading(false);
            });
    }

    useEffect(() => {
        (async () => {
            await fetchServices();
        })()
    }, [JSON.stringify(pageStatus)]);

    useEffect(() => {
        getDataSource(searchValues);
    }, [JSON.stringify(pageStatus), JSON.stringify(searchValues)]);

    async function onCreate(values, callback) {
        let {newImages, thumbnail, booking} = values
        //handle new images
        if (newImages && newImages.length) {
            let formData = new FormData()
            for (const image of newImages) {
                formData.append('files', image)
            }
            const response = await axios.post('/api/file/upload-multi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (!response.data?.success) {
                if (callback) callback();
                return
            }
            let imageList = response.data.data
            console.log(imageList)
            if (imageList && imageList.length) {
                if (!booking.booking_info.images) {
                    booking.booking_info.images = []
                }
                booking.booking_info.images.push(...imageList)
            }
            console.log(booking.booking_info.images)
        }
        //handle thumb nail
        if (thumbnail) {
            let formData = new FormData()
            formData.append('file', thumbnail)
            const response = await axios.post('/api/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (!response.data?.success) {
                if (callback) callback();
                return
            }
            booking.booking_info.thumbnail = response.data.secure_url || response.data.url
        }
        values.password = constants.AUTH.P_DEFAULT;
        await axios
            .post('/api/booking', {
                ...booking
            })
            .then((response) => {
                if (response?.data?.success) {
                    toast.info('Tạo mới thành công');
                    setPageStatus(constants.PAGE_STATUS.LIST);
                } else {
                    toast.error('Tạo mới thất bại');
                }
            })
            .catch((err) => {
                toast.error('Tạo mới thất bại');
            });
        if (callback) callback();
    }

    async function onUpdate(values, callback) {
        let {newImages, thumbnail, booking} = values
        //handle new images
        if (newImages && newImages.length) {
            let formData = new FormData()
            for (const image of newImages) {
                formData.append('files', image)
            }
            const response = await axios.post('/api/file/upload-multi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (!response.data?.success) {
                if (callback) callback();
                return
            }
            let imageList = response.data.data
            console.log(imageList)
            if (imageList && imageList.length) {
                if (!booking.booking_info.images) {
                    booking.booking_info.images = []
                }
                booking.booking_info.images.push(...imageList)
            }
            console.log(booking.booking_info.images)
        }
        //handle thumb nail
        if (thumbnail) {
            let formData = new FormData()
            formData.append('file', thumbnail)
            const response = await axios.post('/api/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (!response.data?.success) {
                if (callback) callback();
                return
            }
            booking.booking_info.thumbnail = response.data.secure_url || response.data.url
        }
        await axios
            .put(`/api/booking/${booking._id}`, {
                ...booking
            })
            .then((response) => {
                if (response?.data?.success) {
                    toast.info('Cập nhật thành công');
                    setPageStatus(constants.PAGE_STATUS.LIST);
                } else {
                    toast.error('Cập nhật thất bại');
                }
            })
            .catch((err) => {
                toast.error('Cập nhật thất bại');
            });
        await setPageStatus(constants.PAGE_STATUS.LIST);
        callback && callback()
    }

    async function onDelete(booking) {
        await axios
            .delete(`/api/booking/${booking._id}`)
            .then((response) => {
                if (response?.data?.success) {
                    toast.info('Xóa thành công');
                    setPageStatus(constants.PAGE_STATUS.LIST);
                } else {
                    toast.error('Xóa thất bại');
                }
            })
            .catch((err) => {
                toast.error('Xóa thất bại');
            });
        await setPageStatus(constants.PAGE_STATUS.LIST);
    }

    return <>
        <Grid container spacing={2} marginBottom={4}>
            {pageStatus.status === constants.PAGE_STATUS.LIST.status || pageStatus.status === constants.PAGE_STATUS.DELETE.status ? (
                    <>
                        <List 
                            loading={loading}
                            setPageStatus={setPageStatus}
                            columns={columns}
                            dataSource={dataSource}
                            setSearchValues={setSearchValues}
                            searchValues={searchValues}
                            headCells={headCells}
                            title="Danh sách chi nhánh"
                        />
                        <DeleteConfirm
                            pageStatus={pageStatus}
                            onSubmit={onDelete}
                            setPageStatus={setPageStatus}
                            open={pageStatus.status === constants.PAGE_STATUS.DELETE.status}
                        />
                    </>
                ) : (
                ''
            )}
            {pageStatus.status === constants.PAGE_STATUS.CREATE.status ? (
                <CreateAndUpdate pageStatus={pageStatus} setPageStatus={setPageStatus} onSubmit={onCreate} services={services} />
            ) : (
                ''
            )}
            {pageStatus.status === constants.PAGE_STATUS.UPDATE.status ? (
                <CreateAndUpdate pageStatus={pageStatus} setPageStatus={setPageStatus} onSubmit={onUpdate} services={services} />
            ) : (
                ''
            )}
        </Grid>
    </>
}