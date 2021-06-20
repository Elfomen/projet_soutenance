import React from 'react'
import { useHistory , BrowserRouter as Router , Route } from 'react-router-dom'
import NavBar from './Nav/Nav'
import './Dashboard.css'
import Leftside from './Leftside/Left'
import Rigthside from './Rigthside/Right'
import UserPerso from './Rigthside/Personal/PersonalPage'
function Dashboard() {
    const navigate = useHistory() 
    if(localStorage.getItem("current_user")){
        return(
            <div>
                <NavBar />
                
                <Leftside />

                <Rigthside />
            </div>
        )
    }else{
        navigate.push("loginuser")
        return <div></div>
    }
}

export default Dashboard
