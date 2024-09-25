import { Search } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useUser } from '../customHooks/useUser'
function ChatSideBar() {
    const users = useSelector((state: any) => state.user)
    console.log("🚀 ~ ChatSideBar ~ users:", users)
    // const isLoading = users.currentUser.isLoading
    const { logOutUser } = useUser()
    return (
        <div
            className='max-h-screen min-h-screen  bg-[#FAFAFA] w-72 p-3 py-7 pb-5 flex flex-col justify-between'
        >
            <div className='flex flex-col'>

                <div className='flex flex-col w-full'
                >
                    <img
                        className=' h-20 w-20 mix-blend-multiply'
                        src="/src/assets/icons/blue-robot-mascot-logo-icon-design_675467-55_1__Traced_-removebg-preview.png"
                    />
                    <div className='relative  mt-7 flex items-center'>
                        <input type="text"
                            className='w-full p-2  pl-11 focus:outline-[#21978B] text-black placeholder:text-[#C7C3C3] rounded-2xl border border-[#C7C3C3] bg-transparent'
                            name="" id="" placeholder='Search people or message' />
                        <Search className='absolute  text-[#C7C3C3] left-2' />
                    </div>
                </div>
                <div className='message no-scrollbar overflow-y-auto h-[50vh] mt-4'>

                    <div className='flex gap-x-3 bg-[#cfebe8] cursor-pointer p-2 rounded-xl mb-2 relative'>
                        <img
                            className=' h-10 w-10 mix-blend-multiply'
                            src="/src/assets/icons/blue-robot-mascot-logo-icon-design_675467-55_1__Traced_-removebg-preview.png"
                        />

                        <div className='flex flex-col gap-0'>
                            <p className='text-black font-semibold text-lg'>NeoBot</p>
                            <p className='text-sm text-[#4F5665]'>AI at Your Fingertips</p>
                        </div>
                        <div className="w-3 h-3  rounded-full bg-green-500 animate-pulse absolute right-2 top-3">
                            <div className="absolute inset-0 w-full h-full border-2 border-transparent rounded-full animate-blink"></div>
                        </div>

                    </div>

                </div>
            </div>
            {
                users.isLoading ?
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
                        <Link to={`/${users.currentUser.username}`}>
                            <div className='pl-3 flex items-center cursor-pointer gap-2'>

                                <img
                                    className='h-12 w-12 rounded-full object-contain'
                                    src={users.currentUser.profileImage && users.currentUser.profileImage} alt="" />
                                <div className='flex flex-col gap-0'>
                                    <>
                                        <p className='text-black font-semibold'>{users.currentUser.username}</p>
                                        <p className='text-sm -mt-1 text-[#4F5665]'>@{users.currentUser.username}</p>
                                    </>
                                </div>
                            </div>

                        </Link>
                        <button
                            onClick={logOutUser}
                            className="group flex items-center justify-start
   w-11 h-11 bg-cyan-500 rounded-full cursor-pointer
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



            }
        </div >
    )
}

export default ChatSideBar