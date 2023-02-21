import { Box, Typography, Avatar } from '@mui/material';
import Image from 'mui-image';
import DrawerImage from 'assets/images/drawer.png';

export default [
    {
        element: '[data-tut="reactour__kanban"]',
        intro: `Ok, let's start with the name of the Tour that is about to begin.`
    },
    {
        element: '[data-tut="reactour__card"]',
        intro: `<img src="https://i.giphy.com/media/ujUdrdpX7Ok5W/giphy.webp" onerror="this.onerror=null;this.src=\'https://i.giphy.com/ujUdrdpX7Ok5W.gif\';" alt="">`,
        position: 'right'
    },
    {
        element: '[data-tut="reactour__add_task"]',
        intro: '<img style="width: 100%;" src="https://images.unsplash.com/photo-1608096299210-db7e38487075?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" />',
        position: 'top'
    },
    {
        element: '[data-tut="reactour__more"]',
        intro: `Click here to...`,
        position: 'left'
    },
    {
        element: '[data-tut="reactour__add_column"]',
        intro: (
            <Box>
                <Typography variant="body1">Add new column</Typography>
            </Box>
        )
    },
    {
        element: '[data-tut="reactour__profile"]',
        intro: (
            <Box>
                <Typography>Use profile</Typography>
                <Avatar size="small" style={{ width: '40px' }}></Avatar>
            </Box>
        )
    },
    {
        element: '[data-tut="reactour__drawer"]',
        intro: <img width={190} style={{ objectFit: 'cover' }} alt="" src={DrawerImage} />
    }
];
