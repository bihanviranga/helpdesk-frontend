import { combineReducers } from 'redux'
import userReducer from './User/UserReducer'
import companyReducer from './Company/CompanyReducer'
import productReducer from './Product/ProductReducer'
import categoryReducer from './Category/CategoryReducer'
import brandReducer from './Brand/BrandReducer'
import moduleReducer from './Module/ModuleReducer'
import ticketReducer from './Ticket/TicketReducer'

const rootReducer = combineReducers({
    user: userReducer,
    company: companyReducer,
    product: productReducer,
    category: categoryReducer,
    module: moduleReducer,
    brand: brandReducer,
    ticket: ticketReducer
})

export default rootReducer