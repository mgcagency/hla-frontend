import axios from "axios";
import { BACKEND_URL } from "../../constants/api";

const token = localStorage.getItem("hlatoken");

export const markTaskComplete = async (id) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}task/${id}`,
      { status: "completed" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return result;
  } catch (err) {
    console.log(err);
    return "Some error happened and user not updated";
  }
};

export const getTasksAssignedByMe = async (id) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}task/me/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const result = response.data;
    return result.data;
  } catch (err) {
    console.log(err);
    return "Some error happened and user not updated";
  }
};
