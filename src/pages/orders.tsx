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
          <Orders/>
        </RootLayout>
      )}
    </>
  );
}

export default orders;
