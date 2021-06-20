import React , { useState } from 'react'
import NavBar from '../../AccountNav/Nav'
import './Create.css'
import { useHistory } from 'react-router-dom'
import axios from '../../../../axios'
import Error from '../../../Error/Error'
import CircularProgress from '@material-ui/core/CircularProgress';
function Create() {

    const navigate = useHistory()

    const [errorMessage , setEM] = useState("")
    const [ loading , setLoading ] = useState(false)

    const [exist , setExist]= useState(false)

    const [user , setUser] = useState({
        name : "" , 
        email : "" , 
        password : "" , 
        confrim : ""
    })

    const checkInputs = () => {
        return user.name!=="" && user.email!=="" &&user.password!==""&&user.confrim!==""
    }

    const checkPassword = () =>{
        return user.password === user.confrim
    }


    const createAccount = async() => {

        if(checkInputs()){
            setEM("")
            if(checkPassword()){
                setLoading(true)
                const exist = await axios.post("/users/new" , {
                    ...user
                })
                if(exist.data==="This user already exists"){
                    setEM(exist.data)
                    setLoading(false)
                }else if(exist.data==="error"){
                    setEM("Poor internet connection please try again or refresh page...")
                    setLoading(false)
                }
                
                else{
                    localStorage.setItem("current_user" , user.email)
                    setLoading(false)
                    navigate.push("/usershome")
                    alert("done")

                }
                   //navigate.push("/home")
                
            }else{
                setEM("Incorrect password please try again")
                setLoading(false)
                return
            }
        }else{
            setEM("Please fill in all the required informations")
            setLoading(false)
            return
        }
    }

    const gotoLogin = () => {
        navigate.push("loginuser")
    }
    return (
        <div className="usercreateaccount">
            <NavBar />
            <h1>Create your User account</h1>
            <div className="usercreateaccount__form">
                <table>
                    <thead>
                        <th>Create A simple User account</th>
                    </thead>
                    {
                        errorMessage&&<Error message={errorMessage}/>
                    }
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" placeholder="Enter your name"
                                value={user.name} onChange={e => setUser({
                                    ...user , 
                                    name : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="email" placeholder="Enter your email"value={user.email} onChange={e => setUser({
                                    ...user , 
                                    email : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="Enter your password"value={user.password} onChange={e => setUser({
                                    ...user , 
                                    password : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="confirm your password" value={user.confrim} onChange={e => setUser({
                                    ...user , 
                                    confrim : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={createAccount}>{loading ? <CircularProgress /> : "Create account"}</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Already a memeber?</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={gotoLogin}>Sign in</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Create
