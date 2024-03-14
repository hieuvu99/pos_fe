"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { GetMethod } from "../Utilities/Fetch/GetMethod";
import AddNewDishModal from "../Modal/AddNewDishModal";
import { Product } from "../Utilities/Interfacte/Product/Index";
function MenuBook() {
  const [data, setData] = useState<Product[] | null>(null);
  const [category, setCategory] = useState<String>("refreshment");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    try {
      GetMethod("/products").then((result: any) => {
        setData(result.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [category]);
  return (
    <div className="menu-book flex-1 ">
      {/* <div className="model"> */}
        <AddNewDishModal open={open} handleClose={() => setOpen(false)} />
      {/* </div> */}
      <div>
        <div className="text-4xl font-extrabold m-5">
          <p>Today Menu!</p>
        </div>
        <div className="subtitle font-bold ms-5">
          <p>Discover whatever you need easily</p>
        </div>
      </div>
      <div className="grid grid-cols-2 ">
        <div className=" grid-cols-2 m-5 mt-10 flex-col category-list gap-2 align-middle">
          <div className="flex flex-wrap">
            <Button
              variant="outlined"
              onClick={() => setCategory("refreshment")}
            >
              Refreshment
            </Button>
          </div>
          <div className="flex">
            <Button variant="outlined" onClick={() => setCategory("classics")}>
              Classics
            </Button>
          </div>
        </div>
        <div className="justify-end flex align-middle m-5 mt-10 fle">
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add new Item
          </Button>
        </div>
      </div>
      {!data ? (
        <p>Loading</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {data!.map((product) => (
            <div className="text-2xl ms-5 dish border-solid shadow-lg  grid grid-cols-1">
              <div className="justify-end flex me-5 mt-2">
                <p>{product.productName}</p>
              </div>
              <div className="justify-end flex me-5">
                <p>${product.price}</p>
              </div>
            </div>
          ))}
        </div>
        // <></>
      )}
    </div>
  );
}

export default MenuBook;
