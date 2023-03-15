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

    const [dataSource, setDataSource] = useState({
        data: [],
        total: 0
    });

    const [pageStatus, setPageStatus] = useState({ ...constants.PAGE_STATUS.LIST });

    const [categories, setCategories] = useState([])

    const [orderStatuses, setOrderStatuses] = useState({})

    const [options, setOptions] = useState({})

    const [searchValues, setSearchValues] = useState({
        page: 0,
        size: 10,
        is_deleted: 'false',
        'product.product_type_code': [],
        'product.product_info.tags': [],
        status: []
    });

    async function getDataSource(searchValues) {
        await setLoading(true);
        let object = { ...searchValues };
        object.page = object.page + 1;
        const qs = '?' + new URLSearchParams(dataUtils?.removeNullOrUndefined(object)).toString();
        axios
            .get(`/api/order/product${qs}`)
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
        if (callback) callback();
    }

    async function onUpdate(values, callback) {
        
        callback && callback()
    }

    async function onDelete(values) {
        console.log(`Values`, values);
        // await axios
        //     .delete(`/api/booking?product_id=${values?._id}`)
        //     .then((response) => {
        //         if (response?.data?.success) {
        //             toast.info('Xóa thành công');
        //             setPageStatus(constants.PAGE_STATUS.LIST);
        //         } else {
        //             toast.error('Xóa thất bại');
        //         }
        //     })
        //     .catch((err) => {
        //         toast.error('Xóa thất bại');
        //     });
        await setPageStatus(constants.PAGE_STATUS.LIST);
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
    }

    const fetchOrderStatuses = async () => {
        axios.get('/api/category/tree-view?category_code=ORDER_STATUS')
            .then((response) => {
                let children = response.data.data[0]?.children;
                setOrderStatuses(children.reduce((res, currentItem) => {
                    res[currentItem.category_code] = currentItem.category_name
                    return res
                }, {}))
            })
            .catch((error) => {
                console.error(`Errorr: `, error);
                setCategories([]);
            });
    }

    useEffect(() => {
        (async () => {
            fetchCategories();
            fetchOrderStatuses();
        })()
    }, [JSON.stringify(pageStatus)]);

    return (
        <>
            <Breadcrumbs values={['Quản lý', 'Quản lý đơn hàng']} />
            <section className="  mx-auto">
                {pageStatus.status === constants.PAGE_STATUS.LIST.status || pageStatus.status === constants.PAGE_STATUS.DELETE.status ? (
                    <>
                        <List
                            loading={loading}
                            setPageStatus={setPageStatus}
                            dataSource={dataSource}
                            setSearchValues={setSearchValues}
                            searchValues={searchValues}
                            categories={categories}
                            options={options}
                            orderStatuses={orderStatuses}
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
                    <CreateAndUpdate pageStatus={pageStatus}
                        options={options} 
                        setPageStatus={setPageStatus} 
                        categories={categories} 
                        onSubmit={onCreate}
                        orderStatuses={orderStatuses} 
                    />
                ) : (
                    ''
                )}
                {pageStatus.status === constants.PAGE_STATUS.UPDATE.status ? (
                    <CreateAndUpdate 
                        pageStatus={pageStatus} 
                        options={options} 
                        setPageStatus={setPageStatus} 
                        onSubmit={onUpdate} 
                        categories={categories}
                        orderStatuses={orderStatuses}     
                    />
                ) : (
                    ''
                )}
            </section>
        </>
    );
}
