import ChatSideBar from '../../components/chatSideBar'
import GeminiHome from './GeminiHome'

function MainChat({socket}:any) {
    return (
        <div className='flex max-h-screen'>
            <ChatSideBar />
            <GeminiHome socket={socket} />
        </div>
    )
}

export default MainChat