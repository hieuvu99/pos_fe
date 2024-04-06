"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Button } from "@mui/material";
import { GetMethod } from "../Utilities/Fetch/GetMethod";
import AddNewDishModal from "../Modal/AddNewDishModal";
import { Product } from "../Utilities/Interfacte/Product/Index";
import ViewDishModel from "../Modal/ViewDishModal";
function MenuBook() {
  const [data, setData] = useState<Product[] | null>(null);
  const [category, setCategory] = useState<String | null>("Refreshment");
  const [openViewDishModal, setOpenViewDishModal] = React.useState(false);
  const [openAddNewDishModal, setOpenAddNewDishModal] = React.useState(false);
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);
  useEffect(() => {
    try {
      GetMethod(`/products?category=${category}`).then((result: any) => {
        setData(result.data);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [category, viewedProduct]);
  var replacearray = data;
  const createProduct = (product: Product) =>{
    replacearray?.push(product)
    setData(replacearray)
  }
  const editProduct = (product: Product) =>{
    var foundIndex = data?.findIndex((element:Product)=> element.productID == product.productID)
    if(replacearray) replacearray[foundIndex as number] = product;
    setData(replacearray)
  }
  const deleteProduct = (product: Product) =>{
    var foundIndex = data?.findIndex((element:Product)=> element.productID == product.productID)
    if(replacearray) replacearray[foundIndex as number] = product;
    replacearray?.slice(foundIndex,1)
    setData(replacearray)
  }

  return (
    <div className="menu-book flex-1 ">
      {/* <div className="model"> */}
      <AddNewDishModal open={openAddNewDishModal} handleClose={() => setOpenAddNewDishModal(false)} createProduct={(product:Product)=>createProduct(product)}/>
      <ViewDishModel
        open={openViewDishModal}
        handleClose={() => {
          setOpenViewDishModal(false);
          setViewedProduct(null);
        }}
        product={viewedProduct || null}
        editProduct={(product)=>editProduct(product)}
        deleteProduct={(product)=>deleteProduct(product)}
      />
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
        <div className="grid grid-cols-4 m-5 mt-10 flex-col w-8/12">
          <div className="flex-col">
            <Button
              variant="outlined"
              onClick={() => setCategory("Refreshment")}
            >
              Refreshment
            </Button>
          </div>
          <div className="flex-col">
            <Button variant="outlined" onClick={() => setCategory("Classics")}>
              Classics
            </Button>
          </div>
          <div className="flex-col">
            <Button variant="outlined" onClick={() => setCategory("Tea Latte")}>
              Tea Latte
            </Button>
          </div>
        </div>
        <div className="justify-end flex align-middle m-5 mt-10 fle">
          <Button
            variant="outlined"
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
        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
          {data!.map((product) => (
            <div
              className="text-2xl ms-5 dish border-solid shadow-lg  grid grid-cols-1"
              onClick={() => {
                setOpenViewDishModal(true);
                setViewedProduct(product);
              }}
            >
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
