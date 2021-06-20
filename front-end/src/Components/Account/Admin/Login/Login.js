import React, { useState } from 'react'
import NavBar from '../../AccountNav/Nav'
import './Login.css'
import { Link , useHistory } from 'react-router-dom'
import axios from '../../../../axios'
import Error from '../../../Error/Error'
import CircularProgress from '@material-ui/core/CircularProgress';
function Login() {
    const navigate = useHistory()

    const [ loading , setLoading ] = useState(false)

    const gotoCreate = () => {
        navigate.push("registeradmin")
    }

    const [errorMessage , setEM] = useState("")

    const [admin , setAdmin] = useState({
        email : "" , 
        password : "" , 
        confirm : ""
    })

    const verifyInputs = () => {
        return admin.email!=="" && admin.password!=="" && admin.confirm!==""
    }

    const verifyaccount = async() => {
        if(verifyInputs()){
            setLoading(true)
            const present = await axios.get(`/admin/verifyaccount/${admin.email}`)
            console.log(present.data)
            if(present.data!=="absent"){
                if(present.data[0].password === admin.password){
                    setEM("")
                    localStorage.setItem("current_admin" , admin.email)
                    setLoading(false)
                    navigate.push("/projectlist")
                }else if(present.data==="error"){
                    setEM("Poor internet connection please try again or refresh page...")
                    setLoading(false)
                }
                
                else{
                    setEM("Incorrect password please try again")
                    setLoading(false)
                }
            }else{
                setEM("This user does not exist")
                setLoading(false)
            }
        }else{
            setEM("Please fill in all the informations needed")
            setLoading(false)
        }
        
    }



    return (
        <div className="adminlogin">
            <NavBar />
            <h1>Log into project management</h1>
            <div className="adminlogin__form">
                <table>
                    <thead>
                        <th>Log into Administrator account</th>
                    </thead>
                    {
                        errorMessage&&<Error message={errorMessage}/>
                    }
                    <tbody>
                        <tr>
                            <td>
                                <input type="email" placeholder="Enter your email"
                                value={admin.email} onChange={e => setAdmin({
                                    ...admin , 
                                    email : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="Enter your password" value={admin.password}
                                onChange={e => setAdmin({
                                    ...admin , 
                                    password : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="confirm your password" value={admin.confirm}
                                onChange={e => setAdmin({
                                    ...admin , 
                                    confirm : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={verifyaccount}>{loading ? <CircularProgress /> : "Log into your account"}</button>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <p>Dont have an account ?</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={gotoCreate}>Create account</button>
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Login
