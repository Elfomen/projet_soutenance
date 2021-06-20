import * as ProjectConstants from '../constants/Projectconstants'
import axios from '../../../axios'
export const getProjectsFromAdmin = (email) => async(dispatch , getState) => {
    try {
        dispatch({
            type : ProjectConstants.GET_PROJECTS_LOADING
        })

        const data= await axios.get(`/admin/getone/${email}`)
        dispatch({
            type : ProjectConstants.GET_PROJECTS_SUCCESS , 
            payload : data.data[0].projects
        })
        console.log(data.data)

    } catch (error) {
        dispatch({
            type : ProjectConstants.GET_PROJECTS_ERROR, 
            payload : error.message
        })
    }
}

export const createNewProject = (project , email) => async(dispatch , getState) => {
    try {
        dispatch({
            type : ProjectConstants.ADD_PROJECT_DETAILS_LOADING
        })

        const created = await axios.post('/project/new' , {
            ...project , 
            email : localStorage.getItem("current_admin")
        })

        if(created.data==="ok"){
            dispatch({
                type : ProjectConstants.ADD_PROJECT_DETAILS_SUCCESS , 
                payload : project
            })
            
        }else{
            dispatch({
                type : ProjectConstants.ADD_PROJECT_DETAILS_ERROR , 
                payload : created.data
            })
        }
    } catch (error) {
        dispatch({
            type : ProjectConstants.ADD_PROJECT_DETAILS_ERROR , 
            payload : error.message
        })
    }
}

export const createNewTask = (project , task , userId) => async(dispatch) => {
    try {
        dispatch({
            type : ProjectConstants.ADD_TASK_LOADING
        })

        const created = await axios.put("/project/tasks/new" , {
            project : project , 
            task : {
                ...task , 
                worker : userId
            }
        })
        if(created.data==="ok"){
            dispatch({
                type : ProjectConstants.ADD_TASK_SUCCESS , 
                payload : {
                    project ,
                    task
                }
            })
        }else{
            dispatch({
                type : ProjectConstants.ADD_TASK_ERROR , 
                payload : "Cant register task"
            })
        }
    } catch (error) {
        dispatch({
            type : ProjectConstants.ADD_TASK_ERROR , 
            payload : error.message
        })
    }
}

export const createNewSubtask = (project , task , sub_tasks) => async(dispatch) => {
    try {
        dispatch({
            type : ProjectConstants.ADD_SUB_TASK_LOADING
        })

        const created = await axios.put("/project/tasks/subtasks/new" , {
            project : project , 
            task : task , 
            sub_task : sub_tasks
        })

        if(created.data === "ok"){
            dispatch({
                type : ProjectConstants.ADD_SUB_TASK_SUCCESS , 
                payload : {
                    sub_tasks : sub_tasks , 
                    project : project , 
                    task : task
                }
            })
        }else{
            dispatch({
                type : ProjectConstants.ADD_SUB_TASK_ERROR , 
                payload : created.data
            })
        }
    } catch (error) {
        dispatch({
            type : ProjectConstants.ADD_SUB_TASK_ERROR , 
            payload : error.message
        })
    }
}

export const completeSubTask = (checked ,task , sub_task , project , percentage) => async(dispatch) => {
    try {
        dispatch({
            type : ProjectConstants.COMPLETE_SUB_TASK_LOADING
        })

        const completed = await axios.put("/project/tasks/sub_tasks/completed" , {
            task : task , 
            sub_task : sub_task , 
            percentage : percentage , 
            project : project , 
            checked
        })

        if(completed.data === "ok"){
            dispatch({
                type : ProjectConstants.COMPLETE_SUB_TASK_SUCCESS , 
                payload : {
                    task , 
                    sub_task_id : sub_task , 
                    project , 
                    percentage , 
                    completed : checked
                }
            })
        }else{
            dispatch({
                type : ProjectConstants.COMPLETE_SUB_TASK_ERROR , 
                payload : completed.data
            })
        }
    } catch (error) {
        dispatch({
            type : ProjectConstants.COMPLETE_SUB_TASK_ERROR , 
            payload : error.message
        })
    }
}

export const getOneProject = (id) => async(dispatch) => {
    try {
        dispatch({
            type : ProjectConstants.GET_ONE_PROJECT_LOADING
        })

        const data = await axios.get(`/project/getone/${id}`)

        dispatch({
            type : ProjectConstants.GET_ONE_PROJECT_SUCCESS , 
            payload : data.data
        })
    } catch (error) {
        dispatch({
            type : ProjectConstants.GET_ONE_PROJECT_ERROR , 
            payload : error.message
        })
    }
}