import { Box } from '@mui/material';
import slate from '@react-page/plugins-slate';
import html5video from '@react-page/plugins-html5-video';
import divider from '@react-page/plugins-divider';
import React from 'react';
import { debugLog } from '../../utils/tools';
import PropTypes from 'prop-types';

const defaultSlate = slate();

const cellLayoutPluginWIthVideo = {
    // eslint-disable-next-line react/prop-types
    Renderer: ({ children }) => {
        return (
            <Box display="flex" flexDirection="row" alignItems="center" gap="24px">
                {Array.isArray(children) ? (
                    // eslint-disable-next-line react/prop-types
                    children.map((child, index) => (
                        <Box key={index} className="video-salte-plugin">
                            {child}
                        </Box>
                    ))
                ) : (
                    <Box>{children}</Box>
                )}
            </Box>
        );
    },
    createInitialChildren: () => {
        return [[{ plugin: html5video }], [{ plugin: divider }], [{ plugin: defaultSlate }]];
    },

    id: 'custom-layout-with-video-plugin',
    title: '自定义课程章节布局插件',
    description: '此插件带有一个html5video和一个用于保存描述的Slate插件',
    version: 1
};

cellLayoutPluginWIthVideo.propTypes = {
    data: PropTypes.object,
    children: PropTypes.element
};

export default cellLayoutPluginWIthVideo;
