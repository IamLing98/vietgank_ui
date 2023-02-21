import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrum';
import data from './data';

import axios from 'axios';
import List from './List';
import constants from 'utils/constants';

import CreateAndUpdate from './CreateAndUpdate';

export default function BasicBreadcrumbs() {
    const [columns, setColumns] = React.useState(data.columns);

    const [dataSource, setDataSource] = useState([]);

    const [pageStatus, setPageStatus] = useState({ ...constants.PAGE_STATUS.LIST });

    function getDataSource(searchValues) {
        axios.get('/').then((response) => {
            let data = response.data;
            setDataSource(data.dataSource);
            return data.dataSource;
        });
    }

    useEffect(() => {
        getDataSource();
    }, []);

    return (
        <>
            <Breadcrumbs values={['Quản trị hệ thống', 'Quản lý tài khoản']} />
            <section className="  mx-auto">
                {pageStatus.status === constants.PAGE_STATUS.LIST.status ? (
                    <List setPageStatus={setPageStatus} columns={columns} dataSource={dataSource} />
                ) : (
                    ''
                )}
                {pageStatus.status === constants.PAGE_STATUS.CREATE.status ? <CreateAndUpdate setPageStatus={setPageStatus} /> : ''}
                {pageStatus.status === constants.PAGE_STATUS.UPDATE.status ? <List columns={columns} dataSource={dataSource} /> : ''}
                {pageStatus.status === constants.PAGE_STATUS.DETAIL.status ? <List columns={columns} dataSource={dataSource} /> : ''}
            </section>
        </>
    );
}
