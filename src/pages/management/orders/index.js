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

    const [categories, setCategories] = useState([]);

    const [options, setOptions] = useState({});

    const [sizes, setSizes] = useState([])

    const [searchValues, setSearchValues] = useState({
        page: 0,
        size: 10,
        is_deleted: 'false',
        serviceType: 'SHOPPING',
        parent_category_code: [],
        tags: []
    });

    async function getDataSource(searchValues) {
        await setLoading(true);
        // console.log(searchValues);
        // let object = { ...searchValues };
        // object.page = object.page + 1;
        const qs = '?'
        //  + new URLSearchParams(dataUtils?.removeNullOrUndefined(object)).toString();
        axios
            .get(`/api/product${qs}`)
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

    const fetchCategories = async () => {
        axios
            .get('/api/category/tree-view?category_code=LOAI_QUAN_AO')
            .then((response) => {
                let children = response.data.data[0]?.children; 
                setCategories(children);
                let newOptions = {};
                for (let i = 0; i < children?.length; i++) {
                    let child = children[i];
                    newOptions[child?.category_code] = child?.children;
                } 
                setOptions({ ...newOptions });
            })
            .catch((error) => {
                console.error(`Errorr: `, error);
                setCategories([]);
            });
    };

    const fetchSize = async () => {
        axios
            .get('/api/category/tree-view?category_code=SIZE')
            .then((response) => { 
                let children = response.data.data[0]?.children;
                setSizes(children);
            })
            .catch((error) => {
                console.error(`Errorr: `, error);
                setSizes([]);
            });
    };

    useEffect(() => {
        getDataSource(searchValues); 
    }, [JSON.stringify(pageStatus), JSON.stringify(searchValues)]);

    useEffect(() => {
        fetchCategories();
        fetchSize()
    }, [JSON.stringify(pageStatus)]);

    async function onCreate(values) { 
        values.service_category_code = 'LOAI_QUAN_AO'
        values.service_category_name = 'LOẠI QUẦN ÁO'

        await axios
            .post('/api/product', values)
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
        await axios
            .delete(`/api/product?product_id=${values?._id}`)
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

    return (
        <>
            <Breadcrumbs values={['Quản lý', 'Quản lý sản phẩm']} />
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
                            options={options}
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
                    <CreateAndUpdate
                        pageStatus={pageStatus}
                        setPageStatus={setPageStatus}
                        onSubmit={onCreate}
                        options={options}
                        categories={categories} 
                        sizes={sizes}
                    />
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