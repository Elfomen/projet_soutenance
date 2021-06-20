import * as usersConstants from '../constants/usersConstants'
import axios from '../../../axios'
export const getAllUsers = () => async(dispatch) => {
    try {
        dispatch({
            type : usersConstants.LOAD_USERS_LOADING
        })

        const data = await axios.get("/users/get/all")

        if(data.data==="error"){
            dispatch({
                type : usersConstants.LOAD_USERS_ERROR , 
                payload : "Error fetching users"
            })
        }else{
            dispatch({
                type : usersConstants.LOAD_USERS_SUCCESS , 
                payload : data.data
            })
        }
    } catch (error) {
        dispatch({
            type : usersConstants.LOAD_USERS_ERROR , 
            payload : error.message
        })
    }
}

export const addUserToProject = (user , project) => async(dispatch) => {
    try {
        dispatch({
            type : usersConstants.ASSIGN_PROJECT_LOADING
        })

        const assigned = await axios.put("/users/user/addproject" , {
            user : user , 
            project : project
        })

        if(assigned.data==="ok"){
            dispatch({
                type : usersConstants.ASSIGN_PROJECT_SUCCESS , 
                payload : {
                    project : project , 
                    user : user
                }
            })
        }else{
            dispatch({
                type : usersConstants.ASSIGN_PROJECT_ERROR , 
                payload: "Error assigning project to user"
            })
        }


    } catch (error) {
        dispatch({
            type : usersConstants.ASSIGN_PROJECT_ERROR , 
            payload: error.message
        })
    }
}

export const getOneUser = (email) => async(dispatch) => {
    try {
        dispatch({
            type : usersConstants.GET_USER_LOADING
        })

        const data = await axios.get(`/users/user/verify/${email}`)

        dispatch({
            type : usersConstants.GET_USER_SUCCESS , 
            payload : data.data
        })
    } catch (error) {
        dispatch({
            type : usersConstants.GET_USER_ERROR , 
            payload : error.message
        })
    }
} 