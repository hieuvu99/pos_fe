import React, { useState } from "react";
import { OrderItem } from "@/app/Utilities/Interfacte/OrderItem";
import PropTypes from "prop-types";

function OrderSummary(props: Props) {
  const { order } = props;
  const [orders, setOrders] = useState<OrderItem[]>(order);
  return (
    <div>
      {orders.map((orderItem) => {
        return (
          <>
            <h1>{orderItem.productName}</h1>
            <h2>
              {orderItem.price} x {orderItem.quantity}
            </h2>
            <h3>{orderItem.price && orderItem.price * orderItem.quantity}</h3>
          </>
        );
      })}
    </div>
  );
}

interface Props {
  order: OrderItem[];
}

export default OrderSummary;
