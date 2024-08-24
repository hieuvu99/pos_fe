import axios from "axios";
import { Product } from "../../Interfacte/Product";
import AxiosIntance from "../../AxiosIntance";

export const PutMethod = async (
  url: string,
  product: Product,
  handleSnackbar: (message: string, severity: string) => void
): Promise<any | null> => {
  try {
    const result = AxiosIntance.put(`${process.env.NEXT_PUBLIC_API_BASE_URL + url}`, product);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
