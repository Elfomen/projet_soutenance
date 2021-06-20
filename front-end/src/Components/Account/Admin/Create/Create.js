import React , { useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import './Create.css'
import NavBar from '../../AccountNav/Nav'
import { useHistory } from 'react-router-dom'
import Error from '../../../Error/Error'
import axios from '../../../../axios'
import CircularProgress from '@material-ui/core/CircularProgress';


function Create() {

    const navigate = useHistory()

    const [errorMessage , setEM] = useState("")
    const [ loading , setLoading ] = useState(false)

    const [exist , setExist]= useState(false)

    const [admin , setAdmin] = useState({
        name : "" , 
        email : "" , 
        password : "" , 
        confrim : ""
    })

    const checkInputs = () => {
        return admin.name!=="" && admin.email!=="" &&admin.password!==""&&admin.confrim!==""
    }

    const checkPasswor = () =>{
        return admin.password === admin.confrim
    }


    //const userExist = async() => {
    //    const administrators = await axios.get("/admin/get/all")
    //    const data = administrators.data 
    //    console.log(data)
    //    for(var i = 0 ; i < data.length ; i++){
    //        if(data[i].email === admin.email){
    //            setExist(true)
    //            return true
    //        }
    //    }
//
    //    setExist(false)
    //    return false
    //}

    





    const createAccount = async() => {

        if(checkInputs()){
            if(checkPasswor()){
                setLoading(true)
                const exist = await axios.post("/admin/new" , {
                    ...admin
                })
                if(exist.data==="This user already exists"){
                    setEM(exist.data)
                    setLoading(false)
                }else if(exist.data==="error"){
                    setEM("Poor internet connection please try again or refresh page...")
                    setLoading(false)
                }
                else{
                    localStorage.setItem("current_admin" , admin.email)
                    setLoading(false)
                    navigate.push("/home")

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
        navigate.push("/")
    }
    return (
        <div className="admincreateaccount">
            <NavBar />
            <h1>Create your admin account</h1>
            <div className="admincreateaccount__form">
                <table>
                    <thead>
                        <th>Create administrator account</th>
                    </thead>
                    {
                        errorMessage&&<Error message={errorMessage}/>
                    }
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" placeholder="Enter your name"
                                value={admin.name} onChange={e => setAdmin({
                                    ...admin , 
                                    name : e.target.value
                                })}/>
                            </td>
                        </tr>
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
                                <input type="password" placeholder="Enter your password"
                                value={admin.password} onChange={e => setAdmin({
                                    ...admin, 
                                    password : e.target.value
                                })}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" placeholder="confirm your password"
                                value={admin.confrim} onChange={e => setAdmin({
                                    ...admin , 
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
