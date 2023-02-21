import { useMutation, useQuery } from 'react-query';
import axios from 'axios';

export const patchDataByType = async (type, data) => {
    const response = await axios.patch(`${process.env.REACT_APP_API_SERVER}/${type}/${data.id}`, data);
    return response;
};

export const postDataByType = async (type, data) => {
    const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/${type}`, data);
    return response;
};

const fetchDataByType = async (type, id, sortField, order = 'asc') => {
    let response;
    let url = `${process.env.REACT_APP_API_SERVER}/${type}`;

    if (id) {
        url = `${url}/${id}`;
    }
    if (sortField) {
        url = `${url}?_sort=${sortField}&_order=${order}`;
    }
    response = await axios.get(url);

    return await response.data;
};

export const useCourse = (id, sortField, order) => {
    return useQuery(['fetch-courses'], () => fetchDataByType('courses', id, sortField, order));
};

export const useCategory = (id, sortField, order) => {
    return useQuery(['fetch-categories'], () => fetchDataByType('categories', id, sortField, order));
};

export const useChapter = (id, sortField, order) => {
    return useQuery(['fetch-chapters'], () => fetchDataByType('chapters', id, sortField, order));
};
