import React from 'react'
import './Rigthside.css'
import CreateProject from '../../BaseComponents/Newproject/New'
import ProjectList from '../../BaseComponents/ProjectList/Projectlist'
import Home from './Rigthsidehomepage/Home'
import ProjectDetails from '../../BaseComponents/ProjectDetails/Details'
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
function Rigthside() {
    return (
        <div className="rigthside">
            <Route exact path="/homerightside" component={Home}/>
            <Route exact path="/projectlist" component={ProjectList}/>
            <Route exact path="/newproject" component={CreateProject}/>
            <Route exact path="/projectdetails" component={ProjectDetails}/>
        </div>
    )
}

export default Rigthside
