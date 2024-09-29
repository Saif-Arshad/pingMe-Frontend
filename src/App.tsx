import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
// import LoginMain from './pages/Login/LoginMain';
import SignInSignUp from './pages/Login/LoginMain';
import { getAllUsers, getCurrentUser } from './store/features/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import UserProfile from './pages/profile/UserProfile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainChat from './pages/chat/MainChat';
import { ProtectedRoutes } from './utils/protectedRoutes';
import MainChatDetail from './pages/chat-detail.tsx/main-chat-detail';
// interface Message {
//   text: string;
//   id: string;
//   time: string;
//   socketID: string;
// }

function App() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const userToken = localStorage.getItem('pingMe_token');
  const { currentUser } = useSelector((state: any) => state.user)

  useEffect(() => {
    if (userToken) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(getCurrentUser(userToken))
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(getAllUsers(userToken))
    }
  }, [dispatch, userToken]);
  // const [message, setMessage] = useState('');
  // const [allMessage, setAllMessage] = useState<Message[]>([]);
  const [socket, setSocket] = useState<any>(null);

  // return () => {
  //   newSocket.off('message_receive');
  //   newSocket.disconnect();
  // };
  // newSocket.on('message_receive', (data: Message) => {
  //   console.log("Data From Backend:", data);
  //   setAllMessage((prev) => [...prev, data]);
  // });

  useEffect(() => {
    if (currentUser?._id) {
      const newSocket = socketIO(`${import.meta.env.VITE_BACKEND_URL}`, {
        query: { userId: currentUser._id }, // Pass userId to the server
      });

      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [currentUser]);

  // const messageHandler = () => {
  //   if (!socket) return;

  //   socket.emit('message_send', {
  //     text: message,
  //     id: `${socket.id}${Math.random()}`,
  //     time: `${new Date(new Date().setHours(new Date().getHours() + 1)).getHours()}:${new Date(new Date().setMinutes(new Date().getMinutes() + 1)).getMinutes()}:${new Date().getSeconds()}`,
  //     socketID: socket.id,
  //   });
  //   setMessage('');
  // };

  return (
    <>
      {/* <div className='flex flex-col w-96 mx-auto mt-11 items-start'>
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
          
      </div> */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={userToken ? "/chat" : "/account"} replace />}
          />

          <Route element={<ProtectedRoutes />}>
            <Route path="/chat" element={<MainChat socket={socket} />} />
          </Route>
          <Route
            path="/account"
            element={userToken ? <Navigate to="/chat" replace /> : <SignInSignUp />}
          />
          <Route
            path="/:id"
            element={!userToken ? <Navigate to="/account" replace /> : <UserProfile />}
          />
          <Route
            path="chat/:id"
            element={!userToken ? <Navigate to="/account" replace /> : <MainChatDetail socket={socket} />}
          />
        </Routes>
      </Router>

    </>
  );
}

export default App;
