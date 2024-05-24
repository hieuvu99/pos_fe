"use client";

import { GetMethod } from "@/app/Utilities/Fetch/GetMethod";
import { Order } from "@/app/Utilities/Interfacte/Order";
import { useSnackbar } from "@/app/Utilities/SnackBar";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const columns: GridColDef[] = [
  {
    field: "orderID",
    headerName: "ID",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "orderNo",
    headerName: "Number",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "paymentType",
    headerName: "Payment Type",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "time",
    headerName: "Time Created",
    width: 360,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value?: string) => {
      if (!value) return "";
      return formatDate(value);
    },
  },
  {
    field: "cost",
    headerName: "Cost",
    width: 70,
    align: "center",
    headerAlign: "center",
  },
];

function OrderTable() {
  const { handleSnackbar } = useSnackbar();
  const route = useRouter();
  const [data, setData] = useState<null | Order[]>(null);

  useEffect(() => {
    GetMethod("/orders", handleSnackbar as any).then((result) =>
      setData(result.data)
    );

    // result != null && setData(result as any);
  }, []);
  function handleColumnHeaderClick(colId: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="">
      {data ? (
        <>
          {/* <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.orderID}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            onColumnHeaderClick={(col) => handleColumnHeaderClick(col.field)}
            onRowClick={(e) => {
              console.log(e);
              route.push(`/order?orderID=${e.id}`);
            }}
          /> */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="lg:px-16 xl:px-28 py-3">
                    ID
                  </th>
                  <th scope="col" className="lg:px-16 xl:px-28 py-3">
                    <div className="flex items-center">
                      Number
                      <a href="#">
                        <svg
                          className="w-3 h-3 ms-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" className="lg:px-16 xl:px-28 py-3">
                    <div className="flex items-center">
                      Payment Type
                      <a href="#">
                        <svg
                          className="w-3 h-3 ms-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" className="lg:px-16 xl:px-28 py-3">
                    <div className="flex items-center">
                      Price
                      <a href="#">
                        <svg
                          className="w-3 h-3 ms-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" className="lg:px-16 xl:px-28 py-3">
                    <span className="flex items-center">Time Created</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((e) => {
                  return (
                    <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="lg:px-16 xl:px-28 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {e.orderID}
                      </th>
                      <td className="lg:px-16 xl:px-28 py-4">{e.orderNo}</td>
                      <td className="lg:px-16 xl:px-28 py-4">{e.paymentType}</td>
                      <td className="lg:px-16 xl:px-28 py-4">{e.cost}</td>
                      <td className="lg:px-16 xl:px-28 py-4 ">
                        {e.time}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default OrderTable;
