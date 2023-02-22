import React, { useEffect, useState } from 'react';
import constants from 'utils/constants';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment';

import Loading from '../../../components/Loading';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label?.toUpperCase()}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const List = ({ columns, dataSource, setPageStatus, searchValues, setSearchValues, loading }) => {
    useEffect(() => {}, [JSON.stringify(columns)]);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(true);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        console.log(`Event: `, event?.target?.checked);
        if (event.target.checked) {
            const newSelected = dataSource?.data?.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, _id) => {
        console.log('Id: ', _id);
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setSearchValues({ ...searchValues, page: newPage });
    };

    const handleChangeRowsPerPage = (event) => {
        setSearchValues({ ...searchValues, page: 0, size: parseInt(event.target.value, 10) });
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = searchValues?.page > 0 ? Math.max(0, (1 + searchValues?.page) * searchValues?.size - dataSource?.total) : 0;

    const headCells = [
        {
            id: 'username',
            numeric: false,
            disablePadding: true,
            label: 'cấu hình',
            render: (value, record, index) => {
                return <h3>{value}</h3>;
            }
        },
        {
            id: 'role',
            numeric: false,
            disablePadding: true,
            label: 'giá trị',
            render: (value, record, index) => {
                if (value === 'super_admin') {
                    return (
                        <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-warning-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-warning-800">
                            Quản trị viên
                        </span>
                    );
                } else
                    return (
                        <span class="inline-block whitespace-nowrap rounded-[0.27rem] bg-info-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-info-800">
                            Nhân viên
                        </span>
                    );
            }
        },
        {
            id: 'phoneNumber',
            numeric: false,
            disablePadding: true,
            label: 'Ngày cập nhật',
            render: (value, record, index) => {
                return <h3>{value ? moment(value)?.format('DD/MM/YYYY HH:mm:ss') : ''}</h3>;
            }
        },
        {
            id: 'phoneNumber',
            numeric: false,
            disablePadding: true,
            label: 'Thao tác',
            render: (value, record, index) => {
                return (
                    <div className="flex gap-3 ">
                        <Tooltip title="Khôi phục mật khẩu" placement="top">
                            <button className="flex items-center justify-center w-1/2 px-4 py-2 text-sm tracking-wide text-black transition-colors duration-200 bg-cyan-100 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-cyan-300 dark:hover:bg-cyan-300 dark:bg-cyan-300">
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
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </svg>
                            </button>
                        </Tooltip>
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
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </button>
                        </Tooltip>
                    </div>
                );
            }
        }
    ];

    return (
        <>
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="py-3">
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Danh sách cài đặt</h2>
                    </div>
                </div>
            </div>
            {/* <TableData /> */}

            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={selected.length}
                                headCells={headCells}
                            />
                            {loading ? (
                                <Loading />
                            ) : (
                                <TableBody>
                                    {stableSort(dataSource?.data, getComparator(order, orderBy))
                                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row._id);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row._id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId
                                                            }}
                                                            onChange={(event) => handleClick(event, row._id)}
                                                        />
                                                    </TableCell>

                                                    {headCells?.map((cell, cellIndex) => {
                                                        return (
                                                            <TableCell align="left">
                                                                {cell?.render ? cell?.render(row[cell.id], row, index) : row[cell.id]}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell> */}
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
};

export default List;
