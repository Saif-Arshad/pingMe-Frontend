import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProfile } from "../store/features/user.slice";
interface registerProps {
    email: string;
    userName: string;
    password: string;
}
export const useUser = () => {
    const [loading, SetLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerUser = async (data: registerProps, action: any, Image: string, randomBannerLink: string) => {
        const payload = {
            ...data,
            profileImage: Image,
            bannerImage: randomBannerLink
        }
        try {
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/register", payload)
            if (res) {
                toast.success("User registered successfully")
                navigate("/chat")
                action.resetForm()
                localStorage.setItem("pingMe_token", res.data.token)
                navigate(0);

            }
        } catch (error: any) {
            toast.error(error.response.data.message ? error.response.data.message : "Something went wrong")
        } finally {
            SetLoading(false)

        }
    }
    const loginUser = async (data: any, action?: any) => {
        try {
            SetLoading(true)
            const res = await axiosInstance.post("/api/users/login", data)
            if (res) {
                toast.success("Login successfully")
                if (action) {
                    action.resetForm()
                }
                localStorage.setItem("pingMe_token", res.data.token)
                // navigate("/")
                navigate(0);
            }
        } catch (error: any) {
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
            console.log("🚀 ~ logOutUser ~ error:", error)
            // toast.error(error.response.data.message ? error.response.data.message : "Something went wrong")
            localStorage.removeItem("pingMe_token")
            navigate("/")
        }
    }
    const updateUserProfile = async (userId: string, profileData: any, onClose: any) => {
        try {
            SetLoading(true);

            const formData = new FormData();
            formData.append("profileName", profileData.profileName);

            // Ensure we're appending File objects, not URLs or strings
            if (profileData.profileImage instanceof File) {
                formData.append("profileImage", profileData.profileImage);
            }
            if (profileData.bannerImage instanceof File) {
                formData.append("bannerImage", profileData.bannerImage);
            }

            const res = await axiosInstance.patch(`/api/users/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                toast.success("Profile updated successfully");
                dispatch(updateProfile(res.data))
                // Optionally refresh or update the page with the new profile data
                onClose()
            } else {
                toast.error(res.data.message || "Failed to update profile");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message ? error.response.data.message : "Something went wrong");
        } finally {
            SetLoading(false);
        }
    };

    return {
        registerUser,
        loading,
        loginUser,
        updateUserProfile,
        logOutUser
    }
}
