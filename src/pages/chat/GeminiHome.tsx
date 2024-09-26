import React, { useEffect, useState } from 'react';
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
import { useAi } from '../../customHooks/useAi';

// JSON Data
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
const getRandomCards = (cards: any) => {
    const shuffled = cards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
};

const Main = () => {
    const [randomCards, setRandomCards] = useState([]);
    const [currentCard, setCurrentCard] = useState<any>("");
    const { setPrompt } = useAi()
    useEffect(() => {
        if (currentCard.length > 0) {
            setPrompt(currentCard);
        }
    }, [currentCard])
    useEffect(() => {
        setRandomCards(getRandomCards(data.cards));
    }, []);

    return (
        <div className="flex flex-col max-h-screen mb-4 mt-14 relative w-full ">


            <div className=' pl-20 2xl:pl-32'>
                <div className="mt-12 mb-8 font-medium text-gray-400 px-3">
                    <img
                        className=' h-auto w-20 pb-5  mix-blend-multiply'
                        src="/src/assets/icons/logo.png"
                    />
                    <p
                        className="bg-clip-text font-bold text-4xl 2xl:text-6xl text-transparent bg-gradient-to-r from-[#5f4681] via-[#ff69b4] to-[#ff5546]">
                        {data.header.title}
                    </p>

                    <p className="text-4xl 2xl:text-5xl text-[#c4c7c5] mt-2">{data.header.subtitle}</p>
                </div>

                <div className="flex gap-4 p-3 mt-10">
                    {randomCards.map((card: any, index) => (
                        <div
                            onClick={() => setCurrentCard(card.text)}
                            key={index}
                            className="min-h-[150px] w-[300px] group p-4 bg-slate-100 rounded-lg relative cursor-pointer hover:bg-slate-200 flex flex-col  gap-4"
                        >
                            <p className="text-gray-600 text-lg">{card.text}</p>
                            <div className="text-black group-hover:text-white group-hover:bg-[#4b176b] transition-all absolute bottom-3 right-3 bg-white rounded-full p-2">
                                {React.createElement(card.icon, { size: 27 })}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div className="absolute bottom-0 w-full  px-5 mx-auto">
                <ChatInput />
                <p className="mt-3 text-center text-sm font-light text-gray-600">
                    Ping me may display inaccurate info, including about people, so double-check its responses.
                </p>
            </div>
        </div>
    );
};

export default Main;
