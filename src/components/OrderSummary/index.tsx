import React, { useEffect, useRef, useState } from "react";
import { OrderItem } from "@/app/Utilities/Interfacte/OrderItem";
import "./style.css";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { CreditCard, LocalAtm } from "@mui/icons-material";
import { PostMethod } from "@/app/Utilities/Fetch/PostMethod";

function OrderSummary(props: Props) {
  const { order } = props;
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
      const scrollTop = containerRef?.current?.scrollTop;
      const containerHeight = containerRef?.current?.clientHeight;
      const totalHeight = totalRows * rowHeight;

      // Check if user reached the bottom of the container
      if (scrollTop + containerHeight >= totalHeight) {
        // Increase the number of visible rows
        setVisibleRows((prevVisibleRows) => prevVisibleRows + 10);
      }
    }

    // Add scroll event listener to the container
    containerRef?.current?.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up event listener
      containerRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, [totalRows, rowHeight]);

  return (
    <div className="w-96 border-solid shadow-lg h-screen mt-10">
      <div className="ms-5">
        <div className="flex">
          <p className="text-2xl font-bold">Bill</p>
        </div>
        <div
          ref={containerRef}
          style={{ height: "400px", overflowY: "auto" }}
          className="mt-5 mb-10"
        >
          <table className="table-auto">
            {order.map((orderItem) => {
              return (
                <tr>
                  <td className="w-14"></td>
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
                        toFixedNumber(orderItem.price, 2) * orderItem.quantity,
                        2
                      )}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="divide-y-2 div divide-black divide-dashed divide-opacity-50">
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
          <div className="text-2xl font-extrabold mt-5">
            <p>Payment Method</p>
          </div>
          <div className="grid-cols-2 grid">
            <div className="">
              <Button
                variant="outlined"
                className="inline-block"
                sx={{
                  borderColor: "black",
                  color: "black",
                  display: "block",
                  width: "11rem",
                  height: "5rem",
                  borderRadius: "0.5rem",
                }}
                onClick={() => setPaymentMethod("Card")}
              >
                <LocalAtm />
                <p>Cash</p>
              </Button>
            </div>
            <div className="">
              <Button
                variant="outlined"
                sx={{
                  borderColor: "black",
                  color: "black",
                  display: "block",
                  width: "11rem",
                  height: "5rem",
                  borderRadius: "0.5rem",
                }}
                onClick={() => setPaymentMethod("Cash")}
              >
                <CreditCard />
                <p>Debit/Credit</p>
              </Button>
            </div>
          </div>
          <div className="mt-3">
            <Button
              className="text-xs"
              sx={{
                color: "white",
                backgroundColor: "black !important",
                borderColor: "black",
                borderRadius: "0.5rem",
                width: "22rem",
              }}
              variant="outlined"
              onClick={() => {
                if (order.length >= 1 && paymentMethod != null)
                  PostMethod("/create-order", {
                    orderItems: orderItems,
                    order: { cost: total, paymentType: paymentMethod },
                  });
              }}
            >
              Print Bills
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  order: OrderItem[];
}

export default OrderSummary;
