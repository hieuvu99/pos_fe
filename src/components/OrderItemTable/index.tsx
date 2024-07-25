import { GetMethod } from "@/app/Utilities/Fetch/GetMethod";
import { OrderItem } from "@/app/Utilities/Interfacte/OrderItem";
import { useSnackbar } from "@/app/Utilities/SnackBar";
import { throttle } from "lodash";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface Property {
  orderID: string | string[] | undefined;
}

const useInfiniteScroll = (
  callback: () => void,
  ref: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (ref.current) {
        const bottom =
          ref.current.scrollHeight - ref.current.scrollTop <=
          ref.current.clientHeight;
        if (bottom) {
          callback();
        }
      }
    }, 200);
    const currentRef = ref.current;
    currentRef?.addEventListener("scroll", handleScroll);
    return () => currentRef?.removeEventListener("scroll", handleScroll);
  }, [callback, ref]);
};
function OrderItemTable(property: Property) {
  const { handleSnackbar } = useSnackbar();
  const { orderID } = property;

  const route = useRouter();
  const [page, setPage] = useState(0);
  const [data, setData] = useState<null | OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const loadMoreOrderItems = useCallback(async () => {
    setLoading(true);
    try {
      const newOrderItems = await GetMethod(
        `/order?orderID=${orderID}`,
        handleSnackbar as any
      ).then((result) => {
        let data = result.data;
        let tempArr: any = [];
        data.map((element: any) => {
          tempArr.push({
            id: `${element.order.orderID}-${element.product.productID}`,
            productName: element.product.productName,
            productType: element.product.productType,
            price: element.product.price,
            quantity: element.quantity,
          });
        });
        setData(tempArr);
        return tempArr;
      });
      setData((prev) => prev && [...prev, ...newOrderItems]);
      console.log(data)
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching more orders:", error);
    } finally {
      setLoading(false);
    }
  }, [page,orderID]);

  useEffect(() => {
    loadMoreOrderItems();
  }, []);

  useInfiniteScroll(loadMoreOrderItems, tableRef);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="lg:px-16 xl:px-28 py-3">
                Name
              </th>
              <th scope="col" className="lg:px-16 xl:px-28 py-3">
                <div className="flex items-center">
                  Type
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="lg:px-16 xl:px-28 py-3">
                <div className="flex items-center">
                  Price
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="lg:px-16 xl:px-28 py-3">
                <div className="flex items-center">
                  Quantity
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div ref={tableRef} className="h-128 overflow-y-scroll overflow-x-auto">
        <table className="h-144 w-full text-sm text-left rtl:text-right text-gray-500">
          <tbody>
            {!data ? (
              <h1>Loading</h1>
            ) : (
              data.map((e) => {
                return (
                  <tr className="bg-white border-b">
                    {/*  
                  /,dd */}
                    <td className="lg:px-16 xl:px-28 py-4">{e.productName}</td>
                    <td className="lg:px-16 xl:px-28 py-4">{e.productType}</td>
                    <td className="lg:px-16 xl:px-28 py-4">{e.price}</td>
                    <td className="lg:px-16 xl:px-28 py-4 ">{e.quantity}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderItemTable;
