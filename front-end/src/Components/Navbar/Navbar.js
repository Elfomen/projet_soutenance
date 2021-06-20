import React from 'react'
import './Navbar.css'
import {IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom'
import DehazeIcon from '@material-ui/icons/Dehaze';
import { useHistory } from 'react-router-dom'
function Navbar({ click }) {

    const navigate = useHistory()
    const loggout = () => {
        localStorage.removeItem("current_admin")
        navigate.push("/")
    }

    return (
        <div className="navbar">
            <div className="navbar__logo"></div>
            <div className="navbar__navigate_elements">
                <Link to="/projectlist" className="home">
                    <p>Go to home page</p>
                </Link>
                <Link className="logout" onClick={loggout}>
                    <p>Log out/loggin</p>
                </Link>
            </div>
            <div className="navbar__search">
                <input type="text" placeholder="Enter search item here"/>
                <IconButton>
                    <SearchIcon className="button_icon_white"/>
                </IconButton>
            </div>

            <div className="icon_drop">
                <IconButton onClick={click}>
                    <DehazeIcon />
                </IconButton>
            </div>

            
        </div>
    )
}

export default Navbar
