import { useDispatch, useSelector } from "react-redux";
import SideIcons from "../../components/SideIcons";
import ChatPreview from "../chat/chatPreview";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ChatInput from "../../components/ChatInput";
import { newMessage } from "../../store/features/user.slice";
interface MainChatDetailProps {
    socket: any;
}

function MainChatDetail({ socket }: MainChatDetailProps) {
    const { allUsers, currentUser } = useSelector((state: any) => state.user);
    const [userChat, setUserChat] = useState<string | null>(null);
    const [chatUser, setChatUser] = useState<any>(null);
    const [chat, setChat] = useState<string>('');
    const dispatch = useDispatch();
    const [messages, setMessages] = useState<any[]>([]);
    const [isOnline, setIsOnline] = useState<boolean>(false);
    const [isBlocked, setIsBlocked] = useState<boolean>(false);
    const location = useLocation();
    const currentLocation = location.pathname;
    const currentUserMessages = currentUser?.roomHistory?.filter((item: any) => item.roomId === [chatUser?._id, currentUser._id].sort().join('-'))[0]?.messages || [];
    console.log("🚀 ~ currentUserMessages:", currentUserMessages)
    // Extract chat username from the current location
    useEffect(() => {
        if (currentLocation && currentLocation.includes('@')) {
            const user = currentLocation.split('@');
            setUserChat(user[1]);
        }
    }, [currentLocation]);


    useEffect(() => {
        if (currentUserMessages) {
            console.log("🚀 ~ useEffect ~ currentUserMessages:", currentUserMessages)
            setMessages(currentUserMessages)
        }
    }, [currentUserMessages])
    // useEffect(() => {
    //     if (currentUser && chatUser) {
    //         const currnetRoom = [chatUser._id, currentUser._id].sort().join('-');
    //         const getRoomMessages = currentUser && currentUser.roomHistory.filter((item: any) => item.roomId === currnetRoom)[0];
    //         console.log("🚀 ~ useEffect ~ getRoomMessages:", getRoomMessages)
    //         setMessages(getRoomMessages?.messages || []);
    //     }
    // }, [currentUser, chatUser])
    useEffect(() => {
        if (socket) {
            const handleOnlineUsers = (onlineUserIds: any) => {
                setIsOnline(onlineUserIds.includes(chatUser?._id));
            };

            const handleNewMessage = (message: any) => {
                console.log("Received message from server:", message);
                dispatch(newMessage(message))
                // setMessages((prev) => [...prev, message]);
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
            console.log("🚀 ~ useEffect ~ currentChatUser:", currentChatUser)
            setChatUser(currentChatUser || null);
        }
    }, [userChat, allUsers]);
    useEffect(() => {
        if (currentUser && chatUser) {
            // Check if the chat user has blocked the current user or if the current user has blocked the chat user
            const currentUserBlocked = currentUser.blockList.includes(chatUser._id);
            const chatUserBlocked = chatUser.blockList.includes(currentUser._id);

            // Set the isBlocked state accordingly
            if (currentUserBlocked || chatUserBlocked) {
                setIsBlocked(true);
            } else {
                setIsBlocked(false);
            }
        }
    }, [currentUser, chatUser]);


    useEffect(() => {
        if (currentUser && chatUser && socket) {
            const roomId = {
                sender: currentUser._id,
                receiver: chatUser._id,
            };
            socket.emit('joinRoom', roomId);

            // const roomIdChecking = [roomId.receiver, roomId.sender].sort().join('-');
            // if (Array.isArray(currentUser.roomHistory)) {
            //     const roomExists = currentUser.roomHistory.filter(
            //         (historyRoomId: any) => historyRoomId.roomId === roomIdChecking
            //     );
            //     console.log("🚀 ~ useEffect ~ roomExists:", roomExists)

            //     // if (roomExists.length == 0) {
            // }s
        }
    }, [chatUser]);


    // Handle message sending
    useEffect(() => {
        if (socket && currentUser && chatUser && chat.length > 0) {
            const messageData = {
                sender: currentUser._id,
                receiver: chatUser._id,
                message: chat,
            };
            console.log("🚀 ~ useEffect ~ messageData:", messageData)

            socket.emit('private_message', messageData); 
            setChat(''); 
        }
    }, [chat, socket, currentUser, chatUser]);

    return (
        <div className="flex">
            <SideIcons socket={socket} />
            <div className="flex flex-col max-h-screen mb-4 relative w-full bg-white">
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
                                    <p className="font-medium text-gray-600 capitalize ml-3">
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
                    {
                        !isBlocked ?
                            <ChatInput setChat={setChat} />
                            :
                            <p className="mt-3 text-center text-sm font-light text-gray-600">
                                Congratulations! You’ve unlocked the ‘Blocked’ achievement!
                            </p>
                    }
                </div>
            </div>
        </div>
    );
}

export default MainChatDetail;
