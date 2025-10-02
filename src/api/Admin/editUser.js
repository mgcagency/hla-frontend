import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const editUser = async (data, userId) => {
    try {
        const response = await axios.put(
            `${BACKEND_URL}user/editUserDetails/${userId}`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data
        console.log("editapi: ", result.data)
        return result.data;
    } catch (err) {
        console.log(err)
        return "Some error happened and user not updated"
    }
}