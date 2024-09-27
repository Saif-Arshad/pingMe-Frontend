import { Mic, Rocket } from 'lucide-react'
import React from 'react'
function ChatInput({ setChat }: any) {
    const [message, setMessage] = React.useState('')
    const submitMessage = () => {
        if (!message) return
        console.log(message)
        setChat(message)
        setMessage('')
    }
    return (
        <div className="flex items-center w-full h-[70px] justify-between gap-5 bg-gray-100 p-3 rounded-full">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What’s on your mind?"
                className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
            />
            <div className="flex items-center gap-4">
                <Mic className="w-6 cursor-pointer text-gray-500" />
                <button onClick={submitMessage}
                    className='mr-3 bg-[#4b176b] hover:scale-105 transition-all rounded-full p-3 hover:bg-[#5c2d9c'
                >
                    <Rocket className="w-5 cursor-pointer text-white" />
                </button>
            </div>
        </div>

    )
}

export default ChatInput