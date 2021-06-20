import React , { useEffect , useState} from 'react'
import './Homerigth.css'
import Projectlist from './Dashboardproject'
import axios from '../../../../../../axios'
import {useHistory } from 'react-router-dom'
function HomeRigt() {
    const bavigate = useHistory()

    const [currentUser , setCU] = useState([])

    const getCurrentUser = async() => {
        const data = await axios.get(`/users/user/verify/${localStorage.getItem("current_user")}`)
        setCU(data.data) 
        
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    
    console.log(currentUser)




    return (
        <div className="homerigth">
            {
                currentUser.length&&currentUser[0].projects.map(project => (
                    <Projectlist {...project}/>
                ))
            }
           
        </div>
    )
}

export default HomeRigt
