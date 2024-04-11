"use client";
import React, { useEffect, useState } from "react";
import { metadata } from "@/app/Utilities/MetaData/metadata";
import MenuBook from "@/components/MenuBook";
import RootLayout from "@/app/layout";

function Menubook() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <RootLayout metadata={metadata}>
          <MenuBook type="menu"/>
        </RootLayout>
      ) : (
        <></>
      )}
    </>
  );
}

export default Menubook;
