import React , { useState , useEffect } from 'react'
import Home from './Components/Home/Home'
import { BrowserRouter as Router , Switch , Route , useHistory } from 'react-router-dom'
import Body from './Components/Body/Body'
import { useDispatch , useSelector } from 'react-redux'
import {getProjectsFromAdmin} from './Components/redux/actions/Projectactions'
import Backdrop from './Components/Body/BackDrop/BackDrop'
import SideDrawer from './Components/Body/SideDrawer/SideDrawer'
import NavBar from './Components/Navbar/Navbar'


function AppPrev() {

    const [ showSideDrawer , setSSD ] = useState(false)

    const navigate = useHistory()
    const preventLoggin = () => {
        navigate.push("/")
    }

    const dispatch = useDispatch()

    const allProjects = useSelector(state => state.projects)

    const { error , loading , projects } = allProjects

    useEffect(() => {
        dispatch(getProjectsFromAdmin(localStorage.getItem("current_admin")))
    } , [dispatch])

    if(localStorage.getItem("current_admin")){
        return(
            <div className="App">
                <NavBar show={showSideDrawer} click={() => setSSD(!showSideDrawer)}/>

                <Backdrop show={showSideDrawer} click={() => setSSD(false)}/>

                <SideDrawer show={showSideDrawer} click={() => setSSD(false)}/> 
                
            </div>
        )
    }else{
        preventLoggin()
        return <div></div>
    }
}

export default AppPrev
