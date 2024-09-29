import { Archive, FileLock2, MessageCircle, Search, Star } from 'lucide-react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import aiImage from '../assets/icons/logo.png'
import { useLocation } from 'react-router-dom'
import AIModel from './AIModel'
function ChatSideBar({ active }: any) {
    // const users = useSelector((state: any) => state.user)
    const location = useLocation()
    const isChatRoute = location.pathname === '/chat'
    // console.log("🚀 ~ ChatSideBar ~ users:", users)
    return (
        <div
            className='max-h-screen min-h-screen  bg-[#f5f5f5] w-64 p-3 py-7 pt-4 pb-5 flex flex-col'
        >

            <div className='flex flex-col w-full '
            >
                {/* <img
                        className=' h-auto w-20  mix-blend-multiply'
                        src="/src/assets/icons/logo.png"
                    /> */}
                <div className='flex mb-3 items-center justify-between '>

                    <h2 className='font-medium text-gray-600 flex  items-center'>
                        {
                            active.chat == true ?
                                <>
                                    <MessageCircle className='text-[#21978B] mr-1 h-5 w-5' />
                                    Message
                                </>
                                : active.archive == true ?
                                    <>
                                        <Archive className='text-[#21978B] mr-1 h-5 w-5' />
                                        Archive
                                    </>
                                    : active.block == true ?
                                        <>
                                            <FileLock2 className='text-[#21978B] mr-1 h-5 w-5' />
                                            Block Users
                                        </>
                                        :
                                        <>
                                            <Star className='text-[#21978B] mr-1 h-5 w-5' />
                                            Favorite
                                        </>

                        }
                        {/* Archieved */}
                    </h2>
                    <AIModel />

                </div>
                <div className='relative  mb-3 flex items-center'>
                    <input type="text"
                        className='w-full p-2  pl-11 focus:outline-[#C7C3C3] text-black placeholder:text-[#C7C3C3] rounded-2xl border-2 border-[#c7c3c3]  bg-transparent'
                        name="" id="" placeholder='Search people or message' />
                    <Search className='absolute  text-[#C7C3C3] left-2' />
                </div>
            </div>
            <div className='message no-scrollbar overflow-y-auto h-[50vh] mt-4'>
                <Link to={'/chat'}>
                    <div className={`flex gap-x-1 cursor-pointer p-2 rounded-xl mb-2 relative ${isChatRoute ? 'bg-slate-200' : "hover:bg-slate-100 "}`}>
                        <div className='relative'>

                            <img
                                className=' h-12 w-auto mix-blend-multiply'
                                src={aiImage}
                            />
                            {/* <div className="absolute inset-0 w-full h-full border-2 border-transparent rounded-full animate-blink"></div> */}
                            <div className="w-3 h-3  rounded-full bg-green-500 absolute right-1 top-0">
                            </div>

                        </div>
                        <div className='flex flex-col gap-0'>
                            <p className='text-black font-semibold text-lg'>Ping Me</p>
                            <p className='text-xs text-[#4F5665]'>Your Smart Chat Companion!</p>
                        </div>

                    </div>
                </Link>

            </div>
            {/* {
                (users.isLoading) ?
                    <>
                        <div role="status" className="max-w-sm animate-pulse pl-3 flex items-center gap-2">
                            <div className=" bg-gray-200 h-10 w-10 rounded-full dark:bg-gray-700 "></div>

                            <div className='flex flex-col gap-0 w-20'>

                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700  mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                            </div>

                            <span className="sr-only">Loading...</span>
                        </div>
                    </>
                    :
                    <div className='flex items-center justify-between'>
                        <Link to={`/${users.currentUser && users.currentUser.username}`}>
                            <div className='pl-3 flex items-center cursor-pointer gap-2'>

                                <img
                                    className='h-12 w-12 rounded-full object-contain'
                                    src={users.currentUser && users.currentUser.profileImage} alt="" />
                                <div className='flex flex-col gap-0'>
                                    <>
                                        <p className='text-black font-semibold'>{users.currentUser && users.currentUser.username}</p>
                                        <p className='text-sm -mt-1 text-[#4F5665]'>@{users.currentUser && users.currentUser.username}</p>
                                    </>
                                </div>
                            </div>

                        </Link>
                        <button
                            onClick={logOutUser}
                            className="group flex items-center justify-start
   w-11 h-11 bg-[#4b176b] rounded-full cursor-pointer
   1">
                            <div className="flex items-center justify-center w-full
transition-all duration-300 group-hover:justify-start
group-hover:px-3">
                                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                                    </path>
                                </svg>
                            </div>

                        </button>
                    </div>



            } */}
        </div >
    )
}

export default ChatSideBar