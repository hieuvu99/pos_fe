import axios from "axios";
import { Product } from "../../Interfacte/Product/Index";

export const PutMethod = async (url: string, product: Product): Promise<any | null> => {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL + url, "url value");
  try {
    const result = axios.put(`${"http://localhost:8080/api" + url}`, product);
    // const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
