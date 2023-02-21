import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useCourse } from '../../../hooks';
import PropTypes from 'prop-types';

const CourseSelect = ({ value = 0, readOnly, handleChange }) => {
    const { data: courses, isLoading } = useCourse();

    if (isLoading) return <Box>加载中Oo.</Box>;

    return (
        <Box>
            <InputLabel>隶属课程</InputLabel>

            <Select
                style={{ marginTop: '10px' }}
                fullWidth
                name="courseId"
                displayEmpty
                value={value}
                labelId="status-label"
                readOnly={readOnly}
                onChange={handleChange}
            >
                <MenuItem value={0} disabled>
                    请选择课程
                </MenuItem>
                {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                        {course.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};
CourseSelect.propTypes = {
    value: PropTypes.number,
    readOnly: PropTypes.bool,
    handleChange: PropTypes.func
};

export default CourseSelect;
