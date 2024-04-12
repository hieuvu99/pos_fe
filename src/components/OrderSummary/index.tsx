import React, { useEffect, useState } from "react";
import { OrderItem } from "@/app/Utilities/Interfacte/OrderItem";
import "./style.css";
import PropTypes from "prop-types";

function OrderSummary(props: Props) {
  const { order } = props;
  // const [orders,setOrders] = useState<OrderItem[]>([]);
  useEffect(() => {
    console.log(order);
  }, [order]);
  return (
    <div className="w-96 border-solid shadow-lg h-screen mt-5">
      <div className="ms-5">
        <div className="flex">
          <p className="text-2xl font-bold">Bill</p>
        </div>
        <div>
          <table className="table-auto">
            {order.map((orderItem) => {
              return (
                <tr>
                  <td>
                    {orderItem.productName} x {orderItem.quantity}
                  </td>

                  <td className="justify-end">
                    ${orderItem.price && orderItem.price * orderItem.quantity}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

interface Props {
  order: OrderItem[];
}

export default OrderSummary;
