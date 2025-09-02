import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(
            `${BACKEND_URL}user/deleteUser/${userId}`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data
        console.log(result)
        return "User deleted successfully"
    } catch (err) {
        console.log(err)
        return "Some error, user not deleted"
    }
}