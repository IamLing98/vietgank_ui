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
        is_deleted: 'false'
    });

    async function getDataSource(searchValues) {
        await setLoading(true);
        console.log(searchValues);
        let object = { ...searchValues };
        object.page = object.page + 1;
        const qs = '?' + new URLSearchParams(dataUtils?.removeNullOrUndefined(object)).toString();
        axios
            .get(`/api/user${qs}`)
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

    async function onCreate(values) {
        values.password = constants.AUTH.P_DEFAULT;
        await axios
            .post('/api/user', values)
            .then((response) => {
                if (response?.data?.success) {
                    toast.info('Ta??o m????i tha??nh c??ng');
                    setPageStatus(constants.PAGE_STATUS.LIST);
                } else {
                    toast.error('Ta??o m????i th????t ba??i');
                }
            })
            .catch((err) => {
                toast.error('Ta??o m????i th????t ba??i');
            });
    }

    async function onUpdate(values) {
        let id = values._id
        delete values._id
        await axios
            .put(`/api/user/${id}`, values)
            .then((response) => {
                if (response?.data?.success) {
                    toast.info('C????p nh????t tha??nh c??ng');
                    setPageStatus(constants.PAGE_STATUS.LIST);
                } else {
                    toast.error('C????p nh????t th????t ba??i');
                }
            })
            .catch((err) => {
                toast.error('C????p nh????t th????t ba??i');
            });
        await setPageStatus(constants.PAGE_STATUS.LIST);
    }

    async function onDelete(values) {
        console.log(`Values`, values);
        await axios
            .delete(`/api/user?user_id=${values?._id}`)
            .then((response) => {
                if (response?.data?.success) {
                    toast.info('Xo??a tha??nh c??ng');
                    setPageStatus(constants.PAGE_STATUS.LIST);
                } else {
                    toast.error('Xo??a th????t ba??i');
                }
            })
            .catch((err) => {
                toast.error('Xo??a th????t ba??i');
            });
        await setPageStatus(constants.PAGE_STATUS.LIST);
    }

    return (
        <>
            <Breadcrumbs values={['Qua??n tri?? h???? th????ng', 'Qua??n ly?? ta??i khoa??n']} />
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
