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

    const [searchValues, setSearchValues] = useState({
        page: 0,
        size: 10,
        parent_category_id: -1
    });

    const [parentCategories, setParentCategories] = useState([]);

    async function getDataSource(searchValues) {
        await setLoading(true);
        let object = { ...searchValues };
        object.page = object.page + 1;
        const qs = '?' + new URLSearchParams(dataUtils?.removeNullOrUndefined(object)).toString();
        axios
            .get(`/api/category${qs}`)
            .then(async (response) => {
                let data = response.data;
                if (data?.success && Array.isArray(data?.data)) {
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

    async function getParentCategories() {
        await setLoading(true);
        axios
            .get(`/api/category?parent_category_id=-1`)
            .then(async (response) => {
                let data = response.data;
                if (data?.success && Array.isArray(data?.data)) {
                    let parents = data?.data?.map((item) => {
                        let newItem = dataUtils?.snakeToCamelCase(item);
                        return {
                            id: newItem?._id,
                            label: newItem?.categoryName
                        };
                    });
                    console.log(`parent`, parent)
                    setParentCategories(parents);
                }
                await setLoading(false);
                return data.dataSource;
            })
            .catch((err) => {
                setParentCategories([]);
                setLoading(false);
            });
    }

    useEffect(() => {
        getDataSource(searchValues);
        getParentCategories(searchValues);
    }, [JSON.stringify(pageStatus), JSON.stringify(searchValues)]);

    async function onCreate(values) {
        values.password = constants.AUTH.P_DEFAULT;
        await axios
            .post('/api/user', values)
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
    }

    async function onUpdate(values) {
        await axios
            .put('/')
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
    }

    async function onDelete(values) {
        console.log(`Values`, values);
        await axios
            .delete(`/api/user?user_id=${values?._id}`)
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

    function handleChangeParentCategory(value) {
        console.log(value);
    }

    return (
        <>
            <Breadcrumbs values={['Quản trị hệ thống', 'Quản lý danh mục']} />
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
                            handleChangeParentCategory={handleChangeParentCategory}
                            parentCategories={parentCategories }
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
                    <CreateAndUpdate pageStatus={pageStatus} setPageStatus={setPageStatus} onSubmit={onCreate} />
                ) : (
                    ''
                )}
                {pageStatus.status === constants.PAGE_STATUS.UPDATE.status ? (
                    <CreateAndUpdate pageStatus={pageStatus} setPageStatus={setPageStatus} onSubmit={onUpdate} />
                ) : (
                    ''
                )}
            </section>
        </>
    );
}
