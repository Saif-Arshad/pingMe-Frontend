import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface registerProps {
    email: string;
    userName: string;
    password: string;
}
export const useUser = () => {
    const [loading, SetLoading] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const [users, setUsers] = useState()
    const registerUser = async (data: registerProps, action: any, Image: string) => {
        const payload = {
            ...data,
            profileImage: Image
        }
        try {
            console.log("🚀 ~ registerUser ~ payload:", payload)
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/register", payload)
            console.log("🚀 ~ registerUser ~ res:", res)
            if (res) {
                toast.success("User registered successfully")
                navigate("/chat")
                action.resetForm()
                localStorage.setItem("pingMe_token", res.data.token)
            }
        } catch (error: any) {
            console.log("🚀 ~ registerUser ~ error:", error)
            toast.error(error.response.data.message ? error.response.data.message : "Something went wrong")
        } finally {
            SetLoading(false)

        }
    }
    const loginUser = async (data: any, action: any) => {
        console.log("🚀 ~ loginUser ~ data:", data)
        try {
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/login", data)
            if (res) {
                toast.success("Login successfully")
                navigate("/chat")
                action.resetForm()
                localStorage.setItem("pingMe_token", res.data.token)
            }
        } catch (error: any) {
            console.log("🚀 ~ registerUser ~ error:", error)
            toast.error(error.response.data.message ? error.response.data.message : "Something went wrong")
        } finally {
            SetLoading(false)

        }
    }
    const logOutUser = async () => {
        try {
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/log-out")
            if (res) {
                toast.success("Logout successfully")
                localStorage.removeItem("pingMe_token")
                navigate("/")
                window.location.reload()
            }
        } catch (error: any) {
            console.log("🚀 ~ registerUser ~ error:", error)
            toast.error(error.response.data.message ? error.response.data.message : "Something went wrong")
        }
    }
    const getUsers = async (query: string) => {
        console.log("🚀 ~ getUsers ~ query:", query)
        try {
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/start-chat", { query })

            if (res.data.data) {
                console.log("🚀 ~ getUsers ~ res:", res)
                setUsers(res.data.data)
                setMessage(res.data.message)
            }
        } catch (error: any) {
            console.log("🚀 ~  ~ error:", error)
            toast.error(error.response.data.message ? error.response.data.message : "Something went wrong")
        }

    }
    return {
        registerUser,
        getUsers,
        loading,
        loginUser,
        message,
        users,
        logOutUser
    }
}
