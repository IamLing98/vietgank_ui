import { Box, InputLabel, Switch, Typography, MenuItem, Select, Chip, Grid } from '@mui/material';
import React, { useContext, useState } from 'react';
import { blue, grey } from '@mui/material/colors';
import { debugLog } from 'utils/tools';
import PropTypes from 'prop-types';
import { ChapterContext } from './ChapterDetail';

const AttachementSwitch = (props) => {
    const context = useContext(ChapterContext);

    const { formData, readOnly, setFormData } = context;

    const [attachResources, setAttachResources] = useState(formData.attachments || []);
    const [hasAttachment, setHasAttachment] = useState(formData.attachments?.length > 0);
    const resources = ['github项目', '下载文档', '在线运行代码', '云主机'];

    function getStyles(resource) {
        return {
            fontWeight: attachResources.indexOf(resource) === -1 ? 400 : 700,
            color: attachResources.indexOf(resource) === -1 ? grey[600] : blue[600]
        };
    }

    const handleChange = (data) => {
        setFormData({
            ...formData,
            attachments: data
        });
    };

    const selectChange = (e) => {
        const { value } = e.target;
        new Promise((resolve, reject) => {
            setAttachResources(typeof value === 'string' ? value.split(',') : value);
            resolve(value);
        }).then((resource) => {
            setTimeout(() => handleChange(resource), 500);
        });
    };

    const handleSwitchChange = (e) => {
        setHasAttachment(e.target.checked);
        if (!e.target.checked) handleChange([]);
    };

    return (
        <Grid container spacing={1.2}>
            <Grid item xs={12} md={6}>
                <Box display="flex" gap={2} alignItems="baseline" flexDirection="column">
                    <InputLabel>是否包含课件附件</InputLabel>
                    <Typography variant="body2" color="secondary">
                        附件以URL形式写在描述中，此开关只用做判断的标记
                    </Typography>
                </Box>
                <Switch checked={hasAttachment} disabled={readOnly} onChange={handleSwitchChange} />
            </Grid>
            {hasAttachment && (
                <Grid item xs={12} md={6} sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
                    <InputLabel>多选资源标记</InputLabel>
                    <Select
                        fullWidth
                        onChange={selectChange}
                        multiple
                        value={typeof attachResources === 'string' ? attachResources.split(',') : attachResources}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip variant="outlined" sx={{ borderRadius: 20 }} key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        readOnly={readOnly}
                    >
                        {resources.map((resource, index) => (
                            <MenuItem key={index} value={resource} style={getStyles(resource)}>
                                {resource}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            )}
        </Grid>
    );
};

export default AttachementSwitch;
