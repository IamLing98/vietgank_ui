/* eslint-disable react/prop-types */
import React, { useState, useMemo, memo, useRef, useCallback } from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

import { Avatar, Container, IconButton, Box, Button } from '@mui/material';
import { DeleteOutlined, EyeOutlined, VideoCameraAddOutlined } from '@ant-design/icons';

import AG_GRID_LOCALE_ZH_CN from '../../../components/ag-gird/locale.zh_CN';
import CourseFormDialog from '../components/CourseFormDialog';
// // eslint-disable-next-line

import { useCategory, useCourse } from '../../../hooks';
import { red, green } from '@mui/material/colors';
import { MomentUtil } from '../../../utils/tools';

const AgCellAvatar = (props) => {
    return <Avatar style={{ borderRadius: '6px' }} src={props.value}></Avatar>;
};

const OperatorCell = (props) => {
    const { value, column, node } = props;

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const viewCourse = () => {
        setOpen(true);
    };

    return (
        <Container style={{ marginLeft: '-40px' }}>
            <IconButton onClick={viewCourse}>
                <EyeOutlined />
            </IconButton>
            <IconButton color="error">
                <DeleteOutlined />
            </IconButton>
            {open && <CourseFormDialog node={node} open={open} mode="view" handleClose={handleClose} />}
        </Container>
    );
};

const IsShopRenderer = (props) => {
    const { value, column, node } = props;

    return (
        <Box height="100%" display="flex" alignItems="center">
            <Box style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: value ? green[600] : red[200] }}>
                {/* {value ? '上线中' : '下线中'} */}
            </Box>
        </Box>
    );
};

const CourseListAGTable = () => {
    const { data: courseData, isLoading: courseLoading, error: courseError } = useCourse();

    const { data: categoryData, isLoading: categoryLoading, error: categoryError } = useCategory();

    const [open, setOpen] = useState(false);

    const covertStringToDateAndCompare = useCallback((valueA, valueB) => {
        let dateA = new Date(valueA),
            dateB = new Date(valueB);

        if (dateA == dateB) return 0;
        return dateA > dateB ? 1 : -1;
    }, []);

    const addNewCourse = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const agGridRef = useRef();
    const columnDefs = useMemo(
        () => [
            {
                field: 'operation',
                headerName: '操作',
                cellRenderer: memo(OperatorCell),
                pinned: 'left',
                sortable: false,
                filter: false,
                width: 90
            },
            {
                field: 'is_shop',
                headerName: '上线',
                // cellRenderer: 'switchRenderer',
                cellRenderer: memo(IsShopRenderer),

                pinned: 'left',
                sortable: false,
                filter: false,
                width: 80
            },
            { field: 'name', headerName: '课程名称', pinned: 'left' },
            // { field: 'id', headerName: '课程ID' },
            { field: 'image', headerName: '图片', cellRenderer: memo(AgCellAvatar) },
            { field: 'categoryName', headerName: '分类' },
            { field: 'description', headerName: '描述' },
            { field: 'mark', headerName: '标记' },
            { field: 'teacher', headerName: '教师' },
            { field: 'totall_classes', headerName: '课程章节数', filter: 'agNumberColumnFilter' },
            { field: 'totall_study', headerName: '学生总数', filter: 'agNumberColumnFilter' },
            { field: 'totall_view', headerName: '观看次数', filter: 'agNumberColumnFilter' },
            {
                field: 'insert_time',
                headerName: '插入时间',
                comparator: (valueA, valueB) => covertStringToDateAndCompare(valueA, valueB),
                filter: false,
                cellRenderer: memo(MomentUtil)
            },
            {
                field: 'update_time',
                headerName: '更新时间',
                filter: false,
                comparator: (valueA, valueB) => covertStringToDateAndCompare(valueA, valueB),
                cellRenderer: memo(MomentUtil)
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const defaultColDefs = useMemo(
        () => ({
            editable: false,
            sortable: true,
            filter: true,
            resizable: true,
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 300
            }
        }),
        []
    );

    if (courseLoading || categoryLoading) return <div>Loading ...</div>;

    const courseWithCategory = courseData.map((course) => {
        const courseCategory = categoryData.filter((category) => category.id === course.categoryId);

        return { ...course, categoryName: courseCategory[0]?.name || '' };
    });

    return (
        <Box>
            <Box>
                <Button onClick={addNewCourse} variant="contained" startIcon={<VideoCameraAddOutlined />}>
                    添加课程
                </Button>
                <CourseFormDialog mode="add" open={open} handleClose={handleClose} />
            </Box>
            <Box className="ag-theme-material" style={{ height: 'calc(100vh - 230px)' }}>
                <AgGridReact
                    ref={agGridRef}
                    rowData={courseWithCategory}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDefs}
                    localeText={AG_GRID_LOCALE_ZH_CN}
                    animateRows
                    // getRowHeight={(param) => 45}

                    // editType="fullRow"
                    // onCellValueChanged={patchData}
                />
            </Box>
        </Box>
    );
};

export default CourseListAGTable;
