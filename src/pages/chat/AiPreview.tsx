import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AiImage from '../../assets/icons/logo.png';
import ChatLoader from '../../components/ChatLoader';
import useTypingEffect from '../../customHooks/useTypingEffect';
// Function to format response with custom HTML
const formatResponse = (response: string): string => {
    const formattedResponse = response
        .replace(/## (.*?)\n/g, '<h1>$1</h1>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br />')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
    return `<div class="response-content">${formattedResponse}</div>`;
};

function AiPreview({ allMessage, chat }: any) {
    const [chatData, setChatData] = useState<any[]>([]);
    const users = useSelector((state: any) => state.user);
    const bottomRef = useRef<null | HTMLDivElement>(null);
    // const [showCursor, setShowCursor] = useState(true);
    // Use the typing effect hook
    const textToShow = useTypingEffect(allMessage?.response || "", 35, true);

    useEffect(() => {
        if (allMessage) {
            setChatData((prev) => {
                const index = prev.findIndex(
                    (item: any) =>
                        item.prompt === allMessage.prompt &&
                        item.response === "" &&
                        item.isLoading === true
                );

                if (index !== -1) {
                    const updatedChatData = [...prev];
                    updatedChatData[index] = allMessage;
                    return updatedChatData;
                }

                return [...prev, allMessage];
            });
        }
        // const cursorInterval = setInterval(() => {
        //     setShowCursor((prev) => !prev);
        // }, 500);

        // return () => clearInterval(cursorInterval);

    }, [allMessage]);

    useEffect(() => {
        if (chatData.length > 1) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat, chatData]);

    return (
        <div
            style={{
                maxHeight: 'calc(100vh - 60px)',
                minHeight: 'calc(100vh - 60px)',
            }}
            className="overflow-y-auto p-3 pl-32 pt-20 pb-20"
        >
            {chatData.length > 0 &&
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
                                <div className="prose prose-blue max-w-none">
                                    {/* Display animated response text */}
                                    <p dangerouslySetInnerHTML={{ __html: formatResponse(textToShow) }}></p>

                                    {/* {showCursor && (
                                            <div className="flex justify-start">
                                                <span className="mt-1 inline-block h-3 w-3 rounded-full bg-black dark:bg-white animate-blink"></span>
                                            </div>
                                        )} */}
                                </div>
                            )}
                        </div>
                        <div ref={bottomRef} />
                    </div>
                ))}
        </div>
    );
}

export default AiPreview;
