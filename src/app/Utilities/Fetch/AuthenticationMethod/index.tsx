import axios from "axios";
import { Product } from "../../Interfacte/Product";
import AxiosIntance from "../../AxiosIntance";

export const  AuthenticationMethod = async (
  url: string,
  object: object,
  handleSnackbar: (message: string, severity: string) => void
): Promise<any | null> => {
  try {
    const result = await AxiosIntance.post(`${process.env.NEXT_PUBLIC_API_BASE_URL + url}`, object);
    const token = result.data.jwt;

    localStorage.setItem('jwt', token)

  } catch (error) {
    handleSnackbar(error as string, "error")
  }
};

