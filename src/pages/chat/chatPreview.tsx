
function ChatPreview() {


    // const bottomRef = useRef<null | HTMLDivElement>(null);
    // useEffect(() => {
    //     if (chatData.length > 1) {
    //         bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, [chat, chatData]);
    return (
        <div
            style={{
                maxHeight: 'calc(100vh - 120px)',
                minHeight: 'calc(100vh - 120px)',
            }}
            className="overflow-y-auto p-3 pl-32 pt-10 pb-20 no-scrollbar"
        >
            HI
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
                        <div ref={bottomRef} />
                    </div>
                ))} */}
        </div>
    )
}

export default ChatPreview