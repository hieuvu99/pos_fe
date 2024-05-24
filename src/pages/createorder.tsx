"use client";
import React, { useEffect, useState } from "react";
import { metadata } from "@/app/Utilities/MetaData/metadata";
import MenuBook from "@/components/MenuBook";
import RootLayout from "@/app/layout";
import OrderSummary from "@/components/OrderSummary";
import { OrderItem } from "@/app/Utilities/Interfacte/OrderItem";

function createOrder() {
  const [isClient, setIsClient] = useState(false);
  const [order, setOrder] = useState<OrderItem[]>([]);
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
  }, [order]);

  return (
    <>
      {isClient && (
        <RootLayout metadata={metadata}>
          <MenuBook
            type="order"
            order={order}
            setOrder={(order: OrderItem[]) => setOrder(order)}
          />
          {order.length >= 1 && (
            <OrderSummary order={order} setOrder={setOrder} />
          )}
        </RootLayout>
      ) }
    </>
  );
}

export default createOrder;
