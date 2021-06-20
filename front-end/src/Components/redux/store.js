import { createStore , applyMiddleware , combineReducers } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import {projectReducers , getOneProject} from './reducers/Projectreducers'

import { userReducers } from './reducers/usersReducers'
import { getOneUser } from './reducers/usersReducers'

const reducers = combineReducers({
    projects : projectReducers , 
    project : getOneProject ,
    users : userReducers , 
    user : getOneUser
})

const middleware = [thunk]

const store = createStore(reducers , composeWithDevTools(applyMiddleware(...middleware)))

export default store