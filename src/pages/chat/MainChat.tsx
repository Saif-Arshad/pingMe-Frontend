import SideIcons from '../../components/SideIcons'
import GeminiHome from './GeminiHome'

function MainChat({ socket }: any) {
    return (
        <div className='flex max-h-screen'>
            <SideIcons />
            <GeminiHome socket={socket} />
        </div>
    )
}

export default MainChat