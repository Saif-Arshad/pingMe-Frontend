import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AiImage from '../../assets/icons/logo.png';
import ChatLoader from '../../components/ChatLoader';
import { Copy, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';
// import useTypingEffect from '../../customHooks/useTypingEffect';

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

    useEffect(() => {
        if (allMessage) {
            setChatData((prev) => {
                const index = prev.findIndex((item: any) =>
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

            // If response exists, start the animation
            if (allMessage.response) {
                let index = 0;
                let animatedResponse = "";
                const intervalId = setInterval(() => {
                    if (index < allMessage.response.length) {
                        animatedResponse += allMessage.response[index];
                        setChatData((prev) => {
                            const updatedChatData = [...prev];
                            const messageIndex = updatedChatData.findIndex((item: any) => item.prompt === allMessage.prompt);
                            if (messageIndex !== -1) {
                                updatedChatData[messageIndex] = {
                                    ...updatedChatData[messageIndex],
                                    response: animatedResponse,
                                    isLoading: false // set isLoading to false to stop loader once animation starts
                                };
                            }
                            return updatedChatData;
                        });
                        index++;
                    } else {
                        clearInterval(intervalId);
                    }
                }, 18);

                return () => clearInterval(intervalId);
            }
        }
    }, [allMessage]);

    useEffect(() => {
        if (chatData.length > 1) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat, chatData]);

    // Copy text to clipboard
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Copied to clipboard!');

        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    // Read text aloud
    const handleVoice = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    };

    return (
        <div
            style={{
                maxHeight: 'calc(100vh - 120px)',
                minHeight: 'calc(100vh - 120px)',
            }}
            className="overflow-y-auto p-3 pl-32 pt-10 pb-20 no-scrollbar"
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
                                <div className='max-w-none'>

                                    <div className="prose prose-blue">
                                        {/* Display animated response text */}
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
                ))}
        </div>
    );
}

export default AiPreview;
