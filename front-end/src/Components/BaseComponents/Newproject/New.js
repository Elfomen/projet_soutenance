import React , { useState , useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createNewProject } from '../../redux/actions/Projectactions'
import Error from '../../Error/Error'
import './New.css'
function New() {

    const [errorMessage , setEM] = useState("")

    const dispatch = useDispatch()

    const navigate = useHistory()

    const [project , setProject] = useState({
        name : "" , 
        description : "" , 
        start_date : "" , 
        end_date : "" 
    })

    const checkEnteries = () => {
        return project.name!=="" && project.description!=="" && project.start_date!==""&&project.end_date!==""
    }

    const registerProject = () => {
        if(checkEnteries()){
            dispatch(createNewProject(project , localStorage.getItem("current_admin")))
            navigate.push("/projectlist")
            
            
        }else{
            setEM("Please fill out all the informations below")
        }
    }



    return (
        <div className="project_create">
        <h1>Add a new project</h1>
        <div className="project_create__form">
            <table>
                <thead>
                    <th>Add project informations</th>
                </thead>
                {
                    errorMessage&&<Error message={errorMessage}/>
                }
                <tbody>
                    <tr>
                        <td>
                            <input placeholder="Enter project name" value={project.name}
                            onChange={e => setProject({
                                ...project , 
                                name : e.target.value
                            })}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea placeholder="Enter project description" value={project.description}
                            onChange={e => setProject({
                                ...project , 
                                description : e.target.value
                            })}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="date" placeholder="Enter project start_date" value={project.start_date}
                            onChange={e => setProject({
                                ...project , 
                                start_date : e.target.value
                            })}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="date" placeholder="Enter project ending date" value={project.end_date}
                            onChange={ e => setProject({
                                ...project , 
                                end_date : e.target.value
                            })}/>
                        </td>
                    </tr>
                  
                    <tr>
                        <td>
                            <button onClick={registerProject}>Register project</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="project_create_cancel_btn">
                            <button >Cancel registration</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default New
