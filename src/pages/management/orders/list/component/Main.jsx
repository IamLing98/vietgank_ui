/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, Card, Container, CardContent, Button, OutlinedInput, Typography } from '@mui/material';
import { SearchOutlined, FilterOutlined, DownOutlined } from '@ant-design/icons';
import ProductCard from './ProductCard';
import axios, { all } from 'axios';
import { useQuery } from 'react-query';
import { uniq } from 'lodash';
import { setFilterDrawer, setCategories } from 'store/reducers/isotope';
import { useDispatch, useSelector } from 'react-redux';
import Isotope from 'isotope-layout';
import { debounce } from 'utils/tools';
import { Link } from 'react-router-dom';
import constants from 'utils/constants';

const Main = ({setPageStatus}) => {
    const [filter, setFilter] = useState('*');
    const dispatch = useDispatch();
    const isotopeRef = useRef();

    // initialization
    const fetchProducts = async () => {
        return await axios.get('https://dummyjson.com/products?limit=21').then((resp) => resp.data);
    };

    const { data, status } = useQuery(['fetch-products'], fetchProducts);

    if (status.isLoading)
        if (status === 'loading') {
            return <div>Loading...</div>;
        }

    if (status === 'error') {
        return <div>Error</div>;
    }

    const isotope = useSelector((state) => state.isotope);

    //
    const {
        filterDrawer,
        price: { min, max },
        filterFraction: { categories: filters }
    } = isotope;

    var qsRegex;

    const allProducts = data?.products;
    const products = allProducts?.filter((p) => p.price >= min && p.price <= max);
    console.log('[DEBUG]: min: ', min, ' , max: ', max, ' products: ', products);

    useEffect(() => {
        try {
            isotopeRef.current = new Isotope('.filter-container', {
                itemSelector: '.filter-item',
                layoutMode: 'fitRows'
            });
            isotopeRef.current.arrange({ filter: '*' });
        } catch (err) {
            console.log('[DEBUG] err: ', err);
        }
    }, [products]);

    const useProducts = useCallback(() => {
        // const products = allProducts?.filter((p) => p.price > min && p.price < max);
        return products?.map((p) => {
            p.state = '';
            return (
                <Grid item key={p.id} sx={{ width: '300px' }} className={`filter-item ${p.category}`}>
                    <Link
                        to={`/e-commerce/product-detail/${p.id}`}
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <ProductCard product={p} />
                    </Link>
                </Grid>
            );
        });
    }, [min, max, products, filter]); // need re-render when price, filter has been changend.

    const quickSearch = debounce(function (event) {
        qsRegex = new RegExp(event.target.value, 'gi');
        isotopeRef.current.arrange({
            filter: function (itemElem) {
                let hiddenElem = itemElem.querySelector('input[type=hidden i]');
                return qsRegex ? hiddenElem.value.match(qsRegex) : true;
                setFilter(hiddenElem.value);
            }
        });
    }, 300);
    //

    const toggleFilterDrawer = (filterDrawer) => {
        dispatch(setFilterDrawer({ filterDrawer: filterDrawer }));
        isotopeRef.current.arrange({ filter });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardContent>
                        <Grid
                            container
                            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: '12px' }}>
                                <Button color="secondary" onClick={() => toggleFilterDrawer(!filterDrawer)} sx={{ alignItems: 'center' }}>
                                    <FilterOutlined />
                                    <Typography paddingLeft="12px">Tìm kiếm</Typography>
                                </Button>
                                <OutlinedInput onKeyUp={quickSearch} startAdornment={<SearchOutlined />} />
                            </Grid>
                            <Grid item>
                                <Button color="inherit" variant="outlined" className="px-3" sx={{ height: '2.725rem', gap: '12px' }}>
                                    <Typography>Giá: Thấp đến cao</Typography>
                                    <DownOutlined />
                                </Button> 
                            </Grid>
                            <Grid item> 
                                <Button color="inherit" className="px-3" variant="outlined" sx={{ height: '2.725rem', gap: '12px' }}>
                                    <Typography>Giá Cao đến thấp</Typography>
                                    <DownOutlined />
                                </Button>
                            </Grid>
                            <Grid item>
                                <button
                                    className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                                    onClick={
                                        () => setPageStatus(constants.PAGE_STATUS.CREATE)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Thêm</span>
                                </button>

                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={4} justifyContent="center" alignItems="center" className="filter-container">
                    {useProducts()}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Main;
