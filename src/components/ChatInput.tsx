import { Mic, Rocket, SmilePlus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
function ChatInput({ setChat }: any) {
    const [message, setMessage] = React.useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const submitMessage = (e: any) => {
        e.preventDefault()
        if (!message) return
        console.log(message)
        setChat(message)
        setMessage('')
    }
    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setMessage(message + emojiData.emoji);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target as Node)
            ) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <form onSubmit={submitMessage}>
            <div className="flex items-center w-full h-[70px] justify-between gap-5 bg-gray-100 p-3 rounded-full">

                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What’s on your mind?"
                    className="flex-1 bg-transparent border-none outline-none p-2 text-lg"
                />
                <div className="flex items-center gap-4">
                    <SmilePlus
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="w-6 cursor-pointer text-gray-500" />
                    <Mic className="w-6 cursor-pointer text-gray-500" />
                    <button
                        className='mr-3 bg-[#21978B] hover:scale-105 transition-all rounded-full p-3 hover:bg-[#5c2d9c'
                    >
                        <Rocket className="w-5 cursor-pointer text-white" />
                    </button>
                </div>
                {showEmojiPicker && (
                    <div className="absolute bottom-14 right-2 z-10" ref={emojiPickerRef}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>
        </form>

    )
}

export default ChatInput