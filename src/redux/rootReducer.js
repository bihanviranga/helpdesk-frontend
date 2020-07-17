import { combineReducers } from 'redux'
import userReducer from './User/UserReducer'
import  companyReducer  from './Company/CompanyReducer'
import productReducer from './Product/ProductReducer'
import categoryReducer from './Category/CategoryReducer'
import moduleReducer from './Module/ModuleReducer'

const rootReducer = combineReducers({
    user : userReducer,
    company : companyReducer,
    product : productReducer,
    category : categoryReducer,
    module : moduleReducer
})

export default rootReducer