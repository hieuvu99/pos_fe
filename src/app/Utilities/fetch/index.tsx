// interface Data {
//   }

import axios from "axios";

export const fetchData = async (url: string): Promise<any | null> => {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL + url, "url value");
  try {
    const result = axios.get(`${"http://localhost:8080/api" + url}`);
    // const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
