import "./App.css"
import { MyContext } from "./MyContext.jsx"
import Sidebar from "./Sidebar.jsx"
import ChatWindow from "./ChatWindow.jsx"
import { useState } from "react"
import {v1 as uuidv1} from "uuid"

function App() {
  const [prompt,setPrompt]=useState("")
  const [reply,setReply]=useState(null)
  const [prevChats,setPrevChats]=useState([]) //Stores all the chats of curr threads
  const [newChat,setNewChat]=useState(true)
  const [allThreads,setAllThreads]=useState([])

  const [currThreadId,setCurrThreadId]=useState(uuidv1())
  const providerValues = {
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    newChat,setNewChat,
    prevChats,setPrevChats,
    allThreads,setAllThreads
  };



  return (

    <div className='app'>
      <MyContext.Provider value={providerValues}>

        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>



      </MyContext.Provider>


    </div>


  )
}

export default App
