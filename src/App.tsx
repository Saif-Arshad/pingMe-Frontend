
import socketIO from 'socket.io-client';
function App() {

  const socket = socketIO('http://localhost:3000');
  console.log("🚀 ~ App ~ socket:", socket)
  const messageHandler = () => {
    socket.emit('message', {
      text: "Hi i am saif Ur Rehman",
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
  }
  return (
    <>
      <button onClick={messageHandler}>
        Send Message
      </button>
    </>
  )
}

export default App
