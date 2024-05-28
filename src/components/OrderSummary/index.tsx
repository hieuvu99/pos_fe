import React, { useEffect, useRef, useState } from "react";
import { OrderItem } from "@/app/Utilities/Interfacte/OrderItem";
import "./style.css";
import PropTypes from "prop-types";
import { Button, Snackbar } from "@mui/material";
import {
  Close,
  CreditCard,
  LocalAtm,
  RemoveCircleOutline,
} from "@mui/icons-material";
import { PostMethod } from "@/app/Utilities/Fetch/PostMethod";
import { useSnackbar } from "@/app/Utilities/SnackBar";
import Order from "@/pages/order";

function OrderSummary(props: Props) {
  const { handleSnackbar } = useSnackbar();
  const { order, setOrder } = props;
  const [orderItems, setOrderItems] = useState<[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Card" | null>(
    null
  );

  const containerRef = useRef(null);
  const [visibleRows, setVisibleRows] = useState(3); // Initial number of visible rows
  const [rowHeight, setRowHeight] = useState(50); // Set your row height here
  const totalRows = order.length;

  function toFixedNumber(num: number, precision: number) {
    const multiplier = Math.pow(10, precision);
    return Math.round(num * multiplier) / multiplier;
  }
  const cursor: any = containerRef.current;

  useEffect(() => {
    let tempSum = 0;
    let tempArr = [];
    order.forEach((orderItem: OrderItem) => {
      if (orderItem.price) {
        tempSum = toFixedNumber(
          tempSum +
            toFixedNumber(
              toFixedNumber(orderItem.price, 2) * orderItem.quantity,
              2
            ),
          2
        );
        tempArr.push({
          orderItemID: { productID: orderItem.productID },
          quantity: orderItem.quantity,
        });
        setOrderItems(tempArr as []);
      }
    });
    setSum(tempSum);
  }, [order]);

  useEffect(() => {
    let tempTax = toFixedNumber(sum * 0.13, 2);
    setTax(tempTax);
  }, [sum]);

  useEffect(() => {
    let tempTotal = toFixedNumber(sum + tax, 2);
    setTotal(tempTotal);
  }, [sum, tax]);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = cursor.scrollTop;
      const containerHeight = cursor.clientHeight;
      const totalHeight = totalRows * rowHeight;

      // Check if user reached the bottom of the container
      if (scrollTop + containerHeight >= totalHeight) {
        // Increase the number of visible rows
        setVisibleRows((prevVisibleRows) => prevVisibleRows + 10);
      }
    }

    // Add scroll event listener to the container
    cursor && cursor.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up event listener
      cursor && cursor.removeEventListener("scroll", handleScroll);
    };
  }, [totalRows, rowHeight]);

  return (
    <div className=" border-solid shadow-lg h-screen  justify-end">
      <div className="">
        <div
          className="flex justify-end mr-5 mt-5 opacity-75 cursor-pointer"
          onClick={() => setOrder([])}
        >
          <Close />
        </div>
        <div className="ms-5 mt-3">
          <div className="flex">
            <p className="text-2xl font-bold">Bill</p>
          </div>
          <div
            ref={containerRef}
            style={{  overflowY: "auto" }}
            className="mt-5 mb-10 lg:h-52 xl:h-96"
          >
            <table className="table-auto">
              {order.map((orderItem: OrderItem) => {
                return (
                  <tr>
                    <td className="w-14">
                      <div
                        className="m-2 cursor-pointer"
                        onClick={() => {
                          let modifiedOrder: OrderItem[] = [...order];
                          let modifiedIndexNo = order.findIndex(
                            (Element: OrderItem) =>
                              Element.productID == orderItem.productID
                          );
                          let modifiedIndex: OrderItem | undefined;
                          if (modifiedIndexNo != -1) {
                            modifiedIndex = {
                              ...order[modifiedIndexNo],
                              quantity: order[modifiedIndexNo].quantity - 1,
                            };
                            if (modifiedIndex?.quantity == 0)
                              modifiedOrder.splice(modifiedIndexNo, 1);
                            else modifiedOrder[modifiedIndexNo] = modifiedIndex;
                            setOrder(modifiedOrder);
                          }
                        }}
                      >
                        <RemoveCircleOutline />
                      </div>
                    </td>
                    <td className="grid grid-cols-1 w-48">
                      <div className="mt-5 mb-5">
                        <p>{orderItem.productName}</p>
                        <p className="justify-end">x {orderItem.quantity}</p>
                      </div>
                    </td>
                    <td className="w-7"></td>
                    <td className="justify-end">
                      $
                      {orderItem.price &&
                        toFixedNumber(
                          toFixedNumber(orderItem.price, 2) *
                            orderItem.quantity,
                          2
                        )}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          <div className="w-80 divide-y-2 div divide-black divide-dashed divide-opacity-50">
            <div>
              <table>
                <tr>
                  <td>
                    <p>Subtotal</p>
                  </td>
                  <td className=" w-52"></td>
                  <td>
                    <p>${sum}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Tax (13%)</p>
                  </td>
                  <td className=" w-52"></td>
                  <td>
                    <p>${tax}</p>
                  </td>
                </tr>
                <tr className="h-10"></tr>
              </table>
            </div>
            <div className="">
              <table>
                <tr>
                  <td>
                    <p>Total</p>
                  </td>
                  <td className="flex-1 w-60"></td>
                  <td>
                    <p>${total}</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold mt-5 mb-5">
              <p>Payment Method</p>
            </div>
            <div className="grid-cols-2 grid">
              <div className="">
                <Button
                  variant="outlined"
                  className="inline-block"
                  sx={{
                    borderColor: "black!important",
                    color: "black",
                    display: "block",
                    width: "10rem",
                    height: "5rem",
                    borderRadius: "0.5rem",
                    opacity: paymentMethod != "Cash" ? "50%" : "100%",
                  }}
                  onClick={() => setPaymentMethod("Cash")}
                >
                  <LocalAtm />
                  <p>Cash</p>
                </Button>
              </div>
              <div className="">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "black!important",
                    color: "black",
                    display: "block",
                    width: "10rem",
                    height: "5rem",
                    borderRadius: "0.5rem",
                    opacity: paymentMethod != "Card" ? "50%" : "100%",
                  }}
                  onClick={() => setPaymentMethod("Card")}
                >
                  <CreditCard />
                  <p>Debit/Credit</p>
                </Button>
              </div>
            </div>
            <div className="mt-5">
              <Button
                className="text-xs"
                sx={{
                  color: "white",
                  backgroundColor: "black !important",
                  borderColor: "black",
                  borderRadius: "0.5rem",
                  width: "21.5rem",
                }}
                variant="outlined"
                onClick={() => {
                  if (order.length >= 1 && paymentMethod != null) {
                    let result = PostMethod(
                      "/create-order",
                      {
                        orderItems: orderItems,
                        order: { cost: total, paymentType: paymentMethod },
                      },
                      handleSnackbar as any
                    );
                    result != null &&
                      handleSnackbar("Order Created Successfully", "success");
                    setOrder([]);
                  }
                }}
              >
                Print Bills
              </Button>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}

interface Props {
  order: OrderItem[];
  setOrder: ([]) => void;
}

export default OrderSummary;
