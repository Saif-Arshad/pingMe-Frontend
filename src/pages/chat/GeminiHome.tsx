import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    MapPin,
    Lightbulb,
    MessageSquare,
    Code,
    Book,
    Cpu,
    Activity,
    Smile,
    Clock,
    Layers,
    Users,
    Palette,
    Brain,
    Cloud,
    Youtube,
    Monitor,
    Mic,
    Rocket,
    TrendingUp,
} from 'lucide-react';
import ChatInput from '../../components/ChatInput';
import AiPreview from './AiPreview';
import aiImage from '../../assets/icons/logo.png'
const data = {
    header: {
        title: 'Hello, There.',
        subtitle: 'How can I help you today?',
    },
    cards: [
        { text: 'Suggest beautiful places to see on an upcoming road trip', icon: MapPin },
        { text: 'Briefly summarize the concept: urban planning', icon: Lightbulb },
        { text: 'Brainstorm bonding activities for our work retreat', icon: MessageSquare },
        { text: 'Tell me about React JS and React Native', icon: Code },
        { text: 'Recommend books for self-improvement', icon: Book },
        { text: 'Explain the basics of AI and ML', icon: Cpu },
        { text: 'How to stay productive at work?', icon: Activity },
        { text: 'Tips for a healthy work-life balance', icon: Smile },
        { text: 'Share some time management techniques', icon: Clock },
        { text: 'What is blockchain technology?', icon: Layers },
        { text: 'Suggestions for team-building exercises', icon: Users },
        { text: 'What are the latest design trends?', icon: Palette },
        { text: 'Help with brainstorming creative ideas', icon: Brain },
        { text: 'Give an overview of cloud computing', icon: Cloud },
        { text: 'How to improve coding skills?', icon: Code },
        { text: 'Recommend online courses for learning', icon: Youtube },
        { text: 'What are the best practices for remote work?', icon: Monitor },
        { text: 'Suggest some motivational podcasts', icon: Mic },
        { text: 'What is the future of technology?', icon: Rocket },
        { text: 'Explain the concept of digital marketing', icon: TrendingUp },
    ],
};

// Function to get random cards
const getRandomCards = (cards: any, numberOfCards: number) => {
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfCards);
};

const Main = ({ socket }: any) => {
    const [randomCards, setRandomCards] = useState<any[]>([]);
    const [currentCard, setCurrentCard] = useState<string>('');
    const [allMessage, setAllMessage] = useState<any>();
    const [numberOfCards, setNumberOfCards] = useState(4);
    const [chat, setChat] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentCard) {
            setChat(currentCard);
        }
    }, [currentCard]);

    useLayoutEffect(() => {
        const updateNumberOfCards = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 740) {
                setNumberOfCards(2);
            } else if (screenWidth < 1024) {
                setNumberOfCards(3);
            } else {
                setNumberOfCards(4);
            }
        };

        updateNumberOfCards();
        window.addEventListener('resize', updateNumberOfCards);

        return () => window.removeEventListener('resize', updateNumberOfCards);
    }, []);

    useEffect(() => {
        const randomCard = getRandomCards(data.cards, numberOfCards);
        setRandomCards(randomCard);
    }, [numberOfCards]);

    useEffect(() => {
        if (socket && chat.length > 0) {
            setLoading(true);
            setAllMessage(
                {
                    prompt: chat,
                    isLoading: true,
                    response: "",
                },
            );
            socket.emit('generate_content', { chat });

            socket.on('content_generated', (data: any) => {
                setAllMessage(
                    data
                );
                setLoading(false);
            });

            socket.on('error', (error: any) => {
                console.error(error.message);
                setLoading(false);
            });

            return () => {
                socket.off('content_generated');
                socket.off('error');
            };
        }
    }, [chat, socket]);

    return (
        <div className="flex flex-col max-h-screen mb-4  2xl:mt-14 relative w-full">
            {(loading || allMessage) ? (
                <div className='flex flex-col'>

                    <div className='w-full px-5 flex items-center max-h-[60px] min-h-[60px] bg-[#f5f5f5] rounded-lg '>
                        <div className='flex items-center'>

                            <img
                                className="h-10 w-10 rounded-full object-contain"
                                src={aiImage}
                                alt="AI"
                            />
                            <div className='flex flex-col'>
                                <h3 className='font-medium text-gray-600 ml-3'>Ping Me</h3>
                                <span className='text-green-700 text-xs ml-3'>Online</span>
                            </div>

                        </div>
                    </div>
                    <AiPreview chat={chat} allMessage={allMessage} loading={loading} />
                </div>
            ) : (
                <div className='pl-4 xl:pl-6 2xl:pl-32'>
                    <div className="mt-12 2xl:mt-20 mb-5 2xl:mb-8 font-medium text-gray-400 px-3">
                        {/* <img
                            className='h-auto w-16 2xl:w-20 pb-3 2xl:pb-5 mix-blend-multiply'
                            src={aiImage}
                        /> */}
                        <p
                            className="bg-clip-text font-bold text-4xl lg:text-5xl 2xl:text-6xl text-transparent bg-gradient-to-r from-[#21978B] via-[#306d81] to-[#21978B]">
                            {data.header.title}
                        </p>
                        <p
                            style={{
                                fontFamily: "italic_eiko"
                            }}
                            className="text-3xl 2xl:text-5xl text-[#c4c7c5] mt-2">{data.header.subtitle}</p>
                    </div>
                    <div className="flex gap-4 p-3 mt-2 2xl:mt-10">
                        {randomCards.map((card, index) => (
                            <div
                                onClick={() => setCurrentCard(card.text)}
                                key={index}
                                className="min-h-[150px] w-[200px] xl:w-[210px] 2xl:w-[300px] group p-4 bg-slate-100 rounded-lg relative cursor-pointer hover:bg-slate-200 flex flex-col gap-4"
                            >
                                <p className="text-gray-600 text-base 2xl:text-lg">{card.text}</p>
                                <div className="text-gray-500 group-hover:text-white text-sm 2xl:text-base group-hover:bg-[#21978B] transition-all absolute bottom-3 right-3 bg-slate-200 rounded-full p-2">
                                    {React.createElement(card.icon, { size: 23 })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="absolute bottom-0 w-full px-5 mx-auto">
                <ChatInput setChat={setChat} />
                <p className="mt-3 text-center text-sm font-light text-gray-600">
                    Ping me may display inaccurate info, including about people, so double-check its responses.
                </p>
            </div>
        </div>
    );
};

export default Main;
