import React , { useState , useEffect } from 'react'
import './Details.css'
import AddIcon from '@material-ui/icons/Add';
import ProgressBar from '../../Progressbar/Progress'
import { useHistory } from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'
import { getAllUsers , addUserToProject } from '../../redux/actions/usersActions'
import {createNewTask} from '../../redux/actions/Projectactions'
import { getProjectsFromAdmin } from '../../redux/actions/Projectactions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CircleLoader } from 'react-spinners'
function Details({id}) {

    const [showForm , setShowForm] = useState({
        task : false , 
        user : false
    })

    const [ addingUserToProject , setAUP ] = useState(false)

    const userColors = ["#b30086" , "#2e2eb8" , "#0099cc" , "#b30000" , "#004d00" , 
"#004d4d" , "#003cb3" , "#997300" , "#3d5c5c" , "#005c99"]

    const [errorMessage , setErrorMessage] = useState("")

    const [userInput , setUserInput] = useState("")

    const [ task , setTask ] = useState({
        name : "" , 
        worker : "" , 
        start_date : "" , 
        end_date : "" , 
        priority : "" , 
        status : "Awaiting list..." , 
        percentage_change : 0
    })

    const running_project = localStorage.getItem("running_project")
    var project = {}

    const dispatch = useDispatch()

    const allProjects = useSelector(state => state.projects)

    const allUsers = useSelector(state => state.users)

    const { projects , loading , error } = allProjects
    const { users , user_loading, user_error } = allUsers
    console.log(projects)

    var expectedUsers = []

    //test if the user email entered exist or not

    const verifyUserEntered = () => {
        for(var i = 0 ; i < users.length ; i++){
            if(users[i].email === userInput){
                setErrorMessage("")
                return
            }
        }

        setErrorMessage("This user does not exists... Let him create his yann helper account")
    }

    const setExpectedUsers = () => {
        for(var i = 0 ; i < users.length ; i++){
            for(var j = 0 ; j < users[i].projects.length ; j++){
                if(users[i].projects[j] === localStorage.getItem("running_project")){
                    console.log(true)
                    expectedUsers = [
                        ...expectedUsers , 
                        users[i]
                    ]
                }
            }
        }
    }

    setExpectedUsers()
    
    
    var expectedProject = projects.length&&projects.filter((project , i) => project._id===localStorage.getItem("running_project")) 
    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getProjectsFromAdmin(localStorage.getItem("current_admin")))
    } , [dispatch])


    const addProjectToUser = () => {
        if(userInput!==""){
            verifyUserEntered()
            const us = users.filter(user => user.email===userInput)
            if(errorMessage==="" && us.length){
                setAUP(true)
                dispatch(addUserToProject(us[0]._id , localStorage.getItem("running_project")))
                setAUP(false)
                setUserInput("")
            }  
        }else{
            setErrorMessage("Please enter the user's email")
        }
         
        
    }

    const verifyTask = () => {
        return task.name!=="" &&task.worker!==""&&task.start_date!==""&&task.end_date!==""
        &&task.priority!==""
    }

    const assignTaskToUser = () => {

        var userId = ""

        for(var i = 0 ; i < expectedUsers.length ; i++){
            if(expectedUsers[i].name === task.worker){
                userId=expectedUsers[i]._id
            }
        }

        if(verifyTask()){
            dispatch(createNewTask(localStorage.getItem("running_project") , task , userId))
            setErrorMessage("")
            setTask({
                name : "" , 
                worker : "" , 
                start_date : "" , 
                end_date : "" , 
                priority : "" , 
                status : "Awaiting list..." ,
                percentage_change : 0
            })
            //setExpectedUsers()
            console.log("entered")
        }else{
            setErrorMessage("Please fill out all the informations needed")
        }
    }








    //this function will help manage state when we click on the add task or add participant

    const manageStateForm = (part) => {
        if(part){
            setShowForm({
                task : false , 
                user : !showForm.user
            })
        }else{
            setShowForm({
                task : !showForm.task , 
                user: false
            })
        }
    }

    return (
        <div className="projectdetails">
            {errorMessage && <h1 className="error">{errorMessage}</h1>}
            <div className="projectdetails__operations">
                <div className="projectdetails__participants">
                    <p>Project participants</p>
                    <div className="participants">

                        {
                            user_loading ? <div className="loader_participants"><CircularProgress color="secondary"/> <p>Loading participants...</p></div>:
                            user_error ? setErrorMessage(error) : expectedUsers.length&&expectedUsers.map(user => (
                                <p>{user.name[0]}{user.name[1]}</p>
                            ))
                        }
                    </div>
                    <div className="participants">
                        
                    </div>
                    <div className="projectdetails_description">
                        <p>{expectedProject.length&&expectedProject[0].description}</p>
                    </div>
                </div>
                <div className="projectdetails__operation">
                    <div className="add_participants_container">
                        <p>Participant</p>
                        <button onClick={() => manageStateForm(true)}><AddIcon /></button>
                    </div>
                    <div className="add_tasks_container">
                        <p>Tasks</p>
                        <button onClick={() => manageStateForm(false)}><AddIcon /></button>
                    </div>
                    <div className="add_participant_form" style={{
                        display : showForm.user?'flex':'none'
                    }}>
                        
                        <table>
                            <thead>
                                <th>Add new participant</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input value={userInput} onChange={e => setUserInput(e.target.value)}
                                         type="email" placeholder="Enter participant e-mail"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button onClick={addProjectToUser}>{addingUserToProject ? <CircularProgress color="default"/> : "Add Project"}</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="add_task_form" style={{
                        display:showForm.task?'flex':'none'
                    }}>
                        <table>
                            <thead>
                                <th>Asign new task to participant</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input placeholder="Enter task name" value={task.name}
                                        onChange={e => setTask({
                                            ...task , 
                                            name: e.target.value
                                        })}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="dont_show">
                                        <p>Asign task to</p>
                                        <select value={task.worker}
                                        onChange={e => setTask({
                                            ...task , 
                                            worker: e.target.value
                                        })}>
                                            <option>---select---</option>
                                            {
                                                expectedUsers.map(user => (
                                                    <option>{user.name}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="dont_show">
                                        <p>Start date</p>
                                        <input type="date" value={task.start_date}
                                        onChange={e => setTask({
                                            ...task , 
                                            start_date: e.target.value
                                        })}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="dont_show">
                                        <p>End date</p>
                                        <input type="date" value={task.end_date}
                                        onChange={e => setTask({
                                            ...task , 
                                            end_date: e.target.value
                                        })}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="dont_show">
                                        <p>Select priority</p>
                                        <select value={task.priority}
                                        onChange={e => setTask({
                                            ...task , 
                                            priority: e.target.value
                                        })}>
                                            <option>---select---</option>
                                            <option>HIGH</option>
                                            <option>MEDIUM</option>
                                            <option>LOW</option> 
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button onClick={assignTaskToUser}>Asign task to <p>{task.worker}</p></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="projectdetails__details">
            {loading ? <LinearProgress color="secondary"/> : error && setErrorMessage(error)}
                <p>Tasks management</p>
                <table>
                    <thead>
                        <th>Task Name</th>
                        <th>Worker</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Progress percentage</th>
                    </thead>
                    <tbody>

                        {
                            projects.map(project => (
                                project._id===localStorage.getItem("running_project")&&
                                project.tasks.map((task , i) => (
                                    <tr>
                                        <td>{task.name}</td>
                                        <td>
                                            {
                                                expectedUsers.map(user => (
                                                    user._id===task.worker && user.name&& <p
                                                    style={{backgroundColor : userColors[Math.floor(Math.random() * 9) + 1]}} className="worker">{user.name[0]}{user.name[1]}</p>
                                                ))
                                            }
                                        </td>
                                        <td style={{backgroundColor : task.priority==="HIGH" ?
                                        "#004d00" : task.priority==="MEDIUM" ? '#0099e6' : '#990000'}}><p className="prio">{task.priority}</p></td>
                                        <td style={{backgroundColor : task.percentage_change===0 ? "#33334d":
                                    task.percentage_change > 0 && task.percentage_change < 100 ? "#004d99" : "#004d00"}}><p className="status">{task.percentage_change===0 ? 'Awaiting list' : 
                                    (task.percentage_change > 0&&task.percentage_change < 100) ? 'Running...' : 'Completed'}</p></td>
                                        <td className="progress_change">{ task.percentage_change!==0?<ProgressBar done={task.percentage_change}/>:<p style={{ color:"#f4f4f4" }}>0 %</p>}</td>
                                    </tr>
                                ))
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Details
