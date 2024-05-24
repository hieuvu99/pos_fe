import { GetMethod } from "@/app/Utilities/Fetch/GetMethod";
import { Order } from "@/app/Utilities/Interfacte/Order";
import { useSnackbar } from "@/app/Utilities/SnackBar";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
interface Property {
  orderID: string | string[] | undefined;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    field: "productName",
    headerName: "Name",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "productType",
    headerName: "Type",
    width: 250,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "price",
    headerName: "Price",
    align: "center",
    headerAlign: "center",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    align: "center",
    headerAlign: "center",
  },
];
function OrderInfo(property: Property) {
  const { handleSnackbar } = useSnackbar();
  const { orderID } = property;
  const [data, setData] = useState<null | []>(null);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (orderID)
        GetMethod(`/order?orderID=${orderID}`, handleSnackbar as any).then(
          (result) => {
            let data = result.data;
            let tempArr: any = [];
            setOrder(data[0].order);
            data.map((element: any) => {
              tempArr.push({
                id: `${element.order.orderID}-${element.product.productID}`,
                productName: element.product.productName,
                productType: element.product.productType,
                price: element.product.price,
                quantity: element.quantity,
              });
            });
            setData(tempArr);
          }
        );
    }, 1);
  }, [orderID]);

  function handleColumnHeaderClick(colId: string): void {
    throw new Error("Function not implemented.");
  }
  return (
    <>
      <div className=" lg:w-2/3 xl:w-1/2 ms-52 h-1/2 mt-28 me-10">
        {order && (
          <Box className="text-center grid-cols-4 grid border-solid shadow-lg p-2">
            {/* <p>{order.orderID}</p> */}
            <div>
              <p>Date</p>
              <p>{order.time}</p>
            </div>
            <div>
              <p>No</p>
              <p>{order.orderNo}</p>
            </div>
            <div>
              <p>Payment Type</p>
              <p>{order.paymentType}</p>
            </div>
            <div>
              <p>Order Total</p>
              <p>{order.cost}</p>
            </div>
          </Box>
        )}
        <div className="h-5"></div>
        <Box className="border-solid shadow-lg">
          {!data ? (
            <h1>Loading</h1>
          ) : (
            <DataGrid
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              onColumnHeaderClick={(col) => handleColumnHeaderClick(col.field)}
              onRowClick={(e) => {
                console.log(e);
              }}
            />
          )}
        </Box>
      </div>
    </>
  );
}

export default OrderInfo;
