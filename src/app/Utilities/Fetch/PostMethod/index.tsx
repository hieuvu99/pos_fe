import axios from "axios";
import { Product } from "../../Interfacte/Product";
import AxiosIntance from "../../AxiosIntance";

export const  PostMethod = async (
  url: string,
  object: object,
  handleSnackbar: (message: string, severity: string) => void
): Promise<any | null> => {
  try {
    const result = AxiosIntance.post(`${process.env.NEXT_PUBLIC_API_BASE_URL + url}`, object);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    handleSnackbar(error as string, "error")
    return null;
  }
};
