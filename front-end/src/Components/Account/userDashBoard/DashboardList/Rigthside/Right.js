import React from 'react'
import './Right.css'
import HomeRigtside from './HomeRigth/HomeRigt'
import { Route , BrowserRouter as Router , Switch } from 'react-router-dom'
import UserPerso from './Personal/PersonalPage'
function Right() {
    return (
        <div className="userrigthside">
            
            <HomeRigtside />
           
        </div>
    )
}

export default Right
