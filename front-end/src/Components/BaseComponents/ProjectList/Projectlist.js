import React , { useEffect } from 'react'
import './Projectlist.css'
import Project from '../Project/Project'
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import I1 from '../../../images/p1.jpeg'
import I2 from '../../../images/p2.jpeg'
import I3 from '../../../images/p3.jpeg'
import { getProjectsFromAdmin } from '../../redux/actions/Projectactions'
import { DotLoader , PulseLoader } from 'react-spinners'
function Projectlist() {

    const images = [ I1 , I2 , I3 ]

    const dispatch = useDispatch()

    const allProjects = useSelector(state => state.projects)


    useEffect(() => {
        dispatch(getProjectsFromAdmin(localStorage.getItem("current_admin")))
    } , [])

    const { projects , loading , error } = allProjects
    return (
        <div className="projectlist">
            <div className="projectlist__project">
                {
                    loading ? <div className="loader"><p>Loading Projects</p><PulseLoader /> </div> :
                    projects&&projects.map((project , i) => (
                        <Project {...project} image={images[Math.floor(Math.random() * 3)]}/>
                    ))
                }
            </div>
            <div className="projectlist__add">
                <Link to="/newproject">
                    <button><AddIcon /></button>
                </Link>
            </div>
        </div>
    )
}

export default Projectlist
