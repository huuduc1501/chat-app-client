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
    const { data } = await clientInstance(endPoint, { data: body })
    if (!data.success)
        return toast(data.message)
    return data
}
export const authenticate = async (type, data) => {
    try {
        const { data: token } = await client(`/auth/${type}`, {
            body: data
        })
        if (token) {
            const { data: user } = await client('/auth/me', { token })
            localStorage.setItem('token', token)
            return { success: true, data: { ...user, token } }
        }
    } catch (err) {
        console.log(err)
    }
}

export const upload = async (resourceType, file) => {
    const formData = new FormData();
    formData.append("upload_preset", "unsign_1");
    formData.append("file", file);
    console.log(formData)
    let toastId = null;
    const config = {
      onUploadProgress: (p) => {
        const progress = p.loaded / p.total;
        if (toastId === null) {
          toastId = toast("Đang tải file lên!", {
            progress,
          });
        } else {
          toast.update(toastId, {
            progress,
          });
        }
      },
    };
  
    const { data } = await axios.post(
      `${process.env.REACT_APP_CLOUDINARY_ENDPOINT}/${resourceType}/upload`,
      formData,
      config
    );
  
    toast.dismiss(toastId);
  
    return data.secure_url;
  };