import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const addUser = async (data) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}user/new`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data
        console.log(result)
        return "User Updated Successfully successfully"
    } catch (err) {
        console.log(err)
        return "Some error happened and user not updated"
    }
}