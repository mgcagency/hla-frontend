import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const addReview = async (data) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}review/createReview`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data
        console.log("add review api : ", result)
        return result;
        
    } catch (err) {
        console.log(err)
        return "Some error happened and review not created"
    }
}