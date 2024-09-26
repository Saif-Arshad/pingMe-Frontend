import ChatSideBar from '../../components/chatSideBar'
import GeminiHome from './GeminiHome'

function MainChat() {
    return (
        <div className='flex max-h-screen'>
            <ChatSideBar />
            <GeminiHome />
        </div>
    )
}

export default MainChat