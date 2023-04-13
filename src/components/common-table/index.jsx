import React, { useEffect } from "react"; 
import { useState } from "react"; 
import Pagination from "./Pagination";

export function CellRender({ column, index, dataSource }) {
  return (
    <td className="w-40">
      {column.render
        ? column.render(dataSource[index][column.dataIndex], dataSource[index])
        : dataSource[index][column.dataIndex]}
    </td>
  );
}

export default function ({ columns, dataSource }) {
  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    console.log(`Data source: `, page, pageSize);
    console.log(dataSource.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize));
  }, dataSource.length);

  return (
    <div>
      <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
        <table className="table table-report -mt-2">
          <thead>
            <tr>
              {columns?.map((item, index) => {
                if (item["dataIndex"] === "action") {
                  return (
                    <th className="whitespace-nowrap text-center">
                      <p className="text-center">Thao tác</p>
                    </th>
                  );
                }
                return <th className="whitespace-nowrap text-center">{item?.title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {(pageSize > 0
              ? dataSource.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
              : dataSource
            ).map((item, rowIndex) => {
              console.log(item);
              return (
                <tr className="intro-x">
                  {columns?.map((column, colIndex) => {
                    return <CellRender column={column} dataSource={dataSource} index={rowIndex} />;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination totalRecord={dataSource?.length} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} />
    </div>
  );
}
