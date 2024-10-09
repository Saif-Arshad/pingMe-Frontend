import { useEffect, useState } from 'react';
import ChatSideBar from './chatSideBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUser } from '../customHooks/useUser';
import { Archive, FileLock2, MessageCircle } from 'lucide-react';

function SideIcons({ socket, isPreview, setIsPreview }: any) {
    const users = useSelector((state: any) => state.user);
    const { currentUser } = users;
    const { logOutUser } = useUser();
    const [active, setActive] = useState({
        chat: true,
        archive: false,
        block: false,
    });
    const [archiveCount, setArchiveCount] = useState(0);
    const [blockCount, setBlockCount] = useState(0);

    useEffect(() => {

        setArchiveCount(currentUser?.archiveUser?.length || 0);
        setBlockCount(currentUser?.blockList?.length || 0);
    }, [currentUser]);

    const handleActive = (icon: string) => {
        setActive({
            chat: false,
            archive: false,
            block: false,
            [icon]: true,
        });
    };

    return (
        <div className={`${isPreview ? "hidden" : "flex "} w-full  md:w-auto md:flex max-h-screen min-h-screen`}>
            <div className='bg-slate-200 min-h-full min-w-[55px] flex flex-col py-4 px-1 items-center gap-2 justify-between'>
                <div className='flex flex-col gap-20'>
                    {users.isLoading ? (
                        <div className="bg-gray-200 h-10 w-10 rounded-full dark:bg-gray-700 "></div>
                    ) : (
                        <Link to={`/${currentUser?.username}`}>
                            <img
                                className='h-10 w-10 rounded-full object-contain'
                                src={currentUser?.profileImage}
                                alt=""
                            />
                        </Link>
                    )}
                    <div className='flex flex-col gap-5 items-center'>
                        <div
                            onClick={() => handleActive('chat')}
                            className={`rounded-full p-2 ${active.chat ? 'bg-[#21978B] text-white' : 'text-gray-600'} cursor-pointer`}>
                            <MessageCircle />
                        </div>
                        <div
                            onClick={() => handleActive('archive')}
                            className={`rounded-full relative p-2 ${active.archive ? 'bg-[#21978B] text-white' : 'text-gray-600'} cursor-pointer`}>
                            <Archive />
                            {archiveCount > 0 && (
                                <span className='absolute p-0.5 rounded-full -top-2 text-xs text-white bg-green-600 px-1.5 right-0'>
                                    {archiveCount}
                                </span>
                            )}
                        </div>
                        <div
                            onClick={() => handleActive('block')}
                            className={`rounded-full relative p-2 ${active.block ? 'bg-[#21978B] text-white' : 'text-gray-600'} cursor-pointer`}>
                            <FileLock2 className={`${active.block ? 'h-5 w-5' : 'h-6 w-6'}`} />
                            {blockCount > 0 && (
                                <span className='absolute p-0.5 rounded-full -top-2 text-xs text-white bg-green-600 px-1.5 right-0'>
                                    {blockCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    onClick={logOutUser}
                    className="group flex items-center justify-start w-10 h-10 bg-[#21978B] rounded-full cursor-pointer">
                    <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                        <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                        </svg>
                    </div>
                </button>
            </div>
            <ChatSideBar active={active} socket={socket} setIsPreview={setIsPreview} />
        </div>
    );
}

export default SideIcons;
