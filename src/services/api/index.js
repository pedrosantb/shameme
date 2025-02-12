import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

export { api };