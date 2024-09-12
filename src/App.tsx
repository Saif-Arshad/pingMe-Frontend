import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';

interface Message {
  text: string;
  id: string;
  time: string;
  socketID: string;
}

function App() {
  const [message, setMessage] = useState('');
  const [allMessage, setAllMessage] = useState<Message[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = socketIO(`${import.meta.env.VITE_BACKEND_URL}`);
    setSocket(newSocket);

    newSocket.on('message_receive', (data: Message) => {
      console.log("Data From Backend:", data);
      setAllMessage((prev) => [...prev, data]);
    });

    return () => {
      newSocket.off('message_receive');
      newSocket.disconnect();
    };
  }, []);

  const messageHandler = () => {
    if (!socket) return; 

    socket.emit('message_send', {
      text: message,
      id: `${socket.id}${Math.random()}`,
      time: `${new Date(new Date().setHours(new Date().getHours() + 1)).getHours()}:${new Date(new Date().setMinutes(new Date().getMinutes() + 1)).getMinutes()}:${new Date().getSeconds()}`,
      socketID: socket.id,
    });
    setMessage(''); 
  };

  return (
    <>
      <div className='flex flex-col w-96 mx-auto mt-11 items-start'>
        <input
          type="text"
          value={message}
          className='border border-slate-500 p-2 rounded-lg w-full'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={messageHandler}
          className='border border-green-400 bg-green-400 rounded-xl px-4 py-2 mt-3 hover:bg-green-700 hover:text-white'
        >
          Send Message
        </button>
      </div>

      <div>
        {allMessage.map((item, index) => (
          <div key={index} className="message-item">
            <p>{item.text}</p>
            <p><small>Time: {item.time}</small></p>
            <p><small>Socket ID: {item.socketID}</small></p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
