export interface Order {
  cost: number;
  orderID: number;
  orderNo: number;
  paymentType: "Cash" | "Card";
  time: any;
}
