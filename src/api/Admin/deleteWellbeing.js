import axios from "axios";
import { BACKEND_URL } from "../../constants/api";

const token = localStorage.getItem("hlatoken");

export const deleteWellbeing = async (id) => {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}wellbeing/deleteWellbeing/${id}`, {headers: {Authorization: `Bearer ${token}`}}
    );
    const result = response.data;
    console.log("delete wellbeing api:", result);
    return result;
  } catch (err) {
    console.log(err);
    return "Error in deleteWellbeing API";
  }
};
