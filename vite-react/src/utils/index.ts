import axios from 'axios'

export const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:4000' : window.location.origin
export const http = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})