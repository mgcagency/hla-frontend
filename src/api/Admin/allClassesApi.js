import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const getClasses = async() => {
    try {
        const response = await axios.get( `${BACKEND_URL}class/viewAllClasses`, {headers: {Authorization: `Bearer ${token}`}}) 
        const result = response.data
        console.log("Api result:" ,result)
        return result
    }
    catch (err){
        console.log(err)
        return "big error"
    }
}