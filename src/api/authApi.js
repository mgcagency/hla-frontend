import axios from "axios"
import { BACKEND_URL } from "../constants/api"


export const login = async (data) => {
    try {const response = await axios.post(
        `${BACKEND_URL}user/login`,
        data
    )
    const result = response.data
    console.log(result)

    localStorage.setItem("hlatoken", result.token);
    return result}

    catch (err){
        console.log(err)
        return "big error"
    }
}

export const sendCode = async (data) => {
    try {const response = await axios.post(
        `${BACKEND_URL}user/send/code`,
        data
    )
    const result = response.data
    console.log(result)

    localStorage.setItem("hlatoken", result.token);
    return result}

    catch (err){
        console.log(err)
        return "big error"
    }
}

export const verifyCode = async (data) => {
    try {const response = await axios.post(
        `${BACKEND_URL}user/verify/code`,
        data
    )
    const result = response.data
    console.log(result)

    localStorage.setItem("hlatoken", result.token);
    return result}

    catch (err){
        console.log(err)
        return "big error"
    }
}
