import { useState } from 'react';
import './App.css';
import io from "socket.io-client";
import Chat from './components/Chat';

const socket = io("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  }
  
  const joinRoom = () => {
    if( !username && !roomId ){
      window.alert("User name and Room ID is missing")
    }
    socket.emit("join-room", roomId) // Emits the event to the server with a parameter of roomID
  }

  // console.log(joinRoom)

  return (
    <div className="App flex flex-col justify-between items-center min-h-[100dvh] ">
      <div className=' flex flex-col gap-4 justify-center items-start mt-4 p-[10px] '>
        <h1 className=' text-teal-800 font-bold text-[25px] self-center ' >
          Chat App
        </h1>
        <div className=' flex justify-between gap-4 items-center max-w-[800px] w-full  '>
          <div className=' flex gap-2  items-center w-fit '>
            <p>Username</p>
            <input className='formInput'  type="text" onChange={handleUsernameChange} placeholder="username" />
          </div>
          <div className=' flex gap-2  items-center w-fit '>
            <p>Room ID</p>
            <input className='formInput' type="text" onChange={handleRoomIdChange} placeholder="room ID" />
          </div>
        </div>
        <button onClick={joinRoom} className=' btn ' >
          Join Room
        </button>

        <Chat socket={socket} roomId={roomId} username={username} />
      </div>
      <footer className=' pb-2 ' >
        Powered by <span className=' font-bold '>FAMAKINDE</span>
      </footer>
    </div>
  );
}

export default App;
