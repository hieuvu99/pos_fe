"use client";
import { metadata } from "@/app/Utilities/MetaData/metadata";
import RootLayout from "@/app/layout";
import OrderTable from "@/components/OrderTable";
import Orders from "@/components/Orders";
import React, { useEffect, useState } from "react";

function orders() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <RootLayout metadata={metadata}>
          <div className="flex-auto">
            <div className="text-4xl font-extrabold m-5">
              <p>Order</p>
            </div>
            <Orders />
          </div>
        </RootLayout>
      )}
    </>
  );
}

export default orders;
