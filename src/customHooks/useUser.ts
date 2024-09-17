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
    const navigate = useNavigate()
    const registerUser = async (data: registerProps, action: any) => {
        console.log("🚀 ~ registerUser ~ data:", data)
        try {
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/register", data)
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
    return {
        registerUser,
        loading,
        loginUser,
    }
}
