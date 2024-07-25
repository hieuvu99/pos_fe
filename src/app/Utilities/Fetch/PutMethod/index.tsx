import axios from "axios";
import { Product } from "../../Interfacte/Product";

export const PutMethod = async (
  url: string,
  product: Product,
  handleSnackbar: (message: string, severity: string) => void
): Promise<any | null> => {
  try {
    const result = axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL + url}`, product);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
