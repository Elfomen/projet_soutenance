import React , { useState , useEffect } from 'react'
import './indexChat.css'
import ChatLeft from './ChatBody/ChatLeft/ChatLeft'
import ChatRigth from './ChatBody/ChatRight/ChatRigth'
import axios from '../../axios'
function IndexChat() {

    const [ projects , setProjects ] = useState([])

    const [user , setUser] = useState({})

    const [ wait , setW ] = useState(false)

    const [ch , setCh] = useState()


    useEffect(async() => {
        setW(true)
        const data = await axios.get(`/users/user/verify/${localStorage.getItem("current_user")}`)

        const use = data.data[0]

        setProjects(use.projects)

        setUser(use)
        setW(false)
    } , [])

    return (
        <div className="indexchat__main">
            <div className="indexchat__body">
                <ChatLeft projects={projects} change = {e => setCh(e)} wait={wait}/>

                <ChatRigth user={user} projects={projects} changeGroup={ch}/>
            </div>
            
        </div>
    )
}

export default IndexChat
