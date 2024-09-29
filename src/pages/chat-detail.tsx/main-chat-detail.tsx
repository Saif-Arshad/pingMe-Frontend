import { useSelector } from "react-redux";
import SideIcons from "../../components/SideIcons";
import ChatPreview from "../chat/chatPreview";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ChatInput from "../../components/ChatInput";

interface MainChatDetailProps {
    socket: any;
}

function MainChatDetail({ socket }: MainChatDetailProps) {
    const { allUsers, currentUser } = useSelector((state: any) => state.user);
    const [userChat, setUserChat] = useState<string | null>(null);
    const [chatUser, setChatUser] = useState<any>(null);
    const [chat, setChat] = useState<string>('');
    const [messages, setMessages] = useState<any[]>([]);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const location = useLocation();
    const currentLocation = location.pathname;

    // Extract chat username from the current location
    useEffect(() => {
        if (currentLocation && currentLocation.includes('@')) {
            const user = currentLocation.split('@');
            setUserChat(user[1]);
        }
    }, [currentLocation]);

    // Listen for online users and new messages from the server
    useEffect(() => {
        if (socket) {
            const handleOnlineUsers = (onlineUserIds: any) => {
                setIsOnline(onlineUserIds.includes(chatUser?._id));
            };

            const handleNewMessage = (message: any) => {
                console.log("Received message from server:", message);
                setMessages((prev) => [...prev, message]);
            };

            socket.on('online_users', handleOnlineUsers);
            socket.on('newMessage', handleNewMessage);

            return () => {
                socket.off('online_users', handleOnlineUsers);
                socket.off('newMessage', handleNewMessage);
            };
        }
    }, [socket, chatUser]);

    // Find the chat user based on the username
    useEffect(() => {
        if (userChat && allUsers) {
            const currentChatUser = allUsers.find((item: any) => item.username === userChat);
            setChatUser(currentChatUser || null);
        }
    }, [userChat, allUsers]);

    // Join room with the chat user when both are available
    useEffect(() => {
        if (currentUser && chatUser && socket) {
            const roomId = {
                sender: currentUser._id,
                receiver: chatUser._id,
            };

            socket.emit('joinRoom', roomId);
        }
    }, [currentUser, chatUser, socket]);

    // Handle message sending
    useEffect(() => {
        if (socket && currentUser && chatUser && chat.length > 0) {
            const messageData = {
                sender: currentUser._id,
                receiver: chatUser._id,
                message: chat,
            };

            socket.emit('private_message', messageData);  // Send the message
            setChat('');  // Clear the input after sending
        }
    }, [chat, socket, currentUser, chatUser]);

    return (
        <div className="flex">
            <SideIcons />
            <div className="flex flex-col max-h-screen mb-4 2xl:mt-14 relative w-full bg-white">
                <div className="flex flex-col">
                    <div className="w-full px-5 flex items-center max-h-[60px] min-h-[60px] bg-[#f5f5f5]">
                        <Link to={`/${chatUser && chatUser.username}`}>
                            <div className="flex items-center">
                                <img
                                    src={chatUser?.profileImage || "https://res.cloudinary.com/di6r722sv/image/upload/v1727259169/7_nviboy.png"}
                                    alt={chatUser?.username}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex flex-col">
                                    <p className="font-medium text-gray-600 ml-3">
                                        {chatUser?.profileName || chatUser?.username}
                                    </p>
                                    {isOnline ? (
                                        <span className="text-green-700 text-xs ml-3">Online</span>
                                    ) : (
                                        <span className="text-gray-500 text-xs ml-3">Offline</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>

                    <ChatPreview messages={messages}
                        chatUser={chatUser}
                    />
                </div>
                <div className="absolute bottom-0 w-full px-5 mx-auto">
                    <ChatInput setChat={setChat} />
                </div>
            </div>
        </div>
    );
}

export default MainChatDetail;
