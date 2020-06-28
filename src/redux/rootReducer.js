import { combineReducers } from 'redux'
import exampleReducer from './example/exampleReducer'
import userReducer from './User/UserReducer'

const rootReducer = combineReducers({
    example : exampleReducer,
    user : userReducer
})

export default rootReducer