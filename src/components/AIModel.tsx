import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import { useUser } from '../customHooks/useUser'
import useDebounce from '../customHooks/useDebounce';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
function AIModel() {
    const { getUsers, users: matchedUsers, message } = useUser()
    console.log("🚀 ~ AIModel ~ matchedUsers:", matchedUsers)
    const [inputValue, setInputValue] = useState("")
    const debouncedQuery = useDebounce(inputValue, 400);

    useEffect(() => {
        console.log("🚀 ~ AIModel ~ debouncedQuery:", debouncedQuery)
        if (debouncedQuery) {
            getUsers(debouncedQuery)
        } else {
            getUsers("")
        }
    }, [debouncedQuery])
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <div
                onClick={onOpen}
                className='bg-[#21978B] rounded-full p-1.5 text-white cursor-pointer hover:scale-105 transition-all duration-100'>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 9h8"></path>
                    <path d="M8 13h6"></path>
                    <path
                        d="M12.01 18.594l-4.01 2.406v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5"
                    ></path>
                    <path d="M16 19h6"></path>
                    <path d="M19 16v6"></path>
                </svg>

            </div>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <h3 className='flex font-medium text-lg'>
                            Start New Chat
                        </h3>
                        <p className='text-sm text-gray-700 font-normal mt-3'>
                            Never lose touch with your friends again. Search for them by username or email and easily start a conversation.
                        </p>

                        {/* <h3 className="flex items-center w-full mt-3">
                            <span className="flex-grow bg-gray-200 rounded h-0.5"></span>
                            {/* <span className="mx-3 text-lg font-medium text-[#9c9a9a]">or</span>
                        <span className="flex-grow bg-gray-200 rounded h-0.5"></span>
                    </h3> */}

                        <div className='relative flex items-center mt-3'>
                            <input type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className='w-full p-2  text-sm pl-11 focus:outline-[#C7C3C3] text-black placeholder:text-[#C7C3C3] rounded-2xl border-2 border-[#c7c3c3]  bg-transparent'
                                name="" id="" placeholder='user name or Email' />
                            <Search className='absolute  text-[#C7C3C3] left-2' />
                        </div>
                        {
                            message &&
                            <p className='mt-3 text-sm text-gray-500 font-normal capitalize'>
                                {message}
                            </p>
                        }

                    </DrawerHeader>


                    <DrawerBody
                        className="no-scrollbar"

                    >
                        {/* <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder='UserName Or Email'
                            className=' w-full p-2 rounded-xl border-2 border-gray-200 focus:ring-1 focus:ring-green-500 focus:border-green-500'
                        /> */}
                        {/* {
                            (matchedUsers && matchedUsers.length > 0) &&
                            <p className='mt-3 text-sm text-gray-500 font-normal'>
                                Total {matchedUsers?.length} results Found
                            </p>
                        } */}

                        <div>

                            {
                                matchedUsers &&

                                <div className='overflow-y-auto'>
                                    {
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        matchedUsers.map((user: any, index: number) => (
                                            <Link to={`/chat/@${user?.username}`} key={index}>
                                                <div className='flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 cursor-pointer'>
                                                    <div className='flex items-center'>
                                                        <img src={user?.profileImage ?
                                                            user?.profileImage :
                                                            "https://res.cloudinary.com/di6r722sv/image/upload/v1727259169/7_nviboy.png"
                                                        } alt="" className='w-10 h-10 rounded-full' />
                                                        <div className='ml-3'>
                                                            <p className='text-sm font-semibold capitalize'>{user?.profileName ? user?.profileName : user?.username}</p>
                                                            <p className='text-xs text-gray-500'>{user?.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>

                                        ))
                                    }
                                </div>
                            }


                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer >
        </>
    )
}

export default AIModel