"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { GetMethod } from "../Utilities/Fetch/GetMethod";
import AddNewDishModal from "../Modal/AddNewDishModal";
import { Product } from "../Utilities/Interfacte/Product/Index";
import ViewDishModel from "../Modal/ViewDishModal";
import { Button } from "@mui/material";
function MenuBook() {
  const [data, setData] = useState<Product[] | null>(null);
  const [category, setCategory] = useState<String | null>("Refreshment");
  const [openViewDishModal, setOpenViewDishModal] = React.useState(false);
  const [openAddNewDishModal, setOpenAddNewDishModal] = React.useState(false);
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);
  useEffect(() => {
    try {
      setTimeout(()=>{
        GetMethod(`/products?category=${category}`).then((result: any) => {
          setData(result.data);
        });
      },1)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [category, viewedProduct]);
  var replacearray = data;
  const editProduct = (product: Product) => {
    var foundIndex = data?.findIndex(
      (element: Product) => element.productID == product.productID
    );
    if (replacearray) replacearray[foundIndex as number] = product;
    setData(replacearray);
  };
  const deleteProduct = (product: Product) => {
    var foundIndex = data?.findIndex(
      (element: Product) => element.productID == product.productID
    );
    if (replacearray) replacearray[foundIndex as number] = product;
    replacearray?.slice(foundIndex, 1);
    setData(replacearray);
  };

  return (
    <div className="menu-book flex-1 ">
      <AddNewDishModal
        open={openAddNewDishModal}
        handleClose={() => setOpenAddNewDishModal(false)}
      />
      <ViewDishModel
        open={openViewDishModal}
        handleClose={() => {
          setOpenViewDishModal(false);
          setViewedProduct(null);
        }}
        product={viewedProduct || null}
        setCategory={setCategory}
      />
      <div>
        <div className="text-4xl font-extrabold m-5">
          <p>Today Menu!</p>
        </div>
        <div className="subtitle font-bold ms-5">
          <p>Discover whatever you need easily</p>
        </div>
      </div>
      <div className="grid grid-cols-2 ">
        <div className="grid grid-cols-3 m-5 mt-10 flex-col w-8/12 gap-2">
          <div className="flex-col inline-flex">
            <Button
              className="text-xs"
              sx={{
                color: (category== "Refreshment")?"white":"black",
                backgroundColor: (category== "Refreshment") ? "black !important" : "white",
                borderColor: "black",
                borderRadius: "0.5rem",
              }}
              variant="outlined"
              onClick={() => setCategory("Refreshment")}
            >
              Refreshment
            </Button>
          </div>
          <div className="flex-col inline-flex md">
            <Button
              className="text-xs"
              sx={{
                color: (category== "Classics")?"white":"black",
                backgroundColor: (category== "Classics") ? "black !important" : "white",
                borderColor: "black",
                borderRadius: "0.5rem",
              }}
              variant="outlined"
              onClick={() => setCategory("Classics")}
            >
              Classics
            </Button>
          </div>
          <div className="flex-col inline-flex">
            <Button
              className="text-xs"
              sx={{
                color: (category== "Tea Latte")?"white":"black",
                backgroundColor: (category== "Tea Latte") ? "black !important" : "white",
                borderColor: "black",
                borderRadius: "0.5rem",
              }}
              variant="outlined"
              onClick={() => setCategory("Tea Latte")}
            >
              Tea Latte
            </Button>
          </div>
        </div>
        <div className="justify-end flex align-middle m-5 mt-10 fle">
          <Button
            variant="outlined"
            sx={{
              color: "black",
              borderColor: "black",
              borderRadius: "0.5rem",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => {
              setOpenAddNewDishModal(true);
            }}
          >
            Add new Item
          </Button>
        </div>
      </div>
      {!data ? (
        <p>Loading</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-4">
          {data!.map((product) => (
            <div
              className=" ms-5  border-solid shadow-lg ring ring-slate-400 ring-opacity-5 grid grid-cols-1 cursor-pointer rounded-lg"
              onClick={() => {
                setOpenViewDishModal(true);
                setViewedProduct(product);
              }}
            >
              <div className="justify-start flex text-lg me-5 mt-2 ms-3 font-semibold">
                <p className="truncate">{product.productName}</p>
              </div>
              <div className="justify-end flex me-5 mb-2">
                <p className="text-sm">${product.price}</p>
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
