import React from 'react'
import './Body.css'
import Leftside from './Leftside/Leftside'
import Rigthside from './Rigthside/Rigthside'
import NavBar from '../Navbar/Navbar'
function Body({ show , click }) {
    return (
        <div>
            <NavBar show={show} click={click}/>
            <div className="body">
                
                <div className="body__leftside">
                     <Leftside />
                </div>
                <div className="body__rigthside">
                    <Rigthside />
                </div>
            </div>
        </div>
    )
}

export default Body
