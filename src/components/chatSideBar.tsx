import { Search } from 'lucide-react'

function ChatSideBar() {
    // 
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
            <div className='pl-3 flex items-center cursor-pointer gap-2'>
                <img
                    className='h-10 w-10 rounded-full'
                    src="/src/assets/avatars/1.png" alt="" />
                <div className='flex flex-col gap-0'>
                    <p className='text-black font-semibold'>John Doe</p>
                    <p className='text-sm -mt-1 text-[#4F5665]'>@saif103</p>
                </div>
                <span>
                    {/* <Ellipsis /> */}
                </span>

            </div>

        </div>
    )
}

export default ChatSideBar