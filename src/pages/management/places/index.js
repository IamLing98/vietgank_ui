import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';

import data from './data';
import List from './List';
import Breadcrumbs from '../../../components/Breadcrum';
import constants from 'utils/constants';
import CreateAndUpdate from './CreateAndUpdate';
import dataUtils from 'utils/dataUtils';
import DeleteConfirm from './DeleteConfirm';

export default function BasicBreadcrumbs() {
    const [loading, setLoading] = useState(false);

    const [columns, setColumns] = React.useState(data.columns);

    const [dataSource, setDataSource] = useState({
        data: [],
        total: 0
    });

    const [pageStatus, setPageStatus] = useState({ ...constants.PAGE_STATUS.LIST });

    const [categories, setCategories] = useState([])

    const [searchValues, setSearchValues] = useState({
        page: 0,
        size: 10,
        is_deleted: 'false',
        booking_type_code: []
    });

    async function getDataSource(searchValues) {
        await setLoading(true);
        console.log(searchValues);
        let object = { ...searchValues };
        object.page = object.page + 1;
        const qs = '?' + new URLSearchParams(dataUtils?.removeNullOrUndefined(object)).toString();
        axios
            .get(`/api/booking${qs}`)
            .then(async (response) => {
                let data = response.data;
                if (data?.success) {
                    setDataSource({
                        data: data?.data?.map((item) => dataUtils?.snakeToCamelCase(item)),
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

    async function onDelete(values) {
        console.log(`Values`, values);
        await axios
            .delete(`/api/booking?product_id=${values?._id}`)
            .then((response) => {
                if (response?.data?.success) {
                    toast.info('Xóa thành công');
                    setPageStatus(constants.PAGE_STATUS.LIST);
                } else {
                    toast.error('Xóa thất bại');
                }
            })
            .catch((err) => {
                toast.error('Xóa thất bại');
            });
        await setPageStatus(constants.PAGE_STATUS.LIST);
    }

    const fetchCategories = async () => {
        axios.get('/api/category?parent_category_code=LOAI_DIA_DIEM')
            .then(response => {
                if (response.data.success) {
                    setCategories(response.data.data.map(item => ({
                        category_code: item.category_code,
                        category_name: item.category_name
                    })))
                }
            })
    }

    useEffect(() => {
        (async () => {
            fetchCategories();
        })()
    }, [JSON.stringify(pageStatus)]);

    return (
        <>
            <Breadcrumbs values={['Quản lý', 'Quản lý địa điểm']} />
            <section className="  mx-auto">
                {pageStatus.status === constants.PAGE_STATUS.LIST.status || pageStatus.status === constants.PAGE_STATUS.DELETE.status ? (
                    <>
                        <List
                            loading={loading}
                            setPageStatus={setPageStatus}
                            columns={columns}
                            dataSource={dataSource}
                            setSearchValues={setSearchValues}
                            searchValues={searchValues}
                            categories={categories}
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
                    <CreateAndUpdate pageStatus={pageStatus} setPageStatus={setPageStatus} categories={categories} onSubmit={onCreate} />
                ) : (
                    ''
                )}
                {pageStatus.status === constants.PAGE_STATUS.UPDATE.status ? (
                    <CreateAndUpdate pageStatus={pageStatus} setPageStatus={setPageStatus} onSubmit={onUpdate} categories={categories} />
                ) : (
                    ''
                )}
            </section>
        </>
    );
}
