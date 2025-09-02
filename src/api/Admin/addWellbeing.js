import axios from "axios";
import { BACKEND_URL } from "../../constants/api";

const token = localStorage.getItem("hlatoken");

export const addWellbeing = async (data) => {
    try {
        const response = await axios.post(`${BACKEND_URL}wellbeing/createWellbeing`, 
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data;
        console.log("add wellbeing api:", result);
        return result;
    }
    catch(err){
        console.log(err);
        return "Error in addWeelbeing API";
    }
}