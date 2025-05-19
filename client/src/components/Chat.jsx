import { useEffect, useState } from "react"
import BACKGROUND from "./../Assets/woliul-hasan-NPdlSt9EhHM-unsplash.jpg"

const Chat  = ({socket, roomId, username}) => {
    const [userMessage, setUserMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const handleUserMessage = (e) => {
        setUserMessage(e.target.value)
    }

    const SendMessage = async() => {
        setUserMessage("")
        if (!roomId || !socket || !username){
            return window.alert(" Username and room ID has to be set first ")
        }
        if (userMessage !== ""){
            const messageBody = {
                roomId,
                author: username,
                message: userMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            setMessageList((prev) => {
                return [
                    ...prev,
                    messageBody
                ]
            })
            await socket.emit("send_message", messageBody)
        }
    }
    
    useEffect(() => {
        const handleRecieve = (data) => {
            setMessageList((prev) => {
                return [
                    ...prev,
                    data
                ]
            })
        }
        socket.on("recieve_message", handleRecieve)

        return () => {
            socket.off("recieve_message", handleRecieve)
        }
    }, [socket])

    return (
        <div 
            id="chat"
            style={{ backgroundImage: `url(${BACKGROUND})` }}
            className=" flex flex-col gap-3 max-w-[600px] w-full rounded-lg overflow-hidden h-[60dvh] ring-2 ring-black "
        >
            <ul className=" messageBody w-full flex-1 flex flex-col p-2 gap-3 overflow-y-scroll  " >
                {
                    messageList.map((obj, idx) => {
                        console.log(obj?.author)
                        return (
                            <li key={idx} className={` ${obj.author === username ? "me" : "other"} flex flex-col p-2 w-fit rounded-lg  `} >
                                <p className="testing">
                                    {obj?.message}
                                </p>
                                <small>{obj?.author} / {obj?.time}</small>
                            </li>
                        )
                    })
                }
            </ul>
            <div className=" inputMessage flex justify-between items-center gap-2 w-full p-2 " >
                <input className=" formInput " placeholder="Enter message here..." value={userMessage} onChange={handleUserMessage} />
                <button onClick={SendMessage} className=" btn ">
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat