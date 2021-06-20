import React from 'react'
import './Leftside.css'
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LanguageIcon from '@material-ui/icons/Language';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
function Leftside() {

    const navigate = useHistory()

    const loggout = () => {
        localStorage.removeItem("current_admin")
        navigate.push("/")
    }



    return (
        <div className="leftside">
            <Link to="/projectlist" className="leftside__container">
                    <HomeIcon className="leftside__container_icon"/>
                <p>Home page</p>
            </Link>
            <Link to="/projectlist" className="leftside__container">
                <AccountTreeIcon className="leftside__container_icon"/>
                <p>Project lists</p>
                
            </Link>
            <Link to="/newproject" className="leftside__container">
                    <AddCircleIcon className="leftside__container_icon"/>
                
                <p>New Project</p>
                
            </Link>
            <Link className="leftside__container">
                    <LanguageIcon className="leftside__container_icon"/>
                
                <p>Our webside</p>
                
            </Link>
            <Link className="leftside__container" onClick={loggout}>
                <ExitToAppIcon className="leftside__container_icon"/>
                
                <p>Loggout</p>
                
            </Link>
        </div>
    )
}

export default Leftside
