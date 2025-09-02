import axios from "axios"
import { BACKEND_URL } from "../../constants/api"

const token = localStorage.getItem("hlatoken");

export const addWellness = async (data) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}wellness`,
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

export const submitWellness = async (data, id) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}wellness/${id}`,
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

export const getWellness = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}wellness`,
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
            `${BACKEND_URL}wellness/reminder`,
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
