import axios from "axios"
import { BACKEND_URL } from "../../constants/api"


axios.defaults.withCredentials = true

export const getUsers = async () => {
    const token = localStorage.getItem("hlatoken");
    try {const response = await axios.get(
        `${BACKEND_URL}user/viewAllUsers`, {headers: {Authorization: `Bearer ${token}`}}
    )
    const result = response.data
    console.log("getUser APi:", result)
    return result}

    catch (err){
        console.log(err)
        return "big error"
    }
}