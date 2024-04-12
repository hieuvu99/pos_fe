import React, { useEffect, useState } from "react";
import { OrderItem } from "@/app/Utilities/Interfacte/OrderItem";
import "./style.css";
import PropTypes from "prop-types";

function OrderSummary(props: Props) {
  const { order } = props;
  const [sum, setSum] = useState<number>(0);

  useEffect(() => {
    let tempSum = 0;
    order.forEach((orderItem: OrderItem) => {
      if (orderItem.price)
        tempSum = tempSum + orderItem.price * orderItem.quantity;
    });
    setSum(tempSum);
  }, [order]);

  return (
    <div className="w-96 border-solid shadow-lg h-screen mt-10">
      <div className="ms-5">
        <div className="flex">
          <p className="text-2xl font-bold">Bill</p>
        </div>
        <div>
          <table className="table-auto">
            {order.map((orderItem) => {
              return (
                <tr>
                  <td className="w-14"></td>
                  <td className="grid grid-cols-1 w-48">
                    <div className="mt-5 mb-5">
                      <p>{orderItem.productName}</p>
                      <p className="justify-end">x {orderItem.quantity}</p>
                    </div>
                  </td>
                  <td className="w-7"></td>
                  <td className="justify-end">
                    ${orderItem.price && orderItem.price * orderItem.quantity}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div>
          <table>
            <tr>
              <td>
                <p>Subtotal</p>
              </td>
              <td>
                <p>${sum}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Tax (13%)</p>
              </td>
              <td>
                <p>${sum * 0.13}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>Total</p>
              </td>
              <td>
                <p>{sum + sum * 0.13}</p>
              </td>
            </tr>
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
