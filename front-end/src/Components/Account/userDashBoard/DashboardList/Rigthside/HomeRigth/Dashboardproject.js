import React from 'react'
import './Dashboardp.css'
import axios from '../../../../../../axios'
import { useHistory , Link } from 'react-router-dom'
import UserPerso from '../Personal/PersonalPage'
function Dashboardproject({name , tasks , _id}) {

    const navigate = useHistory()
    console.log(_id)

    const startProject = () => {
        localStorage.removeItem("user_working_project")
        localStorage.setItem("user_working_project" , _id)
        navigate.push("userpersonal")
    }

    return (
        <div className="userdashboard_project">
            <div className="userdashboard_project_projectheader">
                <h2>{name}</h2>
                <button onClick={startProject}>Work on</button>
                
            </div>
            
            <table>
                <thead>
                    <th>Tasks name</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Priority</th>
                </thead>
                <tbody>

                    {
                        tasks.map(task => (
                            <tr>
                                <td>{task.name}</td>
                                <td>{task.start_date}</td>
                                <td>{task.end_date}</td>
                                <td>{task.priority}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <hr></hr>
        </div>
    )
}

export default Dashboardproject
