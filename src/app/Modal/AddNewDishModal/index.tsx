import { Button, Modal } from "@mui/material";
import React, { FormEventHandler, useEffect, useState } from "react";
import "./style.css";
import { Product } from "@/app/Utilities/Interfacte/Product/Index";
import { PostMethod } from "@/app/Utilities/Fetch/PostMethod";
import { env } from "process";

interface property {
  open: boolean;
  handleClose: () => void;
}
// const setValue()
function AddNewDishModal(Property: property) {
  const { open, handleClose } = Property;

  const [newProduct, setNewProduct] = useState<Product | null>({
    productID: null,
    productName: null,
    productType: null,
    price: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(env.NODE_ENV)
    switch (name) {
      case "name":
        setNewProduct({ ...newProduct, productName: value.trim() } as Product);
        break;
      case "type":
        setNewProduct({ ...newProduct, productType: value.trim() } as Product);
        break;
      case "price":
        let newValue = parseFloat(value.trim());
        setNewProduct({ ...newProduct, price: newValue } as Product);
        break;
    }
  };

  const handleFormSubmit = (e : any) => {
    PostMethod("/products", newProduct as Product);
    e.preventDefault();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <form onSubmit={handleFormSubmit}>
        <div className=" bg-white grid grid-rows-4 add-dish-modal absolute justify-center p-5">
          <div>
            <div className="justify-center flex m-5 h-1 border-solid shadow-lg font-bold text-3xl title">
              <p>New Dish</p>
            </div>
          </div>
          <div className="m-5 mt-1 h-1">
            <p>Name</p>
            <input
              name="name"
              onChange={(e) => {
                handleInputChange(e);
              }}
              type="text"
              className="md:w-72 lg:w-96"
            />
          </div>
          <div className="m-5 mt-1 h-1">
            <p>Type</p>
            <div>
              <select
                name="type"
                className=" md:w-72 lg:w-96"
                onChange={handleInputChange}
              >
                <option value="Refreshment">Refreshment</option>
                <option value="Classics">Classics</option>
                <option value="Tea Latte">Tea Latte</option>
              </select>
            </div>
          </div>
          <div className="m-5 mt-1 h-1">
            <p>Price</p>
            <input
              name="price"
              type="number"
              className=" md:w-72 lg:w-96"
              onChange={(e) => {
                handleInputChange(e);
              }}
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-2 gap-1 m-5">
            <div className="justify-start flex">
              <Button
                variant="outlined"
                style={{ width: "100%" }}
                type="submit"
              >
                Create
              </Button>
            </div>
            <div className="justify-end flex">
              <Button
                variant="outlined"
                style={{ width: "100%" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddNewDishModal;
