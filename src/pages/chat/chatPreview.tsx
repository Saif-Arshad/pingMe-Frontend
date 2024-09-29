import { useEffect, useRef } from 'react';
import wavyAnimation from '../../assets/icons/Animation - 1723439951167.gif'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function ChatPreview({ messages, chatUser }: any) {

    const { currentUser } = useSelector((state: any) => state.user)

    const bottomRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const formatTimestamp = (timestamp: Date) => {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const diffInSeconds = Math.floor((now.getTime() - messageTime.getTime()) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) {
            // If more than a day, show the time in 'HH:MM AM/PM' format
            return messageTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
        } else if (diffInHours > 0) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
        } else {
            return "Just now"
        }
    }
    return (
        <div
            style={{
                maxHeight: 'calc(100vh - 120px)',
                minHeight: 'calc(100vh - 120px)',
            }}
            className="overflow-y-auto p-3 pt-10 pb-20 no-scrollbar "
        >

            <div className="no-scroll flex flex-col p-2 space-y-3">
                {messages.length > 0 ? (
                    messages.map((msg: any, index: number) => (
                        <div
                            key={index}
                            className={`message flex w-full ${msg.sender === currentUser._id ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div className="flex items-start space-x-2 max-w-[70%]">
                                {msg.sender !== currentUser._id && (
                                    <Link to={`/${chatUser.username}`}>

                                        <img
                                            src={chatUser?.profileImage || "https://via.placeholder.com/150"}
                                            alt="Chat User"
                                            className="w-8 -mt-5 h-8 rounded-full"
                                        />
                                    </Link>
                                )}

                                <div
                                    className={`message-bubble p-3 rounded-b-xl ${msg.sender === currentUser._id
                                        ? "bg-[#21978B] text-white rounded-tl-xl"
                                        : "bg-slate-100 text-gray-800 rounded-tr-xl"
                                        }`}
                                >
                                    <p className="message-text break-words">{msg.message}</p>
                                    <small className="message-time text-xs mt-1 block">
                                        {formatTimestamp(msg.timestamp)}
                                    </small>
                                </div>

                                {msg.sender === currentUser._id && (
                                    <Link to={`/${currentUser.username}`}>
                                        <img
                                            src={currentUser.profileImage || "https://via.placeholder.com/150"}
                                            alt="Current User"
                                            className="w-8 h-8 -mt-5 rounded-full"
                                        />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full flex items-center justify-center py-10">
                        <img
                            src={wavyAnimation}
                            alt="Say Hi"
                            className="h-auto w-36"
                        />
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* {chatData.length > 0 &&
                chatData.map((item, index) => (
                    <div key={index} className="max-w-[90%] flex flex-col gap-6">
                        <div className="flex gap-5 items-start">
                            <img
                                className="h-10 w-10 rounded-full object-contain"
                                src={users.currentUser?.profileImage}
                                alt="User"
                            />
                            <p className="text-lg">{item.prompt}</p>
                        </div>

                        <div className="flex gap-5 items-start">
                            <img
                                className="h-10 w-10 rounded-full object-contain"
                                src={AiImage}
                                alt="AI"
                            />
                            {item.isLoading ? (
                                <ChatLoader />
                            ) : (
                                <div className='max-w-none'>

                                    <div className="prose prose-blue">
                                        {/* Display animated response text 
                                        <p dangerouslySetInnerHTML={{ __html: formatResponse(item.response) }}></p>
                                    </div>
                                    <div className='text-sm flex items-center mt-4 text-gray-400 gap-2'>
                                        <Volume2
                                            size={20}
                                            className="cursor-pointer hover:text-blue-500"
                                            onClick={() => handleVoice(item.response)}
                                        />
                                        <Copy
                                            size={16}
                                            className="cursor-pointer hover:text-blue-500"
                                            onClick={() => handleCopy(item.response)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))} */}
        </div>
    )
}

export default ChatPreview