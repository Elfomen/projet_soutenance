import React from 'react'
import './Project.css'

import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {Link} from 'react-router-dom'
function Project({ name , description , start_date , end_date , _id , image }) {
    
    const setProject = () => {
        localStorage.removeItem("running_project")
        localStorage.setItem("running_project" , _id)
    }
    
    return (
        <div className="project">
            <div className="project__container_image">
                <img src={image}/>
            </div>

            <div className="project__container_description">
                <p>Project Name : <span>{name}</span> </p>
                <p>Description : <span>{description}</span></p>
                <p>Start date : <span>{start_date}</span></p>
                <p>End date : <span>{end_date}</span></p>
                <p>Has the project started : <span>False</span></p>
                <button >Launch the project</button>
            </div>
            <div className="project__operations">
                
                <Link>
                    <button className="remove"><RemoveIcon /></button>
                </Link>
                <Link>
                    <button className="update"><GetAppIcon /></button>
                </Link>
                
                <Link to="/projectdetails">
                    <button className="view" onClick={() => setProject()}><VisibilityIcon /></button>
                </Link>
                
            </div>
            
        </div>
            
    )
}

export default Project
