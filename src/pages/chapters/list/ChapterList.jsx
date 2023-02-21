/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, memo, useMemo, useRef, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import AG_GRID_LOCALE_ZH_CN from '../../../components/ag-gird/locale.zh_CN';

import { debounce, debugLog, MomentUtil } from '../../../utils/tools';
import { useChapter, useCourse } from '../../../hooks';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { Box, Button, Divider, Drawer, Grid, Typography, Container } from '@mui/material';
import ChapterDetail from '../components/ChapterDetail';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import CourseSelect from '../components/CourseSelect';
import PropTypes from 'prop-types';
import SimpleBarScroll from 'components/third-party/SimpleBar';

const ChapterWithOrder = (props) => {
    const { rowIndex, value } = props;
    // debugLog(props);
    return (
        <Box height={'100%'} display="flex" justifyContent="flex-start" alignItems="center">
            <Typography variant="body1">
                第{rowIndex + 1}章: {value}
            </Typography>
        </Box>
    );
};

ChapterWithOrder.propTypes = {
    rowIndex: PropTypes.number,
    value: PropTypes.string
};

const ChapterListAGTable = () => {
    const [touched, setTouched] = useState(false);

    const { data: courseData, isLoading: courseLoading } = useCourse();

    const [courseId, setCourseId] = useState();

    const { data, isLoading: chapterLoading } = useChapter(null, 'orderIndex', 'asc');

    const chapterData = data?.filter((chapter) => chapter.courseId === courseId);

    const agGridRef = useRef();
    const queryClient = useQueryClient();

    const filterChapter = (e) => {
        setCourseId(e.target.value);
    };

    const onRowDragMove = (e) => {
        const source = e.node,
            target = e.overNode;
        if (source == target) return;
        setTouched(true);
    };

    const updateGrid = debounce(() => queryClient.invalidateQueries({ queryKey: ['fetch-chapters'] }), 300);

    const mutation = useMutation({
        mutationFn: (data) => {
            const { id } = data;
            const request = axios.patch(`${process.env.REACT_APP_API_SERVER}/chapters/${id}`, data);
            return request;
        },
        onSuccess: (data, variables) => {
            // setPatching(false);
            updateGrid();
        }
    });

    const handleDragOrdering = () => {
        const ref = agGridRef.current;
        const dataArray = [];
        ref.api.forEachNode((node) => {
            const data = node.data;
            data['orderIndex'] = node.rowIndex;
            dataArray.push(data);
        });
        Promise.all(dataArray.map((d) => mutation.mutate(d)));
        setTouched(false);
    };

    const addNewChapter = () => {};

    const columnDefs = useMemo(
        () => [
            {
                field: 'link',
                headerName: '点击查看',
                cellRenderer: memo(ChapterDetail),
                sortable: false,
                rowDrag: true,
                filter: false
            },
            {
                field: 'name',
                headerName: '章节',
                cellRenderer: memo(ChapterWithOrder),
                sortable: true,
                editable: true,
                filter: true,
                width: 450
            },
            {
                field: 'mark',
                headerName: '备注',
                sortable: false,
                filter: false
            },
            {
                field: 'insert_time',
                headerName: '插入时间',
                cellRenderer: memo(MomentUtil),
                sortable: false,
                filter: false
            },

            {
                field: 'update_time',
                headerName: '更新时间',
                cellRenderer: memo(MomentUtil),
                sortable: false,
                filter: false
            }
        ],
        []
    );

    const defaultColDefs = useMemo(
        () => ({
            filter: true,
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 300
            }
        }),
        []
    );

    if (chapterLoading || courseLoading) return <div>加载中...</div>;

    return (
        <Box display="flex" flexDirection="column" gap={1.5}>
            <SimpleBarScroll sx={{ maxHeight: '90vh' }}>
                <Box>
                    <Button onClick={addNewChapter} size="small" variant="contained">
                        添加课程章节
                    </Button>
                </Box>
                <CourseSelect handleChange={filterChapter} readOnly={false} value={courseId} />
                <Box mt={2} className="ag-theme-material" style={{ height: 'calc(80vh - 230px)' }}>
                    <AgGridReact
                        ref={agGridRef}
                        rowData={chapterData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDefs}
                        localeText={AG_GRID_LOCALE_ZH_CN}
                        animateRows
                        rowDragManaged
                        onRowDragMove={onRowDragMove}
                    />
                </Box>
                <Box>
                    {touched && (
                        <Button disabled={!touched} variant="contained" onClick={handleDragOrdering}>
                            确认章节排序
                        </Button>
                    )}
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                </Box>
            </SimpleBarScroll>
        </Box>
    );
};

export default ChapterListAGTable;
