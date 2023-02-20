import React, { useState ,useEffect} from 'react';
// material-ui
import { Typography } from '@mui/material';
import MainCard from 'components/MainCard'; 
import axios from 'axios';  

import constants from '../../utils/constants';
import ExchangeInfo from './ExchangeInfo'; 

const HftSetting = () => {
    const [exchangeInfo, setExchangeInfo] = useState(constants.EXCHANGE_INFO);

    async function getExchangeInfo() {
        axios
            .get('/exchangeInfo')
            .then((res) => {
                let data = { res };
                setExchangeInfo(...data);
            })
            .catch((err) => err);
    }

    useEffect(() => {
        getExchangeInfo();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="gap-8 columns-2">
                <MainCard title="Symbols">
                    <ExchangeInfo exchangeInfo={exchangeInfo}/>
                </MainCard>
                <MainCard title="Following">
                    <Typography variant="body2">
                        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna
                        alissa. Ut enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal.
                        Duos aube grue dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean
                        cuspidate non president, sunk in culpa qui officiate descent molls anim id est labours.
                    </Typography>
                </MainCard>
            </div>
        </div>
    );
};

export default HftSetting;
