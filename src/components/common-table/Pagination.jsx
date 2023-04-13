import React, { useEffect } from "react";
import { Lucide } from "@/base-components";
import { useState } from "react";

function Pagination({ page = 0, pageSize = 10, setPage, setPageSize, totalRecord = 0 }) {
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (pageSize > 0) {
      let newTotalPage = totalRecord / pageSize;
      console.log(`total page: `, newTotalPage);
      console.log(`total page: `, Math.ceil(newTotalPage));
      setTotalPage(Math.ceil(newTotalPage));
    }
  }, []);

  if (!totalPage) {
    return <></>;
  }

  return (
    <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
      <nav className="w-full sm:w-auto sm:mr-auto">
        <ul className="pagination">
          {page > 1 ? (
            <li
              className="page-item"
              onClick={(e) => {
                setPage(page - 3 > 0 ? page - 3 : 0);
              }}
            >
              <button className="page-link" href="#">
                <Lucide icon="ChevronsLeft" className="w-4 h-4" />
              </button>
            </li>
          ) : (
            ""
          )}
          {page > 1 ? (
            <li
              className="page-item"
              onClick={(e) => {
                setPage(page - 1 > 0 ? page - 1 : 0);
              }}
            >
              <button className="page-link" href="#">
                <Lucide icon="ChevronLeft" className="w-4 h-4" />
              </button>
            </li>
          ) : (
            ""
          )}
         {totalPage > 1 ?  <li className="page-item">
            <button className="page-link" href="#">
              Trang {page} / {totalPage} Hiển thị từ {(page - 1) * pageSize + 1} đến{" "}
              {(page - 1) * pageSize + pageSize} trong số {totalRecord} bản ghi
            </button>
          </li> : ''}
          {page < totalPage ? (
            <li
              className="page-item"
              onClick={(e) => {
                setPage(page + 2 < totalPage ? page + 1 : totalPage);
              }}
            >
              <button className="page-link" href="#">
                <Lucide icon="ChevronRight" className="w-4 h-4" />
              </button>
            </li>
          ) : (
            ""
          )}
          {page < totalPage ? (
            <li
              className="page-item"
              onClick={(e) => {
                setPage(page + 3 < totalPage ? page + 3 : totalPage);
              }}
            >
              <button className="page-link" href="#">
                <Lucide icon="ChevronsRight" className="w-4 h-4" />
              </button>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
      <select
        onChange={(value) => setPageSize(value?.target?.value)}
        className="w-32 form-select box mt-3 sm:mt-0"
      >
        <option value={10}>10 bản ghi</option>
        <option value={20}>20 bản ghi</option>
        <option value={30}>30 bản ghi</option>
        <option value={50}>50 bản ghi</option>
        <option value={100}>100 bản ghi</option>
      </select>
    </div>
  );
}

export default Pagination;
