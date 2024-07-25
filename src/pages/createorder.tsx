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
  useEffect(() => {}, [order]);

  return (
    <>
      {isClient && (
        <RootLayout metadata={metadata}>
          <div className="grid grid-flow-col h-screen">
            <div className="flex-col">
              <MenuBook
                type="order"
                order={order}
                setOrder={(order: OrderItem[]) => setOrder(order)}
              />
            </div>
            <div className="flex-col">
              {order.length >= 1 && (
                <OrderSummary order={order} setOrder={setOrder} />
              )}
            </div>
          </div>
        </RootLayout>
      )}
    </>
  );
}

export default createOrder;
