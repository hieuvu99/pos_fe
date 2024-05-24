"use client";
import { metadata } from "@/app/Utilities/MetaData/metadata";
import RootLayout from "@/app/layout";
import OrderInfo from "@/components/OrderInfo";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function order() {
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const { orderID } = router.query;
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (orderID) {
    }
  }, [orderID]);

  return (
    <>
      {isClient && (
        <RootLayout metadata={metadata}>
          <div>
            <div className="text-4xl font-extrabold m-5">
              <p>Order</p>
            </div>
            <OrderInfo orderID={orderID} />
          </div>
        </RootLayout>
      )}
    </>
  );
}

export default order;
