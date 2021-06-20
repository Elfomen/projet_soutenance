import React , { useState } from 'react'
import './SideDrawer.css'
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LanguageIcon from '@material-ui/icons/Language';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
function SideDrawer({ show , click }) {


    const sideDrawerClass = ["sidedrawer"]
    show&&sideDrawerClass.push('show') 

    const navigate = useHistory()

    const loggout = () => {
        localStorage.removeItem("current_admin")
        click()
        navigate.push("/")
    }


    return (
        <div className={sideDrawerClass.join(" ")}>
                <Link to="/homerightside" className="sidedrawer__container" onClick={click}>
                        <HomeIcon className="leftside__container_icon"/>
                    <p>Home page</p>
                </Link>
                <Link to="/projectlist" className="sidedrawer__container" onClick={click}>
                    <AccountTreeIcon className="sidedrawer__container_icon"/>
                    <p>Project lists</p>

                </Link>
                <Link to="/newproject" className="sidedrawer__container" onClick={click}>
                        <AddCircleIcon className="sidedrawer__container_icon"/>

                    <p>New Project</p>

                </Link>
                <Link className="sidedrawer__container">
                        <LanguageIcon className="sidedrawer__container_icon"/>

                    <p>Our webside</p>

                </Link>
                <Link className="sidedrawer__container" onClick={loggout}>
                        <ExitToAppIcon className="sidedrawer__container_icon"/>

                    <p>Loggout</p>

                </Link>
        </div>
    )
}

export default SideDrawer
