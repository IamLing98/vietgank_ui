/**
 * Mock data: https://dummyjson.com/products
 */

import React from 'react';
import { Grid, Box } from '@mui/material';
import StyledMain from '../../../StyledMain';
import Filter from './component/Filter';
import Main from './component/Main';

import { useSelector } from 'react-redux';

const ProductList = ({setPageStatus, categories}) => {
    const filterDrawer = useSelector((state) => state.isotope.filterDrawer);

    return (
        <StyledMain>
            <Box display="flex" flexDirection="row" gap={4} sx={{ width: '100%' }}>
                <Grid container spacing={3}>
                    {filterDrawer && (
                        <div style={{ paddingTop: '24px' }}
                            item
                            sx={{
                                display: {
                                    xs: 'none',
                                    sm: 'block'
                                }
                            }}
                        >
                            <Filter categories={categories} />
                        </div>
                    )}
                    <Grid item zeroMinWidth xs>
                        <Main setPageStatus={setPageStatus} />
                    </Grid>
                </Grid>
            </Box>
        </StyledMain>
    );
};

export default ProductList;
