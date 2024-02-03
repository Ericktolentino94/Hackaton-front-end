import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;


export const getGoogleMapsData = async (requestBody) => {
    try {
      const res = await axios.post(`${VITE_BASE_URL}`, requestBody);
      return res;
    } catch (err) {
      console.error(err);
    }
  };