import * as ProjectConstants from '../constants/Projectconstants'

export const projectReducers = (state = { projects : [] } , actions) => {
    switch(actions.type){
        case ProjectConstants.GET_PROJECTS_LOADING:
            return{
                loading : true , 
                projects : []
            }
        case ProjectConstants.GET_PROJECTS_SUCCESS:
            return{
                loading : false , 
                projects : actions.payload
            } 
        case ProjectConstants.GET_PROJECTS_ERROR:
            return {
                loading : false , 
                error : actions.payload
            } 
        case ProjectConstants.ADD_PROJECT_DETAILS_LOADING:
            return{
                ...state , 
                loading : true
            }
        case ProjectConstants.ADD_PROJECT_DETAILS_SUCCESS:
            return{
                ...state , 
                projects : [
                    ...state.projects , 
                    actions.payload
                ] , 
                loading : false
            }
        case ProjectConstants.ADD_PROJECT_DETAILS_ERROR:
            return{
                ...state , 
                loading : false , 
                error : actions.payload
            }
        case ProjectConstants.ADD_TASK_LOADING:
            return{
                ...state , 
                loading : true
            }
            
        case ProjectConstants.ADD_TASK_SUCCESS:
            const newProjects= state.projects
            for(var i = 0 ; i < newProjects.length ; i++){
                if(newProjects[i]._id===actions.payload.project){
                    newProjects[i].tasks = [
                        ...newProjects[i].tasks , 
                        actions.payload.task
                    ]
                }
            }
            return{
                ...state , 
                projects : newProjects , 
                loading : false
            }
        case ProjectConstants.ADD_TASK_ERROR:
            return{
                ...state , 
                loading : false ,
                error : actions.payload 
            }

            case ProjectConstants.REMOVE_TASK_LOADING:
                return{
                    ...state , 
                    loading : true
                }
            case ProjectConstants.REMOVE_TASK_SUCCESS:
                var newproject = []
                var projects = state.projects
                for(var i = 0 ; i < projects.length ; i++){
                    if(projects[i]._id === actions.payload.project){
                        for(var j = 0 ; j < projects[i].tasks.length ; j++){
                            if(projects[i].tasks[j]._id === actions.payload.task){
                                
                                projects[i].tasks = 
                                    projects[i].tasks.filter(task => (
                                        task._id!==actions.payload.task
                                    ))
                            }
                        }
                    }
                }
                return{
                    ...state , 
                    loading : false , 
                    projects : projects
                }
        
        case ProjectConstants.UPDATE_PROJECT_DETAILS_LOADING:
             const updatedProject = state.projects.map((project , i) => (
                project._id===actions.payload.project_id ? actions.payload.project : project
            ))
            return{
                ...state , 
                loading : false , 
                projects : updatedProject
            }
        case ProjectConstants.UPDATE_PROJECT_DETAILS_ERROR:
            return{
                ...state , 
                loading : false , 
                error : actions.payload
            }
        case ProjectConstants.DELETE_PROJECT_DETAILS_LOADING:
            return{
                ...state,
                loading : true
            }
        case ProjectConstants.DELETE_PROJECT_DETAILS_SUCCESS:
            const newprojects = state.projects.filter(project => (
                project._id!==actions.payload.project
            ))
            return{
                ...state , 
                loading : false , 
                projects : newProjects
            }
        case ProjectConstants.DELETE_PROJECT_DETAILS_ERROR:
            return{
                ...state , 
                loading : false , 
                error : actions.payload
            }

        
        default:
            return state
    }
}

export const getOneProject = (state = { project : {} } , actions) => {
    switch(actions.type){
        case ProjectConstants.GET_ONE_PROJECT_LOADING:
            return{
                loading : true , 
                project : {}
            }
        case ProjectConstants.GET_ONE_PROJECT_SUCCESS:
            return{
                loading : false , 
                project : actions.payload
            }
        case ProjectConstants.GET_ONE_PROJECT_ERROR:
            return{
                loading : false , 
                error : actions.payload
            }
            case ProjectConstants.COMPLETE_SUB_TASK_LOADING:
            return{
                ...state , 
                loading : true
            }
        case ProjectConstants.COMPLETE_SUB_TASK_SUCCESS:
            var  existingProject = state.project
            for(var i = 0 ; i < state.project.tasks.length ; i++){
                if(state.project.tasks[i]._id==actions.payload.task){
                    for(var j = 0 ; j < state.project.tasks[i].sub_tasks.length ; j++){
                        if(state.project.tasks[i].sub_tasks[j]._id==actions.payload.sub_task_id){
                            existingProject.tasks[i].percentage_change = actions.payload.percentage
                            existingProject.tasks[i].sub_tasks[j].completed = !actions.payload.completed
                            console.log(existingProject.tasks[i].sub_tasks[j]._id)
                        }
                    }
                }
            }

            return{
                ...state , 
                projects : existingProject
            }
            case ProjectConstants.ADD_SUB_TASK_LOADING:
                return{
                    ...state , 
                    loading : true
                }
            case ProjectConstants.ADD_SUB_TASK_SUCCESS:
                const Projects = state.project
                        for(var j = 0 ; j< Projects.tasks.length ; j++){
                            if(Projects.tasks[j]._id==actions.payload.task){
                                Projects.tasks[j].sub_tasks = [
                                    ...Projects.tasks[j].sub_tasks , 
                                    actions.payload.sub_tasks
                                ]
                            }
                        }
                return{
                    ...state , 
                    loading : false , 
                    project : Projects
                }
            case ProjectConstants.ADD_SUB_TASK_ERROR:
                return{
                    ...state , 
                    loading : false , 
                    error : actions.payload
                }
        
        default:
            return state
    }
}