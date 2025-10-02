import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const editClass = async (data, classId) => {
    try {
        const response = await axios.put(
            `${BACKEND_URL}class/editClassDetails/${classId}`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data
        console.log(result)
        return "Class Updated Successfully successfully"
    } catch (err) {
        console.log(err)
        return "Some error happened and class not updated"
    }
}