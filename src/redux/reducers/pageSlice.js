// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  status: "LIST",
  dataSource: [],
  page: 1,
  pageSize: 10,
  record: {},
};

const pageSlice = createSlice({
  name: "pageSlice",
  initialState,
  reducers: {
    goToCreate: (state, action) => {
      state.status = "CREATE";
    },
    goToList: (state, action) => {
      state.status = "LIST";
    },
    goToUpdate: (state, action) => {
      state.status = "UPDATE";
      state.record = action.payload;
    },
    setDataSource: (state, action) => {
      state.dataSource = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export default pageSlice.reducer;

export const { goToCreate, setDataSource, setPage, setPageSize, goToUpdate, goToList } = pageSlice.actions;
