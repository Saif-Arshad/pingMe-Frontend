import { Archive, FileLock2, MessageCircle, Search, MoreVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import aiImage from '../assets/icons/logo.png';
import { useLocation } from 'react-router-dom';
import AIModel from './AIModel';
import { useEffect, useState } from 'react';
import { archiveUsers, blockUsers, deleteRoom, joinRoom, unBlockUsers } from '../store/features/user.slice';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Box,
    Flex,
} from '@chakra-ui/react';

function ChatSideBar({ active, socket }: any) {
    const { currentUser, allUsers, currentUserId } = useSelector((state: any) => state.user);
    const location = useLocation();
    const dispatch = useDispatch();
    const [currentUserChat, setCurrentUserChat] = useState<any>();
    const currentLocation = location.pathname;
    const isChatRoute = location.pathname === '/chat';
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        if (currentLocation && currentLocation.includes('@')) {
            const user = currentLocation.split('@');
            setCurrentUserChat(user[1]);
        }
    }, [currentLocation]);

    useEffect(() => {
        if (socket) {
            const handleOnlineUsers = (onlineUserIds: any) => {
                setOnlineUsers(onlineUserIds);
            };

            const handleRoomJoined = (data: any) => {
                dispatch(joinRoom(data));
            };

            socket.on('room_joined', handleRoomJoined);
            socket.on('online_users', handleOnlineUsers);

            return () => {
                socket.off('online_users', handleOnlineUsers);
                socket.off('room_joined', handleRoomJoined);
            };
        }
    }, [socket]);

    const sortedRooms = currentUser?.roomHistory?.slice().sort((a: any, b: any) => {
        const lastMessageA = a.messages[a.messages.length - 1]?.timestamp || 0;
        const lastMessageB = b.messages[b.messages.length - 1]?.timestamp || 0;
        return new Date(lastMessageB).getTime() - new Date(lastMessageA).getTime();
    });
    const deleteMessages = (currentUserId: string, id: string) => {
        console.log("🚀 ~ deleteMessages ~ currentUserId:", currentUserId)
        console.log("🚀 ~ deleteMessages ~ id:", id)
        const roomId = [currentUserId, id].sort().join('-');
        const data = {
            roomId,
            currentUserId
        }
        socket.emit("delete-chat", data)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(deleteRoom({ roomId, id }))
        navigate("/chat")

    }
    console.log(sortedRooms, "sorted")
    const filteredRooms = sortedRooms?.filter((room: any) => {
        const participants = room.participants.filter((user: any) => user !== currentUserId);
        if (!participants.length) return false;

        const userDetail = allUsers.find((u: any) => u._id === participants[0]);
        if (!userDetail) return false;

        // Check the active state and filter accordingly
        if (active.block) {
            // Show only blocked users
            return currentUser.blockList.includes(userDetail._id);
        } else if (active.archive) {
            // Show only archived users
            return currentUser.archiveUser.includes(userDetail._id);
        } else if (active.message) {
            // Show only active chats (excluding block and archive)
            return !currentUser.blockList.includes(userDetail._id) && !currentUser.archiveUser.includes(userDetail._id);
        }

        // If no specific active state is applied, return all rooms that match the search query
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            userDetail.username.toLowerCase().includes(lowerCaseQuery) ||
            (userDetail.profileName && userDetail.profileName.toLowerCase().includes(lowerCaseQuery)) ||
            userDetail.email.toLowerCase().includes(lowerCaseQuery)
        );
    });


    const blockUser = (currentUserId: string, userId: string) => {
        const data = {
            currentUserId,
            userId
        }
        socket.emit("block-user", data)


        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(blockUsers(userId))
        navigate("/chat")

    }
    const archiveMessages = (currentUserId: string, userId: string) => {
        const data = {
            currentUserId,
            userId
        }
        socket.emit("archive-user", data)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(archiveUsers(userId))
        navigate("/chat")

    }
    const unArchive = (currentUserId: string, userId: string) => {
        const data = {
            currentUserId,
            userId
        }
        socket.emit("unArchive-user", data)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(unArchiveMessages(userId))
        navigate("/chat")

    }
    const unBlockUser = (currentUserId: string, userId: string) => {
        const data = {
            currentUserId,
            userId
        }
        socket.emit("unBlock-user", data)

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch(unBlockUsers(userId))
        navigate("/chat")

    }
    return (
        <Box maxH="100vh" overflow={"hidden"} minH="100vh" bg="#f5f5f5" w="64" p="3" py="7" pt="4" pb="5" flexDir="column">
            <Flex flexDir="column" w="full" h={"80px"}>
                <Flex mb="3" alignItems="center" justifyContent="space-between">
                    <h2 className="font-medium text-gray-600 flex items-center">
                        {active.chat ? (
                            <>
                                <MessageCircle className="text-[#21978B] mr-1 h-5 w-5" />
                                Message
                            </>
                        ) : active.archive ? (
                            <>
                                <Archive className="text-[#21978B] mr-1 h-5 w-5" />
                                Archive
                            </>
                        ) : (
                            <>
                                <FileLock2 className="text-[#21978B] mr-1 h-5 w-5" />
                                Block Users
                            </>
                        )}
                    </h2>
                    <AIModel />
                </Flex>
                <div className='relative mb-3 flex items-center'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-full p-2 pl-10 focus:outline-[#C7C3C3] text-black placeholder:text-[#C7C3C3] rounded-2xl border-2 border-[#c7c3c3] bg-transparent'
                        placeholder='Search Chats'
                    />
                    <Search className='absolute text-[#C7C3C3] left-2' />
                </div>
            </Flex>
            <Box mt="4" className="message no-scrollbar sidebar-content ">
                <Link to="/chat">
                    <div className={`flex gap-x-3 p-2 rounded-xl  mb-2 relative ${isChatRoute ? 'bg-slate-200' : "hover:bg-slate-100 "}`}>

                        <Box position="relative">
                            <img className="h-12 w-auto" src={aiImage} alt="Ping Me" />
                            <Box
                                className="absolute w-3 h-3 rounded-full bg-green-500"
                                position="absolute"
                                right="1"
                                top="0"
                            ></Box>
                        </Box>
                        <Flex flexDir="column">
                            <p className="text-black font-semibold text-lg">Ping Me</p>
                            <p className="text-xs text-[#4F5665]">Your Smart Chat Companion!</p>
                        </Flex>
                    </div>
                </Link>

                {filteredRooms?.map((room: any, index: number) => {
                    const participants = room.participants.filter((user: any) => user !== currentUserId);
                    if (!participants.length) return null;

                    const userDetail = allUsers.find((u: any) => u._id === participants[0]);
                    const isUserOnline = onlineUsers.includes(participants[0]);

                    if (!userDetail) return null;

                    return (
                        <div key={index} className={`flex gap-x-3 p-2 rounded-xl mb-2 relative ${currentUserChat === userDetail.username ? 'bg-slate-200' : "hover:bg-slate-100 "}`}>
                            <Link to={`/chat/@${userDetail.username}`} key={index} className="flex gap-2  cursor-pointer ">
                                <Box position="relative">
                                    <img
                                        src={userDetail?.profileImage || 'https://res.cloudinary.com/di6r722sv/image/upload/v1727259169/7_nviboy.png'}
                                        alt={userDetail?.username}
                                        className="w-auto h-11 rounded-full"
                                    />
                                    <Box
                                        className={`w-3 h-3 rounded-full absolute right-0 top-0 ${isUserOnline ? 'bg-green-500' : 'bg-gray-400'
                                            }`}
                                    ></Box>
                                </Box>
                                <Flex flexDir="column">
                                    <p className="text-black font-semibold text-lg capitalize">
                                        {userDetail?.profileName || userDetail?.username}
                                    </p>
                                    <p className="text-xs text-[#4F5665]">{userDetail?.email}</p>
                                </Flex>
                            </Link>

                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<MoreVertical />}
                                    variant=""
                                    position="absolute"
                                    right="-2"
                                    top="3"
                                />
                                <MenuList>
                                    {
                                        active.block ?
                                            <MenuItem onClick={() => unBlockUser(currentUserId, userDetail._id)}>UnBlock User</MenuItem>
                                            :
                                            active.archive ?
                                                <MenuItem onClick={() => unArchive(currentUserId, userDetail._id)}>UnArchive</MenuItem>
                                                :
                                                <>
                                                    <MenuItem onClick={() => blockUser(currentUserId, userDetail._id)}>Block User</MenuItem>
                                                    <MenuItem onClick={() => deleteMessages(currentUserId, userDetail._id)}>Delete Messages</MenuItem>
                                                    <MenuItem onClick={() => archiveMessages(currentUserId, userDetail._id)}>Archive Messages</MenuItem>
                                                </>
                                    }
                                    {/* <MenuItem onClick={() => console.log('Add to Favorite')}>Add to Favorite</MenuItem> */}
                                </MenuList>
                            </Menu>
                        </div>
                    );
                })}
            </Box>
        </Box>
    );
}

export default ChatSideBar;


