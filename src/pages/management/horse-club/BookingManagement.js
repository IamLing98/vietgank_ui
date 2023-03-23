import { Autocomplete, Grid, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import constants from 'utils/constants'
import List from './List'
import axios from 'axios'
import dataUtils from 'utils/dataUtils'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import { TextField, Popover, InputAdornment, IconButton } from '@material-ui/core';
// import Date from '@mui/material-ui/icons/Date';
// import { withStyles } from '@material-ui/styles';
import moment from 'moment';
import { DateRange, DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; //

import TableList from '../../../components/TableList';
import DeleteConfirm from './booking/DeleteConfirm'
import CreateAndUpdate from './booking/CreateAndUpdate'

export default function ({}) {
    const [loading, setLoading] = useState(false)

    const [columns, setColumns] = useState([])

    const [dataSource, setDataSource] = useState({
        data: [],
        total: 0
    })

    const [pageStatus, setPageStatus] = useState({...constants.PAGE_STATUS.LIST})

    const [searchValues, setSearchValues] = useState({
        page: 0,
        size: 10,
        is_deleted: 'false'
    });

    const [bookings, setBookings] = useState([])
    const [services, setServices] = useState([])
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [selectedService, setSelectedService] = useState(null)

    const headCells = [
        {
            id: 'booking_name',
            numeric: false,
            disablePadding: true,
            label: 'Chi nhánh',
            render: (value, record, index) => {
                return (
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap" style={{
                        maxWidth: '200px'
                    }}>
                        {record?.bookings?.bookingInfo?.name}
                    </p>
                );
            }
        },
        {
            id: 'service_name',
            numeric: false,
            disablePadding: true,
            label: 'Dịch vụ',
            render: (value, record, index) => {
                return (
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap" style={{
                        maxWidth: '200px'
                    }}>
                        {record?.services?.serviceInfo?.name}
                    </p>
                );
            }
        },
        {
            id: 'user_name',
            numeric: false,
            disablePadding: true,
            label: 'User',
            render: (value, record, index) => {
                return (
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap" style={{
                        maxWidth: '200px'
                    }}>
                        {record?.userInfo?.username}
                    </p>
                );
            }
        },
        {
            id: 'time',
            numeric: false,
            disablePadding: true,
            label: 'Thời gian',
            render: (value, record, index) => {
                let date = record?.orderInfo?.bookingTime ? new Date(record.orderInfo.bookingTime) : ''
                return (
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap" style={{
                        maxWidth: '200px'
                    }}>
                        {date ? `${date.toDateString()}-${date.getHours()}:${date.getMinutes()}` : ''}
                    </p>
                );
            }
        },
        {
            id: 'persons',
            numeric: false,
            disablePadding: true,
            label: 'Số người',
            render: (value, record, index) => {
                return (
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap" style={{
                        maxWidth: '200px'
                    }}>
                        {record?.orderInfo?.persons ? record?.orderInfo?.persons : 1}
                    </p>
                );
            }
        },
        {
            id: 'tables',
            numeric: false,
            disablePadding: true,
            label: 'Số bàn',
            render: (value, record, index) => {
                return (
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap" style={{
                        maxWidth: '200px'
                    }}>
                        {record?.orderInfo?.tableIndexes?.map(item => item + 1).toString()}
                    </p>
                );
            }
        }
    ]

    async function fetchBookings() {
        axios
            .get('/api/booking?booking_type_code=HORSE_CLUB')
            .then((response) => {
                setBookings(dataUtils.snakeToCamelCaseWithArray(response.data?.data.map(item => ({
                    _id: item._id,
                    label: item.booking_info?.name
                })) || []))
            })
            .catch((error) => {
                console.error(`Errorr: `, error);
                setSizes([]);
            });
    }

    async function fetchServices() {
        axios
            .get('/api/horse-service')
            .then((response) => {
                setServices(dataUtils.snakeToCamelCaseWithArray(response.data?.data.map(item => ({
                    _id: item._id,
                    label: item.service_info?.name
                })) || []))
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
            .get(`/api/order/booking/horse-club${qs}`)
            .then(async (response) => {
                let data = response.data;
                if (data?.success) {
                    setDataSource({
                        data: data?.data?.map((item) => {
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
        getDataSource(searchValues);
    }, [JSON.stringify(pageStatus), JSON.stringify(searchValues)]);

    useEffect(() => {
        (async () => {
            await fetchServices()
            await fetchBookings()
        })()
    }, [])

    const handleSearch = () => {
        let res = {}
        if (selectedBooking) {
            res['booking.booking_id'] = selectedBooking._id
        }
        if (selectedService) {
            res['booking.service_id'] = selectedService._id
        }
        if (Object.keys(res).length) {
            setSearchValues({
                ...searchValues,
                ...res
            })
        } else {
            setSearchValues({
                page: 0,
                size: 10,
                is_deleted: 'false'
            })
        }
    }

    function Header() {
        return (
            <>
                <Grid container spacing={2} marginBottom={4}>
                    <Grid item xs={3}>
                        <Box>
                            <InputLabel id="booking" className="field-label">
                                Chi nhánh
                            </InputLabel>
                            <FormControl hiddenLabel fullWidth>
                                <Autocomplete
                                    disablePortal
                                    id="booking"
                                    options={bookings}
                                    sx={{ width: 300 }}
                                    value={selectedBooking}
                                    onChange={(event, value) => {
                                        setSelectedBooking(value)
                                    }}
                                    renderInput={(params) => <TextField className="autocomplete-custom" {...params} variant="outlined" />}
                                />
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box>
                            <InputLabel id="service" className="field-label">
                                Dịch vụ
                            </InputLabel>
                            <FormControl hiddenLabel fullWidth>
                                <Autocomplete
                                    disablePortal
                                    id="service"
                                    options={services}
                                    sx={{ width: 300 }}
                                    value={selectedService}
                                    onChange={(event, value) => {
                                        setSelectedService(value)
                                    }}
                                    className="autocomplete-custom"
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormControl>
                        </Box>
                    </Grid>
                    {/* <Grid item xs={2}>
                        <Box>
                            <InputLabel id="demo-simple-select-label" className="field-label">
                                Dịch vụ
                            </InputLabel>
                            <FormControl hiddenLabel fullWidth>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    className="autocomplete-custom"
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormControl>
                        </Box>
                    </Grid> */}
                    {/* <Grid item xs={2}>
                        <Box>
                            <InputLabel id="demo-simple-select-label" className="field-label">
                                Ngày đặt
                            </InputLabel>
                            <FormControl hiddenLabel fullWidth>
                                <TextField onClick={handleClick} className="input-custom" variant="outlined" />
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorPosition={{ top: 400, left: 800 }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center'
                                    }}
                                >
                                    <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
                                </Popover>
                            </FormControl>
                        </Box>
                    </Grid> */}
                    {/* <Grid item xs={2}>
                        <Box>
                            <InputLabel id="demo-simple-select-label" className="field-label">
                                Trạng thái
                            </InputLabel>
                            <FormControl hiddenLabel fullWidth>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    className="autocomplete-custom"
                                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                                />
                            </FormControl>
                        </Box>
                    </Grid> */}
                    <Grid item xs={2}>
                        <Button variant="contained" className="search-button" onClick={handleSearch}>
                            Tìm kiếm
                        </Button>
                    </Grid>
                </Grid>
            </>
        );
    }

    const onDelete = async () => {

    }

    const onUpdate = async () => {

    }

    const onCreate = async () => {

    }

    return (
        <>
            <Header />
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
    );
}

