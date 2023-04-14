import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminList from "./List";
import Create from "./Create";
import Update from "./Update";

function AdminAccount() { 

  const dispatch = useDispatch();

  const pageReducer = useSelector((store) => store.pageReducer);
  return (
    <>
      {pageReducer?.status === "CREATE" ? <Create dispatch={dispatch} pageReducer={pageReducer} /> : ""}
      {pageReducer?.status === "LIST" ? <AdminList dispatch={dispatch} pageReducer={pageReducer} /> : ""}
      {pageReducer?.status === "UPDATE" ? <Update dispatch={dispatch} pageReducer={pageReducer} /> : ""}
    </>
  );
}

export default AdminAccount;
