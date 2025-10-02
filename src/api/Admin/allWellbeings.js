import axios from "axios";
import { BACKEND_URL } from "../../constants/api";

const token = localStorage.getItem("hlatoken");

export const getAllWellbeings = async() => {
    try{
        const response = await axios.get(`${BACKEND_URL}wellbeing/viewWellbeing`, {headers: {Authorization: `Bearer ${token}`}})
        const result = response.data;
        console.log("api:", result);
        return result.data;
    }
    catch(err){
        console.log(err);
        return "error in allWellbeings API";
    }   
}