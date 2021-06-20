import React from 'react'
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LanguageIcon from '@material-ui/icons/Language';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import './Left.css'
function Left() {
    const navigate = useHistory()

    const logUserOut = () => {
        localStorage.removeItem("current_user")
        navigate.push("loginuser")
    }

    return (
        <div className="dashboard__leftside">
        <Link className="dashboard__leftside__container">
            <AccountTreeIcon className="dashboard__leftside__container_icon"/>
            <p>Open project lists</p>
            
        </Link>
        <Link className="dashboard__leftside__container">
                <AddCircleIcon className="dashboard__leftside__container_icon"/>
            
            <p>Add new Sub task</p>
            
        </Link>
        <Link className="dashboard__leftside__container" onClick={logUserOut}>
                <ExitToAppIcon className="dashboard__leftside__container_icon"/>
            
            <p>Loggout</p>
            
        </Link>
    </div>
    )
}

export default Left
