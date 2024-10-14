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
import toast from 'react-hot-toast';


function App() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const userToken = localStorage.getItem('pingMe_token');
  const { currentUserId, currentUser } = useSelector((state: any) => state.user)
  const [socket, setSocket] = useState<any>(null);

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

  useEffect(() => {
    if (currentUser && socket) {
      currentUser.roomHistory.forEach((room: any) => {
        const roomId = {
          sender: currentUser._id,
          receiver: room.participants.find((p: any) => p !== currentUser._id),
        };
        socket.emit('joinRoom', roomId);
      });
    }
  }, [currentUser, socket]);


  useEffect(() => {
    if (currentUserId) {
      if (!socket) {
        const newSocket = socketIO(`${import.meta.env.VITE_BACKEND_URL}`, {
          query: { userId: currentUserId },
          transports: ['websocket', 'polling'],
        });

        setSocket(newSocket);

        // Cleanup function to handle socket disconnection when the component unmounts or currentUserId changes
        return () => {
          if (newSocket) {
            newSocket.disconnect();
          }
        };
      } else {
        // Update the query parameters if the socket already exists
        socket.io.opts.query = { userId: currentUserId };
        socket.connect(); // Reconnect the socket with the updated query parameters
      }
    }

    // Cleanup when component unmounts or when currentUserId changes
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [currentUserId, socket]);


  if (socket) {
    socket.on("error", (data: any) => {
      toast.error(data.message)
    })
    // socket.on("block", (data: any) => {
    //   const { currentUserId } = data
    //   dispatch(blockUsers(currentUserId))

    // })
    // socket.on("unBlock", (data: any) => {
    //   const { currentUserId } = data
    //   dispatch(unBlockUsers(currentUserId))

    // })
  }

  return (
    <>

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
