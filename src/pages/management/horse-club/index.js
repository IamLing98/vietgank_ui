import Breadcrumbs from 'components/Breadcrum';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Container, Grid, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import TabPages from './TabPages'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'white' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

export default function HorseClub() {
    function Header() {
        return (
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={4}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>xs=8</Item>
                </Grid>
            </Grid>
        );
    }
 
    return (
        <>
            <Breadcrumbs values={['Quản lý', 'Horse Club']} />
            <div className="py-3">
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">Quản lý Horse Club</h2> 
                </div>
            </div>
            <Container className='container-max' maxWidth={false}> 
                <TabPages />
            </Container>
        </>
    );
}
