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
        console.log(searchValues);
        let object = { ...searchValues };
        object.page = object.page + 1;
        const qs = '?' + new URLSearchParams(dataUtils?.removeNullOrUndefined(object)).toString();
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
                console.log(`CHildrend: `, children);
                setCategories(children);
                let newOptions = {};
                for (let i = 0; i < children?.length; i++) {
                    let child = children[i];
                    newOptions[child?.category_code] = child?.children;
                }
                console.log(`newOptions:`, newOptions);
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

    async function onCreate(values, callback = null) {
        let {newImages, thumbnail, product} = values
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
                if (!product.product_info.images) {
                    product.product_info.images = []
                }
                product.product_info.images.push(...imageList)
            }
            console.log(product.product_info.images)
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
            product.product_info.thumbnail = response.data.secure_url || response.data.url
        }
        values.password = constants.AUTH.P_DEFAULT;
        await axios
            .post('/api/product', {
                ...product
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
                        loading={loading}
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
