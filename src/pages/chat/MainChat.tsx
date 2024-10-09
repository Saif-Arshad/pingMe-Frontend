import { useState } from 'react'
import SideIcons from '../../components/SideIcons'
import GeminiHome from './GeminiHome'

function MainChat({ socket }: any) {
    const [isPreview, setIsPreview] = useState(false)

    return (
        <div className='flex max-h-screen'>
            <SideIcons socket={socket}
                isPreview={isPreview}
                setIsPreview={setIsPreview}
            />
            <GeminiHome socket={socket} 
                isPreview={isPreview}
                setIsPreview={setIsPreview}
            />
        </div>
    )
}

export default MainChat