import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const editWellbeing = async (data, wellbeingId) => {
    try {
        const response = await axios.put(
            `${BACKEND_URL}wellbeing/editWellbeing/${wellbeingId}`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data
        console.log("wellbeing api: ",result)
        return "Wellbeing Updated Successfully "
    } catch (err) {
        console.log(err)
        return "Some error happened and wellbeing not updated"
    }
}