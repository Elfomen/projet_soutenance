import React, { useState, useEffect } from 'react'
import './Personalpage.css'
import Nav from '../../Nav/Nav'
import ProgressBar from '../../../../../Progressbar/Progress'
import axios from '../../../../../../axios'
import { getOneUser } from '../../../../../redux/actions/usersActions'
import { createNewSubtask, completeSubTask , getOneProject } from '../../../../../redux/actions/Projectactions'
import { useDispatch, useSelector } from 'react-redux'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import AddIcon from '@material-ui/icons/Add';
import CheckForm from './Sub_task_check'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom'
function PersonalPage() {

    const dispatch = useDispatch()

    const [checkbox, setCB] = useState(false)

    const [subtaskInput, setSTI] = useState(-1)

    const { user, user_loading, user_error } = useSelector(state => state.user)

    const [loadOne , setLO] = useState(false)

    const [sub_task, setST] = useState({
        name: "",
        completed: false
    })

    const { project , loading , error } = useSelector(state => state.project)
    //const workingProject = [ project ]




    useEffect(() => {
        dispatch(getOneUser(localStorage.getItem("current_user")))
        dispatch(getOneProject(localStorage.getItem("user_working_project")))
    }, [dispatch])



    var workingProject = user.length && user[0].projects.filter(project => (
        project._id === localStorage.getItem("user_working_project")
    ))

    const registerSubtask = (id, task, project) => {
        setLO(true)
        if (subtaskInput === id) {
            if (sub_task.name !== "") {
                dispatch(createNewSubtask(project, task, sub_task))
                setST({
                    name: "",
                    completed: false
                })
            }
        }

        if (subtaskInput === id && subtaskInput !== -1) {
            setSTI(-1)
            setST({
                name: "",
                completed: false
            })
        } else if (subtaskInput !== id && subtaskInput !== -1) {
            setSTI(-1)
            setSTI(id)
            setST({
                name: "",
                completed: false
            })
        } else if (subtaskInput === -1) {
            setSTI(id)
            setST({
                name: "",
                completed: false
            })
        }

    }

    const calculateTaskPercentage = (checked, projecte, task, sub_task, task_index, sub_task_index) => {
        setCB(true)
        var completedSubTasks = 0
        var total_sub_tasks = project.tasks[task_index].sub_tasks.length

        if(project){
            for (var i = 0; i < project.tasks.length; i++) {
                if (project.tasks[i]._id === task) {
                    for (var j = 0; j < project.tasks[i].sub_tasks.length; j++) {
                        if (project.tasks[i].sub_tasks[j].completed) {
                            completedSubTasks += 1
                        }
                    }
                }
            }
        }

        if(checked){
            completedSubTasks = completedSubTasks - 1
        }else{
            completedSubTasks = completedSubTasks + 1
        }

        const percentage = Math.floor((completedSubTasks * 100) / total_sub_tasks)

        
        dispatch(completeSubTask(checked, task, sub_task, projecte, percentage))
       
        setCB(false)
        console.log(completedSubTasks)

        
        //dispatch(getOneProject(localStorage.getItem("user_working_project")))


    }

    const calculateProjectPercentage = (tasks) => {
        var completed = 0
        var taille = tasks.length

        for(var i = 0 ; i< tasks.length ; i++){
            completed = completed + tasks[i].percentage_change
        }

        const percent = completed / taille

        return percent
    }

    

    return (
        <div>
            <Nav />
            <div className="personalprojectpage">
                <div className="personalprojectpage_info">
                    <div className="personalprojectpage_info_header">
                        <div className="personalprojectpage_info_header_details">
                            <h1>PROJECTS PROGRESS</h1>

                            { user_loading && !loadOne ? <CircularProgress color="secondary"/> : user.length && user[0].projects.map(pro => (
                                <div className="percentage_project_progress">
                                   <h2>{pro.name}: </h2>
                                    {
                                        <div className="progress">
                                            {
                                            pro._id===project._id ?<ProgressBar done={Math.floor(calculateProjectPercentage(project.tasks)) } />:
                                            <ProgressBar done={Math.floor(calculateProjectPercentage(pro.tasks)) } />}
                                        </div>
                                        
                                    }
                                   
                                </div>
                                
                            )) }

                        </div>

                        <div>
                            
                        </div>

                        <div className="chatgroup">
                            <h1>Access the chat group here</h1>
                            <div className="chatgroup__details">
                                <p>Our application contains a chat group where members of a project can join and discuss about a project</p>
                                <p>Access the chat group from the link below:</p>
                                <a href={`/chatgroup/${localStorage.getItem("user_working_project")}`}>Chat group</a>
                                <p>Make sure you respect the rules of the administrator on the tasks asign to you.</p>
                                <p>You wont be able to participate to a project if an administrator knocks you out.</p>
                            </div>
                        </div>

                        <hr></hr>

                        <div className="description_at_top">
                        {
                                <h1>{project && project.name}</h1>
                            }

                            <h2>Project description</h2>

                            <label>{
                                project && project.description
                            }</label>

                            <p>Time interval (Start and finished)</p>

                            <p>Start date : <p>{project.start_date}</p></p>
                            <p>End date : <p>{project.end_date}</p></p>
                        </div>

                    </div>
                    <div className="personalprojectpage_info_body">
                    {<div className="personalprojectpage_info_body_left">
                            {
                                <h1>{project && project.name}</h1>
                            }

                            <h2>Project description</h2>

                            <label>{
                                project && project.description
                            }</label>

                            <p>Time interval (Start and finished)</p>

                            <p>Start date : <p>{project.start_date}</p></p>
                            <p>End date : <p>{project.end_date}</p></p>
                        </div>}
                        <div className="personalprojectpage_info_body_rigth">
                            <div className="personalprojectpage_info_body_rigth_details">
                                
                                { <table>
                                    <thead>
                                        <th>Task name</th>
                                        <th>Start date</th>
                                        <th>End date</th>
                                        <th>Add sub task</th>
                                        <th>Progress percentage</th>
                                    </thead>
                                    <tbody>
                                        {
                                            project.tasks&& project.tasks.map((task, i) => (
                                                user.length&&(task.worker===user[0]._id&&<tr>
                                                    <td>{task.name}</td>
                                                    <td>{task.start_date}</td>
                                                    <td>{task.end_date}</td>
                                                    <td className="newsubtask"><div><input placeholder="Sub task name"
                                                        style={{ display: subtaskInput === i ? 'flex' : 'none' }}
                                                        value={sub_task.name} onChange={e => setST({
                                                            ...sub_task,
                                                            name: e.target.value
                                                        })} /><p onClick={() =>
                                                            registerSubtask(i, task._id, project._id)}>{subtaskInput !== -1 && subtaskInput === i ? <DoneAllIcon /> : <AddIcon />}</p></div></td>
                                                    <td className="bar"><ProgressBar done={task.percentage_change} /></td>
                                                </tr>
                                            )))
                                        }

                                    </tbody>
                                </table>}
                            </div>
                            <h3>Manage your sub_tasks</h3>

                            <div className="personalprojectpage_info_body_rigth_subtasks">
                                {
                                    project.tasks && project.tasks.map((task, j) => (
                                        (user.length&&(task.worker===user[0]._id))&& task.sub_tasks.length && <div className="personalprojectpage_info_body_rigth_subtasks_container">
                                            <div className="pibrs" key={j}>
                                                <h3>{task.name}</h3>

                                                {task.sub_tasks.map((sub_task, k) => (
                                                    <CheckForm 
                                                    loading={checkbox}
                                                    check={sub_task.completed ?sub_task.completed : false }
                                                    calculate_percent={() => calculateTaskPercentage(sub_task.completed, project._id,task._id, sub_task._id, j, k)}
                                                    name={sub_task.name}
                                                    />
                                                ))}


                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PersonalPage
