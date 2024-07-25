import axios from "axios";
import { Product } from "../../Interfacte/Product";

export const PatchMethod = async (
  url: string,
  array: number[],
  handleSnackbar: (message: string, severity: string) => void
): Promise<any | null> => {
  try {
    const result = axios.patch(`${process.env.NEXT_PUBLIC_API_BASE_URL + url}`, array);
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    handleSnackbar(error as string, "error");
    return null;
  }
};
