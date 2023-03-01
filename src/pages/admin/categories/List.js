import React, { useEffect, useState } from 'react';
import constants from 'utils/constants';

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import moment from 'moment';

import Loading from '../../../components/Loading';
import { Autocomplete, MenuItem, Select, TextField } from '@mui/material';

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
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label?.toUpperCase()}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} bản ghi được chọn
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    Danh sách danh mục
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

const List = ({
    columns,
    dataSource,
    setPageStatus,
    searchValues,
    setSearchValues,
    loading,
    handleChangeParentCategory,
    parentCategories,
    parentId
}) => {
    useEffect(() => {
        console.log(`parentCategories`, parentCategories);
    }, [JSON.stringify(columns)]);

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
            id: 'parent_category_code',
            numeric: false,
            disablePadding: true,
            label: 'loại danh mục',
            render: (value, record, index) => {
                return <h3>{parentCategories?.find((item) => item.categoryCode === value)?.label}</h3>;
            }
        },
        {
            id: 'categoryName',
            numeric: false,
            disablePadding: true,
            label: 'tên danh mục'
        },
        {
            id: 'categoryCode',
            numeric: false,
            disablePadding: true,
            label: 'mã danh mục'
        },
        {
            id: 'created',
            numeric: false,
            disablePadding: true,
            label: 'Ngày tạo',
            render: (value, record, index) => {
                return <h3>{value ? moment(value)?.format('DD/MM/YYYY HH:mm:ss') : ''}</h3>;
            }
        },
        {
            id: 'updated',
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
                        {/* <Tooltip title="Khôi phục mật khẩu" placement="top">
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
                        </Tooltip> */}
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
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
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
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">Danh mục</h2>
                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                            Tổng số bản ghi: {dataSource?.total}
                        </span>
                    </div>
                </div>
                <div className="flex items-center mt-4 gap-x-3">
                    <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3098_154395)">
                                <path
                                    d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                                    stroke="currentColor"
                                    strokeWidth="1.67"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_3098_154395">
                                    <rect width={20} height={20} fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {/* <span>Import</span> */}
                    </button>
                    <button
                        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                        onClick={() => setPageStatus(constants.PAGE_STATUS.CREATE)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Thêm</span>
                    </button>
                </div>
            </div>
            <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="inline-flex overflow-hidden   border-none divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700 ">
                    <div className="flex flex-col py-3 ">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={[{ label: 'Tất cả', id: 'null' }].concat(parentCategories)}
                            sx={{ width: 300 }}
                            getOptionLabel={(option) => option.label}
                            defaultValue={{ label: 'Tất cả', id: 'null' }}
                            onChange={(e, value) => {
                                handleChangeParentCategory(value);
                            }}
                            value={parentId}
                            renderInput={(params) => (
                                <TextField style={{ padding: '5px' }} className="auto_input" {...params} label="Loại danh mục" />
                            )}
                            disableClearable
                        />
                    </div>
                </div>
                <div className="relative flex items-center mt-4 md:mt-0">
                    <span className="absolute">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={(e) => setSearchValues({ ...searchValues, username: e?.target?.value })}
                    />
                </div>
            </div>
            {/* <TableData /> */}

            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
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

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        {' '}
                                        <TableCell colSpan={10}>
                                            <Loading />
                                        </TableCell>{' '}
                                    </TableRow>
                                ) : (
                                    ''
                                )}
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
                                                        <TableCell align="left" key={cellIndex}>
                                                            {cell?.render ? cell?.render(row[cell.id], row, index) : row[cell.id]}
                                                        </TableCell>
                                                    );
                                                })}
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
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30, 50]}
                        component="div"
                        count={dataSource?.total}
                        rowsPerPage={searchValues?.size}
                        page={searchValues?.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelDisplayedRows={({ from, to, count }) => {
                            return 'Hiển thị từ ' + from + ' đến ' + to + ' trong tổng số ' + count + ' bản ghi';
                        }}
                        labelRowsPerPage="Số bản ghi trên trang"
                    />
                </Paper>
            </Box>
        </>
    );
};

export default List;
