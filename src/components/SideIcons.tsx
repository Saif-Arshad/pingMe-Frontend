import React, { useState } from 'react'
import ChatSideBar from './chatSideBar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useUser } from '../customHooks/useUser'
import { Archive, FileLock2, MessageCircle, Star } from 'lucide-react'

function SideIcons() {
    const users = useSelector((state: any) => state.user)
    const { logOutUser } = useUser()
    const [active, setActive] = useState({
        chat: true,
        archive: false,
        block: false,
        fav: false

    })
    const handleActive = (icon: string) => {
        setActive({
            chat: false,
            archive: false,
            block: false,
            fav: false,
            [icon]: true,
        });
    };

    return (
        <div className='flex max-h-screen min-h-screen'>
            <div className='bg-slate-200 min-h-full min-w-[55px] flex flex-col py-4 px-1 items-center gap-2 justify-between'>
                <div className='flex flex-col gap-20'>
                    {
                        (users.isLoading) ?
                            <div className=" bg-gray-200 h-10 w-10 rounded-full dark:bg-gray-700 "></div>
                            :

                            <Link to={`/${users.currentUser && users.currentUser.username}`}>

                                <img
                                    className='h-10 w-10 rounded-full object-contain'
                                    src={users.currentUser && users.currentUser.profileImage} alt="" />


                            </Link>
                    }
                    <div className='flex flex-col gap-3 items-center'>
                        <div
                            onClick={() => handleActive('chat')}
                            className={`rounded-full p-2 ${active.chat ? 'bg-[#4b176b] text-white' : 'text-gray-600'} cursor-pointer`}>
                            <MessageCircle className={`${active.chat ? 'h-5 w-5' : 'h-6 w-6'}`} />
                        </div>
                        <div
                            onClick={() => handleActive('archive')}
                            className={`rounded-full p-2 ${active.archive ? 'bg-[#4b176b] text-white' : 'text-gray-600'} cursor-pointer`}>
                            <Archive className={`${active.archive ? 'h-5 w-5' : 'h-6 w-6'}`} />
                        </div>
                        <div
                            onClick={() => handleActive('block')}
                            className={`rounded-full p-2 ${active.block ? 'bg-[#4b176b] text-white' : 'text-gray-600'} cursor-pointer`}>
                            <FileLock2 className={`${active.block ? 'h-5 w-5' : 'h-6 w-6'}`} />
                        </div>
                        <div
                            onClick={() => handleActive('fav')}
                            className={`rounded-full p-2 ${active.fav ? 'bg-[#4b176b] text-white' : 'text-gray-600'} cursor-pointer`}>
                            <Star className={`${active.fav ? 'h-5 w-5' : 'h-6 w-6'}`} />
                        </div>
                    </div>

                </div>
                <button
                    onClick={logOutUser}
                    className="group flex items-center justify-start
   w-10 h-10 bg-[#4b176b] rounded-full cursor-pointer
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
            </div >
            <ChatSideBar active={active} />
        </div >
    )
}

export default SideIcons