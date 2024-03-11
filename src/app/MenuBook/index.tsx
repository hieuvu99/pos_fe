"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { fetchData } from "../Utilities/fetch";
function MenuBook() {
  const [data, setData] = useState<[] | null>(null);
  useEffect(() => {
    try {
      fetchData("/products").then((result: any) => {
        setData(result.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  return (
    <div className="menu-book flex-1 ">
      <div>
        <div className="text-4xl font-extrabold m-5">
          <p>Today Menu!</p>
        </div>
        <div className="subtitle font-bold ms-5">
          <p>Discover whatever you need easily</p>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-2 m-5 mt-10 flex flex-col category-list">
          <div className="flex">
            <Button variant="outlined">Refreshment</Button>
          </div>
          <div className="flex">
            <Button variant="outlined">Classics</Button>
          </div>
        </div>
        <div className="justify-end flex">
            <Button variant="outlined">Add new</Button>
          </div>
      </div>
      {!data ? (
        <p>Loading</p>
      ) : (
        data!.map((products) => (
          <div className="text-2xl ms-5 dish border-solid shadow-lg  grid grid-cols-1">
            <div className="justify-end flex me-5">
              <p>{products.productName}</p>
            </div>
            <div className="justify-end flex me-5">
              <p>${products.price}</p>
            </div>
          </div>
        ))
        // <></>
      )}
    </div>
  );
}

export default MenuBook;
