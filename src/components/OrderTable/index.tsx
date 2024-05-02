"use client";

import { GetMethod } from "@/app/Utilities/Fetch/GetMethod";
import { Order } from "@/app/Utilities/Interfacte/Order";
import { useSnackbar } from "@/app/Utilities/SnackBar";
import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const formatDate = (dateString: string): string => {
  // console.log(dateString, "DATE");
  const date = new Date(dateString);
  return date
    .toLocaleString
    // Code for set up global variable
    ();
};

const columns: GridColDef[] = [
  { field: "orderID", headerName: "ID", width: 250, align:"center", headerAlign:"center"},
  { field: "orderNo", headerName: "Number", width: 250, align:"center", headerAlign:"center" },
  { field: "paymentType", headerName: "Payment Type", width: 250, align:"center", headerAlign:"center" },
  {
    field: "time",
    headerName: "Time Created",
    width: 360, align:"center", headerAlign:"center",
    valueFormatter: (value?: string) => {
      if (!value) return "";
      return formatDate(value);
    },
  },
  { field: "cost", headerName: "Cost", width: 70 , align:"center", headerAlign:"center"},
];

function OrderTable() {
  const { handleSnackbar } = useSnackbar();

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
        <DataGrid
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
        />
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default OrderTable;
