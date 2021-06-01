import axios from 'axios'
import { toast } from 'react-toastify'

export const client = async (endPoint, { body, ...customConfig } = {}) => {
    const token = localStorage.getItem('token')
    const method = (() => {
        if (customConfig.method) {
            return customConfig.method
        } else if (body) return 'post'
        else return 'get'
    })()
    const clientInstance = axios.create({
        method,
        baseURL: process.env.REACT_APP_BE,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: `Bearer${customConfig.token ? customConfig.token : token}`
        },
        validateStatus: function (status) {
            return status >= 100 && status < 599
        }
    })
    const { data } = await clientInstance.request(endPoint, { data: body })
    if (!data.success)
        return toast(data.message)
    return data
}
export const authenticate = async (type, data) => {
    try {
        const { data: token } = await client(`/auth/${type}`, {
            body: data
        })
        console.log(token)
        if (token) {
            const { data: user } = await client('/auth/me', { token })
            console.log(user)
            localStorage.setItem('token', token)
            return { success: true, data: { ...user, token } }
        }
    } catch (err) {
        console.log(err)
    }
}
