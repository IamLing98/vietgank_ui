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
        size: 100
    });

    async function getDataSource(searchValues) {
        await setLoading(true); 
        let object = { ...searchValues };
        object.page = object.page + 1;
        const qs = '?' + new URLSearchParams(dataUtils?.removeNullOrUndefined(object)).toString();
        await   axios
            .get(`/api/setting${qs}`)
            .then((response) => {
                let data = response.data;
                if (data?.success) {
                    setDataSource({
                        data: data?.data?.map((item) => dataUtils?.snakeToCamelCase(item)),
                        total: data?.meta?.total
                    });
                }
                return data.dataSource;
            })
            .catch((err) => {
                setDataSource({data:[], total:0});
            });
        await setLoading(false);
    }

    useEffect(() => {
        getDataSource(searchValues);
    }, [JSON.stringify(pageStatus), JSON.stringify(searchValues)]); 

    async function onUpdate(values) {
        console.log(`Values: `, values)
        await axios
            .put(`/api/setting/${values?.key}`, values)
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

    return (
        <>
            <Breadcrumbs values={['Quản trị hệ thống', 'Cài đặt']} />
            <section className="  mx-auto">
                {pageStatus.status === constants.PAGE_STATUS.LIST.status || pageStatus.status === constants.PAGE_STATUS.DELETE.status ? (
                    <>
                        <List
                            setPageStatus={setPageStatus}
                            columns={columns}
                            dataSource={dataSource}
                            setSearchValues={setSearchValues}
                            searchValues={searchValues}
                            loading={loading}
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
                {pageStatus.status === constants.PAGE_STATUS.UPDATE.status ? (
                    <CreateAndUpdate pageStatus={pageStatus} setPageStatus={setPageStatus} onSubmit={onUpdate} />
                ) : (
                    ''
                )}
            </section>
        </>
    );
}
