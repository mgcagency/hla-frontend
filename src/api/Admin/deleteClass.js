import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const deleteClass = async (classId) => {
    try {
        const response = await axios.delete(
            `${BACKEND_URL}class/deleteClass/${classId}`, 
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data
        console.log(result)
        return "Class deleted successfully"
    } catch (err) {
        console.log(err)
        return "Some error, class not deleted"
    }
}