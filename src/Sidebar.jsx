import "./Sidebar.css"
import { useContext, useEffect } from "react"
import { MyContext } from "./MyContext.jsx"
import { v1 as uuidv1 } from "uuid"

function Sidebar() {

    const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext)
    const getAllThreads = async () => {

        try {
            const response = await fetch(`${import.meta.env.NEXT_PUBLIC_VITE_API_URL}/api/thread`);
            const res = await response.json()
            const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }))
            console.log(filteredData);
            setAllThreads(filteredData)



        } catch (error) {
            console.log(error);


        }

    }

    useEffect(() => {
        getAllThreads()

    }, [])




    const createNewChat = () => {
        setNewChat(true)
        setPrompt("")
        setReply(null)
        setCurrThreadId(uuidv1())
        setPrevChats([])
    }

    const changeThread = async (newThreadId) => {
        setCurrThreadId(newThreadId)
        try {
            const response = await fetch(`${import.meta.env.NEXT_PUBLIC_VITE_API_URL}/api/thread/${newThreadId}`);

            const res = await response.json()
            console.log(res);
            setPrevChats(res)
            setNewChat(false)
            setReply(null)

        } catch (error) {
            console.log(error);


        }

    }

    const deleteThread = async (threadId) => {
        const response = await fetch(`${import.meta.env.NEXT_PUBLIC_VITE_API_URL}/api/thread/${threadId}`, { method: "DELETE" });

        const res = await response.json();
        console.log(res);

        //Upated chat ko re-render karana padega
        setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId))
        if (threadId == currThreadId) {
            createNewChat();

        }


    }

    return (
        <section className="sidebar">
            <button onClick={createNewChat}>
                <span className="newChatLabel"> <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo" />  New Chat  </span>
                <i className="fa-solid fa-pen-to-square"></i>

            </button>

            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx}
                            onClick={(e) => changeThread(thread.threadId)}
                            className={thread.threadId === currThreadId ? "highlighted" : ""}  >
                            {thread.title}
                            <i className="fa-solid fa-trash" onClick={(e) => {
                                e.stopPropagation();//stop event bubbling
                                deleteThread(thread.threadId)

                            }}></i>

                        </li>
                    ))
                }
            </ul>

            <div className="sign">
                <p>By Shashank &hearts;</p>
            </div>



        </section>
    )
}
export default Sidebar