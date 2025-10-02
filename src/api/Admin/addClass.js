import axios from "axios"
import { BACKEND_URL } from "../../constants/api"
import { toast } from "react-toastify"

const token = localStorage.getItem("hlatoken");

export const addClass = async (data) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}class/scheduleClass`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data
        console.log("add call api : ", result)
        return result;
        // "User Updated Successfully successfully"
    } catch (err) {
        console.log(err)
        return "Some error happened and user not updated"
    }
}