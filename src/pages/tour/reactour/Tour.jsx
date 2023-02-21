import React from 'react';
import { Box } from '@mui/material';
import { TourProvider } from '@reactour/tour';
import steps from './steps';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import TourWrapper from './TourWrapper';

const Tour = () => {
    const disableBody = (target) => disableBodyScroll(target);
    const enableBody = (target) => enableBodyScroll(target);

    return (
        <TourProvider steps={steps} afterOpen={disableBody} beforeClose={enableBody}>
            <Box>
                <TourWrapper />
            </Box>
        </TourProvider>
    );
};

export default Tour;
