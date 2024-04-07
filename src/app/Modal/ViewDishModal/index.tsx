import { Button, Modal } from "@mui/material";
import React, { FormEventHandler, useEffect, useState } from "react";
// import "./style.css";
import { Product } from "@/app/Utilities/Interfacte/Product/Index";
import { PostMethod } from "@/app/Utilities/Fetch/PostMethod";
import { Edit, Delete, ArrowBack, Save, Cancel } from "@mui/icons-material";
import { PatchMethod } from "@/app/Utilities/Fetch/PatchMethod";
import { PutMethod } from "@/app/Utilities/Fetch/PutMethod";

interface property {
  open: boolean;
  handleClose: () => void;
  product: Product | null;
  setCategory: (category: string) => void;
}
// const setValue()
function ViewDishModel(Property: property) {
  const { open, handleClose, product , setCategory} = Property;
  const [editedProduct, setEditProduct] = useState<Product>();
  const [mode, setMode] = useState<"edit" | "view">("view");

  useEffect(() => {
    product && setEditProduct(product);
  }, [product]);

  const handleCloseModal = () => {
    handleClose();
    setMode("view");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // console.log(env.NODE_ENV)
    switch (name) {
      case "name":
        setEditProduct({
          ...editedProduct,
          productName: value.trim(),
        } as Product);
        break;
      case "type":
        setEditProduct({
          ...editedProduct,
          productType: value.trim(),
        } as Product);
        break;
      case "price":
        let newValue = parseFloat(value.trim());
        setEditProduct({ ...editedProduct, price: newValue } as Product);
        break;
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleCloseModal;
      }}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <form>
        <div className=" bg-white grid grid-rows-4 add-dish-modal absolute justify-center p-5">
          <div>
            <div className="justify-center flex m-5 h-1 border-solid shadow-lg font-bold text-3xl title">
              <p>Dish</p>
            </div>
          </div>
          <div className="m-5 mt-1 h-1">
            <p>Name</p>
            {mode == "view" ? (
              product && (
                <p className="md:w-72 lg:w-96">{product.productName}</p>
              )
            ) : (
              <input
                name="name"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                type="text"
                className="md:w-72 lg:w-96"
                value={editedProduct?.productName as string}
              />
            )}
          </div>
          <div className="m-5 mt-1 h-1">
            <p>Type</p>
            <div>
              {mode == "view" ? (
                product && (
                  <p className="md:w-72 lg:w-96">{product.productType}</p>
                )
              ) : (
                <select
                  name="type"
                  className=" md:w-72 lg:w-96"
                  onChange={handleInputChange}
                  value={editedProduct?.productType as string}
                >
                  <option value="Refreshment">Refreshment</option>
                  <option value="Classics">Classics</option>
                  <option value="Tea Latte">Tea Latte</option>
                </select>
              )}
            </div>
          </div>
          <div className="m-5 mt-1 h-1">
            <p>Price</p>
            {mode == "view" ? (
              product && <p className="md:w-72 lg:w-96">{product.price}</p>
            ) : (
              <input
                name="price"
                type="number"
                className=" md:w-72 lg:w-96"
                onChange={(e) => {
                  handleInputChange(e);
                  setEditProduct;
                }}
                step="0.01"
                value={editedProduct?.price as number}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-1 m-5">
            <div className="justify-start flex">
              <ArrowBack
                onClick={handleCloseModal}
                className="cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-2">
              {mode == "view" && product ? (
                <>
                  <div className="justify-start flex">
                    <Edit
                      className="cursor-pointer"
                      onClick={() => {
                        setMode("edit");
                      }}
                    />
                  </div>
                  <div className="justify-end flex">
                    <Delete
                      className="cursor-pointer"
                      onClick={() => {
                        product?.productID &&
                          PatchMethod("/products/deletes-product", [
                            product?.productID,
                          ]);
                        handleCloseModal;
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className=" justify-start flex">
                    <Save
                      onClick={(e) => {
                        if (
                          product?.price != editedProduct?.price ||
                          product?.productName != editedProduct?.productName ||
                          product?.productType != editedProduct?.productType!
                        ) {
                          PutMethod("/products", editedProduct as Product);
                          setCategory(editedProduct?.productType as string)
                          handleCloseModal();
                        }
                        // e.preventDefault
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="justify-end flex">
                    <Cancel
                      onClick={() => {
                        setMode("view");
                        product && setEditProduct(product);
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ViewDishModel;
