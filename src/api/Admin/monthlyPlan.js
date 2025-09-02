import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const addMonthlyPlan = async (data) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}monthly-plan`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data;
        return result;
        
    } catch (err) {
        console.log(err)
        return "Some error happened and review not created"
    }
}

export const submitMonthlyPlan = async (data, id) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}monthly-plan/submit/${id}`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data;
        return result;
        
    } catch (err) {
        console.log(err)
        return "Some error happened and review not created"
    }
}

export const getMonthlyPlan = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}monthly-plan`,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data;
        return result;
        
    } catch (err) {
        console.log(err)
        return "Some error happened and review not created"
    }
}

export const sendReminder = async (data) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}monthly-plan/reminder`,
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        )
        const result = response.data;
        return result;
        
    } catch (err) {
        console.log(err)
        return "Some error happened and review not created"
    }
}
