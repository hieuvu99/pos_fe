import axios from "axios";
import { Product } from "../../Interfacte/Product";

export const  PostMethod = async (
  url: string,
  object: object,
  handleSnackbar: (message: string, severity: string) => void
): Promise<any | null> => {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL + url, "url value");
  try {
    const result = axios.post(`${"http://localhost:8080/api" + url}`, object);
    // const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    handleSnackbar(error as string, "error")
    return null;
  }
};
