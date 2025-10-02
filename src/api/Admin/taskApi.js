import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const getTeacherTasks = async (id) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}task/teacher/${id}`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data;
        console.log("teacher tasks are : ", result);
        return result?.data;
    } catch (err) {
        console.log(err)
        return "Some error happened and user not updated"
    }
}

export const assignTask = async (data) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}task`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data;
        return result.data;
    } catch (err) {
        console.log(err)
        return "Some error happened and user not updated"
    }
}
