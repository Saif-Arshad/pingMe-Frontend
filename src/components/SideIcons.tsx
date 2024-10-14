import { useEffect, useState } from 'react';
import ChatSideBar from './chatSideBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useUser } from '../customHooks/useUser';
import {  MessageCircle } from 'lucide-react';

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
                    <div className='flex flex-col gap-4 items-center'>
                        <div
                            onClick={() => handleActive('chat')}
                            className={`rounded-full p-2 ${active.chat ? 'bg-[#21978B] text-white' : 'text-gray-600'} cursor-pointer`}>
                            <MessageCircle />
                        </div>
                        <div
                            onClick={() => handleActive('archive')}
                            className={`rounded-full relative p-2 ${active.archive ? 'bg-[#21978B] text-white' : 'text-gray-600'} cursor-pointer`}
                        >
                            <svg
                                height="29"
                                viewBox="0 0 48 48"
                                width="29"
                                xmlns="http://www.w3.org/2000/svg"
                                fill={`${active.archive ? "white" : "#808080"}`}
                            >
                                <path d="M41.09 10.45l-2.77-3.36c-.56-.66-1.39-1.09-2.32-1.09h-24c-.93 0-1.76.43-2.31 1.09l-2.77 3.36c-.58.7-.92 1.58-.92 2.55v25c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4v-25c0-.97-.34-1.85-.91-2.55zm-17.09 24.55l-11-11h7v-4h8v4h7l-11 11zm-13.75-25l1.63-2h24l1.87 2h-27.5z" />
                                <path d="M0 0h48v48h-48z" fill="none" />
                            </svg>

                            {archiveCount > 0 && (
                                <span className='absolute p-0.5 rounded-full -top-2 text-xs text-white bg-green-600 px-1.5 right-0'>
                                    {archiveCount}
                                </span>
                            )}
                        </div>

                        <div
                            onClick={() => handleActive('block')}
                            className={`rounded-full relative p-2 ${active.block ? 'bg-[#21978B] text-white' : 'text-gray-600'} cursor-pointer`}
                        >
                            {/* Keep the SVG and adjust its size */}
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill={`${active.block ? "text-gray-600" : "white"}`}
                                className={`${active.block ? 'h-6 w-6' : 'h-7 w-7'}`}
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>ic_fluent_person_block_24_filled</title>
                                    <g id="ic_fluent_person_block_24_filled" fill={`${!active.block ? "gray" : "white"}`} fillRule="nonzero">
                                        <path d="M17.5,12 C20.5375661,12 23,14.4624339 23,17.5 C23,20.5375661 20.5375661,23 17.5,23 C14.4624339,23 12,20.5375661 12,17.5 C12,14.4624339 14.4624339,12 17.5,12 Z M12.0225923,13.9987908 C11.3752958,15.0093421 11,16.2108435 11,17.5 C11,19.1437225 11.6101258,20.6449424 12.6162619,21.7895443 C11.8149076,21.9312924 10.9419626,22.0010712 10,22.0010712 C7.11050247,22.0010712 4.87168436,21.3444691 3.30881727,20.0007885 C2.48019625,19.2883988 2.00354153,18.2500002 2.00354153,17.1572408 L2.00354153,16.249921 C2.00354153,15.0072804 3.01090084,13.999921 4.25354153,13.999921 L12.0225923,13.9987908 Z M20.809206,15.2522698 L15.2522698,20.809206 C15.8928819,21.2451781 16.6666825,21.5 17.5,21.5 C19.709139,21.5 21.5,19.709139 21.5,17.5 C21.5,16.6666825 21.2451781,15.8928819 20.809206,15.2522698 Z M17.5,13.5 C15.290861,13.5 13.5,15.290861 13.5,17.5 C13.5,18.3333175 13.7548219,19.1071181 14.190794,19.7477302 L19.7477302,14.190794 C19.1071181,13.7548219 18.3333175,13.5 17.5,13.5 Z M10,2.0046246 C12.7614237,2.0046246 15,4.24320085 15,7.0046246 C15,9.76604835 12.7614237,12.0046246 10,12.0046246 C7.23857625,12.0046246 5,9.76604835 5,7.0046246 C5,4.24320085 7.23857625,2.0046246 10,2.0046246 Z" />
                                    </g>
                                </g>
                            </svg>

                            {/* Show the block count badge */}
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
