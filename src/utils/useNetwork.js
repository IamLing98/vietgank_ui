import { useEffect, useState } from 'react';
import axios from 'axios';

const useNetwork = (url) => {
    let [state, setState] = useState({ loading: true });

    useEffect(() => {
        setState({ loading: true });

        const makeRequest = async () => {
            try {
                let response = await axios.get(url);
                let data = await response.data;

                setState({ data, loading: false });
            } catch (error) {
                setState({ error, loading: false });
            }
        };

        makeRequest();
    }, [url]);

    return state;
};
