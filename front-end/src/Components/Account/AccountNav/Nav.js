import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
function Nav() {
    return (
        <div className="accountnavbar">
            <div className="accountnavbar__navigate_elements">
                <Link to="/">
                    <p>Administrator Loggin</p>
                </Link>
                <Link to="/loginuser">
                    <p>User loggin</p>
                </Link>
                <Link to="/registeradmin">
                    <p>Administrator signup</p>
                </Link>
                <Link to="/registeruser">
                    <p>User signup</p>
                </Link>
                <Link to="/home">
                    <p>Simple user dashboard</p>
                </Link>
            </div>
        </div>
    )
}

export default Nav
