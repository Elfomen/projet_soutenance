import React, { useState } from 'react'
import './ChatLeft.css'
import MessageIcon from '@material-ui/icons/Message';
import SyncIcon from '@material-ui/icons/Sync';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton , Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
function ChatLeft({ projects , change= f => f , wait}) {

    const [ch , setCh] = useState(false)


    const leftSideClick = (id) => {
        localStorage.setItem("change_project_message_group" , id)
        setCh(!ch)
        change(ch)
    }

    console.log(projects)

    return (
        <div className="chatleft__main">
            <div className="chatleft__nav">
                <div className="group_icon">
                    <IconButton>
                        <Avatar src="https://tse1.mm.bing.net/th?id=OIP.KPnkKZNbhD51gWB1I6MU3wHaE8&pid=Api&rs=1&c=1&qlt=95&w=154&h=102"/>
                    </IconButton>
                </div>
                
                <IconButton>
                    <MessageIcon />
                </IconButton>
                <IconButton>
                    <SyncIcon />
                </IconButton>
                <IconButton>
                    <AddCircleOutlineIcon />
                </IconButton>
                
                
            </div>
            <div className="chatleft__search">
                <input placeholder="Enter group to search here"/>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                
            </div>

            <div className="chatleft__body">

                {projects&&projects.length && projects.map(project => (
                    wait ? <CircularProgress color="secondary"/> :  <div className="chatleft__body_group" onClick={() => leftSideClick(project._id)}>
                        <div className="chatleft__body_group_avatar">
                            <IconButton>
                                <Avatar src="https://tse1.mm.bing.net/th?id=OIP.7R0TZTZE5hRMUMlG9RidWAHaEK&pid=Api&rs=1&c=1&qlt=95&w=179&h=100"/>
                            </IconButton>
                        </div>

                        <p>
                            <span>{project.name}</span>
                            <span>Group info</span>
                        </p>

                        <p className="message_count">{project.messages.length}</p>
                    </div>
                ))}
            </div>
           
        </div>
    )
}

export default ChatLeft
