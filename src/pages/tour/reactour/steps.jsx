import { Box, Typography, Avatar } from '@mui/material';
import Image from 'mui-image';
import DrawerImage from 'assets/images/drawer.png';

export default [
    {
        selector: '[data-tut="reactour__kanban"]',
        content: `Ok, let's start with the name of the Tour that is about to begin.`
    },
    {
        selector: '[data-tut="reactour__card"]',
        content: `And this is our cool bus...`
    },
    {
        selector: '[data-tut="reactour__add_task"]',
        content: `Keep in mind that you could try and test everithing during the Tour. 
      For example, try selecting the highlighted text…`
    },
    {
        selector: '[data-tut="reactour__more"]',
        content: `Click here to...`
    },
    {
        selector: '[data-tut="reactour__add_column"]',
        content: () => (
            <Box>
                <Typography variant="body1">Add new column</Typography>
            </Box>
        )
    },
    {
        selector: '[data-tut="reactour__profile"]',
        content: () => (
            <Box>
                <Typography>Use profile</Typography>
                <Avatar></Avatar>
            </Box>
        )
    },
    {
        selector: '[data-tut="reactour__drawer"]',
        content: () => <Image src={DrawerImage} />
    }
];
