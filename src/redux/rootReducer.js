import { combineReducers } from 'redux'
import userReducer from './User/UserReducer'
import  companyReducer  from './Company/CompanyReducer'

const rootReducer = combineReducers({
    user : userReducer,
    company : companyReducer
})

export default rootReducer