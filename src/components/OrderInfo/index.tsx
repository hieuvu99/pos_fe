import { GetMethod } from "@/app/Utilities/Fetch/GetMethod";
import { Order } from "@/app/Utilities/Interfacte/Order";
import { useSnackbar } from "@/app/Utilities/SnackBar";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import OrderItemTable from "../OrderItemTable";
interface Property {
  orderID: string | string[] | undefined;
}

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
          }
        );
    }, 1);
  }, [orderID]);

  return (
    <>
      <div className=" lg:w-2/3 ms-52 h-1/2 lg:mt-10 xl:mt-28 me-10">
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
           <OrderItemTable orderID={orderID} />
        </Box>
      </div>
    </>
  );
}

export default OrderInfo;
