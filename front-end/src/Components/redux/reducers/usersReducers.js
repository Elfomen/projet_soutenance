import * as UsersConstants from '../constants/usersConstants'

export const userReducers = (state = { users : [] } , actions) => {
    switch(actions.type){
        case UsersConstants.ADD_NEW_USER_LOADING:
            return{
                ...state , 
                user_loading : true
            }
        case UsersConstants.ADD_NEW_USER_SUCCESS:
            return{
                ...state , 
                users : [
                    ...state.users , 
                    actions.payload
                ] , 
                user_loading : false
            }
        case UsersConstants.ADD_NEW_USER_ERROR:
            return{
                ...state , 
                user_loading : false , 
                user_error : actions.payload
            } 
        case UsersConstants.LOAD_USERS_LOADING:
            return{
                user_loading : true ,
                users : []
            }
        case UsersConstants.LOAD_USERS_SUCCESS:
            return{
                user_loading : false , 
                users : actions.payload
            }
        case UsersConstants.LOAD_USERS_ERROR:
            return{
                user_loading : false , 
                user_error : actions.payload
            }
        case UsersConstants.ASSIGN_PROJECT_LOADING:
            return{
                ...state , 
                user_loading : true
            }
        case UsersConstants.ASSIGN_PROJECT_SUCCESS:
            const oldUserProjects = state.users
            for(var i = 0 ; i < oldUserProjects.length ; i++){
                if(oldUserProjects[i]._id===actions.payload.user){
                    oldUserProjects[i].projects = [
                        ...oldUserProjects[i].projects , 
                        actions.payload.project
                    ]
                }
            }
            return{
                ...state , 
                user_loading : false , 
                projects : oldUserProjects.projects
            }
        case UsersConstants.ASSIGN_PROJECT_ERROR:
            return{
                ...state , 
                user_loading : false , 
                user_error : actions.payload
            }
        default:
            return state
    }
}

export const getOneUser = (state = { user : {} } , actions) => {
    switch(actions.type){
        case UsersConstants.GET_USER_LOADING:
            return{
                user_loading : true , 
                user : {}
            }
        case UsersConstants.GET_USER_SUCCESS:
            return{
                user_loading : false , 
                user : actions.payload
            }
        case UsersConstants.GET_USER_ERROR:
            return{
                user_loading : false , 
                user_error : actions.payload
            }
        default:
            return state
    }
}