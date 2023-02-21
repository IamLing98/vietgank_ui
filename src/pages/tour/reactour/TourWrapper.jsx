import React from 'react';
import KanBan from 'pages/kanban/KanBan';
import { Box, Button } from '@mui/material';
import { useTour } from '@reactour/tour';

// eslint-disable-next-line react/prop-types
const TourWrapper = () => {
    const { setIsOpen } = useTour();
    return (
        <Box>
            <Button size="small" color="warning" variant="contained" onClick={() => setIsOpen(true)}>
                Start tour
            </Button>
            <Box>
                <KanBan />
            </Box>
        </Box>
    );
};

export default TourWrapper;
