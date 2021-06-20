import React , { useState , useEffect } from 'react'
import './ChatRigth.css'
import { IconButton , Avatar } from '@material-ui/core'
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import SendIcon from '@material-ui/icons/Send';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from '../../../../axios'
import Pusher from 'pusher-js'
import { useHistory } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PulseLoader } from 'react-spinners'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Error from '../../../Error/Error'

function ChatRigth({projects , user , changeGroup}) {

    const navigate = useHistory()

    const [ errorMessage , setEM ] = useState("")

    const [ messages , setMessages ] = useState([])

    const [ wait , setWait ] = useState(false)
    const [ sending , setSending ] = useState(false)

    const [project_name , setProjectN] = useState("")

    const [input , setInput] = useState({
        message : "" , 
    })

    const loggoutChat = () => {
        navigate.push("/userpersonal")
    }

    
    useEffect(() => {
        localStorage.setItem("change_project_message_group" , localStorage.getItem("user_working_project"))
    } , [])

    useEffect(async() => {
        try{
            setWait(true)
            const data =  await axios.get(`/project/getone/${localStorage.getItem("change_project_message_group")}`)
            
            setMessages(data.data.messages)

            setProjectN(data.data.name) 
            setWait(false)
        }catch(error){
            setEM("Slow connection please reload page")
        }
        
    } , [changeGroup]) // when the group changes on the left side, after getting the new project 
    // we set the project_name to the current_project name that will help to display messages without bugs
    

    useEffect(() => {
        var pusher = new Pusher('c0dc39d501d4e7a8bd2c', {
          cluster: 'eu'
        });
    
        var channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
          setMessages([
              ...messages , 
              data
          ])

        });

        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }
      } , [messages])

      const sendMessage = async(e) => {

          e.preventDefault()
        if(input.message!==""){
            try {
                setSending(true)
                await axios.post("/messages/new" , {
                ...input , 
                sender : user.name ,
                receiver : project_name , 
                send_date : new Date().toUTCString()
                })
                await axios.put("/project/messages/new" , {
                    project : localStorage.getItem("change_project_message_group")
                })

                setInput({
                    message : ""
                })
                setSending(false)
            } catch (error) {
                setEM("Slow connection please reload pages")
            }
            


        }
      }
    


    return (
        <div className="chatrigth_main">
             {errorMessage && <Error message={errorMessage}/>}
            <div className="chatrigth_nav">
                <div className="currentuser_avatar">
                    <IconButton>
                        <Avatar src="https://avatars.githubusercontent.com/u/75611134?s=60&v=4"/>
                    </IconButton>
                    <span>{user&&user.name}</span>
                </div>

                <IconButton>
                    <EqualizerIcon />
                </IconButton>
                <IconButton>
                    <SyncProblemIcon />
                </IconButton>
                <IconButton>
                    <PermMediaIcon />
                </IconButton>
                <IconButton onClick={loggoutChat}>
                    <ExitToAppIcon />
                </IconButton>
                
            </div>

            <div className="chatrigth_body">
                

                {
                    wait ? <LinearProgress color="secondary"/> : messages.length&& messages.map(message => (
                        message.receiver===project_name&&
                        <p className={`${message.sender===user.name ? 'message sender' : 'message receiver'}`}>
                            <span className="message_owner">{message.sender}</span>
                            {message.message}
                            <span className="message_time">{ message.send_date }</span>
                            {message.sender===user.name&&<DoneAllIcon className="hide"/>}
                        </p>
                    ))

                }

                {
                    sending && <p className="message sender">
                       {input.message}
                        <span className="message_time">Sending.....</span>
                    </p>
                }

                <div style={{marginTop : "30px" , height : "50px"}}></div>
                
            </div>
            <div className="chat_footer">
                <IconButton>
                    <SentimentVerySatisfiedIcon />
                </IconButton>

                <form onSubmit={sendMessage}>
                    <input placeholder="Type a message here" value={sending ? "" : input.message}
                    onChange={e => setInput({
                        ...input , 
                        message : e.target.value
                    })}/>
                    <IconButton onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>
                </form>
                
            </div>
        </div>
    )
}

export default ChatRigth
