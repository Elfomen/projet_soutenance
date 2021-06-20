import React from 'react'
import './Nav.css'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
function Nav() {

    const navigate = useHistory()

    const loggout = () => {
        localStorage.removeItem("current_user")
        navigate.push("loginuser")
    }

    return (
        <div className="dashboardnavbar">
            <div className="dashboardnavbar__navigate_elements">
                <Link>
                    <p>Project info</p>
                </Link>
                <Link onClick={loggout}>
                    <p>Logg out</p>
                </Link>
            </div>
        </div>
    )
}

export default Nav
