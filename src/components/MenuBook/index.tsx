"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, CircularProgress } from "@mui/material";
import { GetMethod } from "@/app/Utilities/Fetch/GetMethod";
import AddNewDishModal from "@/app/Modal/AddNewDishModal";
import ViewDishModel from "@/app/Modal/ViewDishModal";
import { OrderItem } from "@/app/Utilities/Interfacte/OrderItem";
import { Product } from "@/app/Utilities/Interfacte/Product";
import { useSnackbar } from "@/app/Utilities/SnackBar";

interface Property {
  type: "menu" | "order";
  order?: OrderItem[];
  setOrder?: (order: OrderItem[]) => void;
}

function MenuBook(property: Property) {
  const { handleSnackbar } = useSnackbar();

  const { type, order, setOrder } = property;
  const [data, setData] = useState<Product[] | null>(null);
  const [category, setCategory] = useState<String | null>("Refreshment");
  const [openViewDishModal, setOpenViewDishModal] = React.useState(false);
  const [openAddNewDishModal, setOpenAddNewDishModal] = React.useState(false);
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        GetMethod(`/products?category=${category}`, handleSnackbar as any).then(
          (result: any) => {
            result && setData(result.data);
          }
        );
      }, 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      handleSnackbar(error as any, "error");
    }
  }, [category, viewedProduct]);

  function addOrder(product: Product) {
    if (order && setOrder) {
      const index = order.findIndex(
        (orderItem) => orderItem.productID == product.productID
      );
      const tempOrder = [...order];
      const orderItem = order[index];
      if (orderItem) {
        tempOrder[index] = {
          ...order[index],
          quantity: orderItem.quantity + 1,
        };
      } else {
        tempOrder.push({ ...product, quantity: 1 });
      }
      setOrder(tempOrder);
    }
  }

  return (
    <div className={`${order && order?.length >= 1 ? "md:4/6 lg:5/6" : "5/6"} me-5`}>
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
      <div className={type=="menu"?"flex":"xl:grid xl:grid-cols-2"}>
        <div className="grid grid-cols-3 m-5 mt-10 flex-col w-8/12 gap-2">
          <div className="flex-col inline-flex">
            <Button
              className="text-xs"
              sx={{
                color: category == "Refreshment" ? "white" : "black",
                backgroundColor:
                  category == "Refreshment" ? "black !important" : "white",
                borderColor: "black",
                borderRadius: "0.5rem",
              }}
              variant="outlined"
              onClick={() => setCategory("Refreshment")}
            >
              Refreshment
            </Button>
          </div>
          <div className="flex-col inline-flex">
            <Button
              className="text-xs"
              sx={{
                color: category == "Classics" ? "white" : "black",
                backgroundColor:
                  category == "Classics" ? "black !important" : "white",
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
                color: category == "Tea Latte" ? "white" : "black",
                backgroundColor:
                  category == "Tea Latte" ? "black !important" : "white",
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
        <div className="justify-end flex align-middle m-5 mt-10 absolute  right-5">
          {type == "menu" && (
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
          )}
        </div>
      </div>
      {!data ? (
        <div className="ms-96 mt-52">
          <CircularProgress className="ms-96" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-4 me-5">
          {data!.map((product) => (
            <div
              key={product.productID}
              className=" ms-5  border-solid shadow-lg ring ring-slate-400 ring-opacity-5 grid grid-cols-1 cursor-pointer rounded-lg"
              onClick={() => {
                if (type == "menu") {
                  setOpenViewDishModal(true);
                  setViewedProduct(product);
                } else type == "order";
                addOrder(product);
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
