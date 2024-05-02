import axios, { AxiosError } from "axios";
import { useSnackbar } from "../../SnackBar";

export const GetMethod = async (
  url: string,
  handleSnackbar: (message: string, severity: string) => void
): Promise<any | null> => {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL + url, "url value");
  try {
    const result = axios.get(`${"http://localhost:8080/api" + url}`);
    setTimeout
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        console.error("Server responded with error status:", axiosError.response.status);
        console.error("Error response data:", axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("No response received from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up request:", axiosError.message);
      }
      // Show snackbar message for the error
      handleSnackbar(axiosError.message, "error");
    } else {
      // Not an Axios error, handle it accordingly
      console.error("Non-Axios error:", error);
      // Show snackbar message for the error
      handleSnackbar(error as any, "error");
    }
    return null;
  }
};
