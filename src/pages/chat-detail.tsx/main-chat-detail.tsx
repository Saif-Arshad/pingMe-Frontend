import { useSelector } from "react-redux";
import SideIcons from "../../components/SideIcons"
import ChatPreview from "../chat/chatPreview"
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function MainChatDetail({ socket }: any) {
    const { allUsers } = useSelector((state: any) => state.user);
    const [userChat, setUserChat] = useState<any>();
    const [chatUser, setChatUser] = useState<any>();
    const [isOnline, setIsOnline] = useState<any>(false)
    const location = useLocation();
    const currentLocation = location.pathname;
    useEffect(() => {
        if (currentLocation && currentLocation.includes('@')) {
            const user = currentLocation.split('@');
            setUserChat(user[1])
        }

    }, [currentLocation])
    useEffect(() => {
        if (socket) {
            socket.on('online_users', (onlineUserIds: any) => {
                if (chatUser && onlineUserIds.includes(chatUser._id)) {
                    setIsOnline(true);
                } else {
                    setIsOnline(false);
                }
            });

            return () => {
                socket.off('online_users');  // Clean up the event listener
            };
        }
    }, [socket, chatUser]);
    useEffect(() => {
        if (userChat && allUsers) {
            const currentChatUser = allUsers.filter((item: any) => item.username === userChat)
            setChatUser(currentChatUser[0])
        }
    }, [userChat, allUsers])
    return (
        <div className="flex">
            <SideIcons />
            <div className="flex flex-col max-h-screen mb-4  2xl:mt-14 relative w-full bg-white">
                <div className='flex flex-col'>

                    <div className='w-full px-5 flex items-center max-h-[60px] min-h-[60px] bg-[#f5f5f5] rounded-lg '>
                        <Link to={`/${chatUser && chatUser.username}`}>
                            <div className='flex items-center'>

                                <img src={chatUser && chatUser.profileImage || "https://res.cloudinary.com/di6r722sv/image/upload/v1727259169/7_nviboy.png"}
                                    alt={chatUser && chatUser.username}
                                    className='w-10 h-10 rounded-full' />
                                <div className='flex flex-col'>
                                    <p className='font-medium text-gray-600 ml-3'>{chatUser && chatUser.profileName || chatUser && chatUser.username}</p>
                                    {
                                        isOnline ?
                                            <span className='text-green-700 text-xs ml-3'>Online</span>
                                            :
                                            <span className='text-gray-500 text-xs ml-3'>Offline</span>
                                    }
                                </div>

                            </div>
                        </Link>
                    </div>
                    <ChatPreview />
                </div>
            </div>
        </div>
    )
}

export default MainChatDetail