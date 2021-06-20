import React , { useState } from 'react'
import './Login.css'
import {useHistory} from 'react-router-dom'
import NavBar from '../../AccountNav/Nav'
import axios from '../../../../axios'
import Error from '../../../Error/Error'
import CircularProgress from '@material-ui/core/CircularProgress';
function Login() {


    const [errorMessage , setEM] = useState("")

    const [ loading , setLoading ] = useState(false)

    const [user , setUser] = useState({
        email : "" , 
        password : "" , 
        confirm : ""
    })

    const verifyInputs = () => {
        return user.email!=="" && user.password!=="" && user.confirm!==""
    }

    const verifyaccount = async() => {
        setEM("")
        if(verifyInputs()){
            setLoading(true)
            const present = await axios.get(`/users/user/verify/${user.email}`)
            console.log(present.data)
            if(present.data!=="absent"){
                if(present.data[0].password === user.password){
                    setEM("")
                    localStorage.setItem("current_user" , user.email)
                    setLoading(false)
                    navigate.push("/userdashboardlist")
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
        }
        
    }










    const navigate = useHistory()

    const gotoCreate = () => {
        navigate.push("registeruser")
    }
    return (
        <div className="userlogin">
            <NavBar />
            <h1>Log into Users Account</h1>
            <div className="userlogin__form">
                <table>
                    <thead>
                        <th>Log into Users account</th>
                    </thead>
                    {
                        errorMessage&&<Error message={errorMessage}/>
                    }
                    <tbody>
                        <tr>
                            <td>
                                <input type="email" placeholder="Enter your email"
                                value={user.email} onChange={e => setUser({
                                    ...user , 
                                    email : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="Enter your password"
                                value={user.password} onChange={e => setUser({
                                    ...user , 
                                    password : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="confirm your password"
                                value={user.confirm} onChange={e => setUser({
                                    ...user , 
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
