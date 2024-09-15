import axiosInstance from "../utils/axios";

interface registerProps {
    email: string;
    userName: string;
    password: string;
}
export const useUser = () => {


    const registerUser = async (data: registerProps) => {
        console.log("🚀 ~ registerUser ~ data:", data)
        try {
            const res = await axiosInstance.post("/api/users/register", data)
            console.log("🚀 ~ registerUser ~ res:", res)

        } catch (error) {
            console.log("🚀 ~ registerUser ~ error:", error)

        }
    }



    return {
        registerUser
    }
}