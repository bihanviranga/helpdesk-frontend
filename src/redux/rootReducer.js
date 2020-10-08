import { combineReducers } from 'redux'
import userReducer from './User/UserReducer'
import companyReducer from './Company/CompanyReducer'
import productReducer from './Product/ProductReducer'
import categoryReducer from './Category/CategoryReducer'
import brandReducer from './Brand/BrandReducer'
import moduleReducer from './Module/ModuleReducer'
import ticketReducer from './Ticket/TicketReducer'
import conversationReducer from './Conversation/ConversationReducer'
import dashboardReducer from './Dashboard/DashbaordReducer'
import articleReducer from './KnowledgeBase/KnowledgeBaseReducer'
import knowledgebaseReducer from './KnowledgeBase/KnowledgeBaseReducer'

const rootReducer = combineReducers({
    user: userReducer,
    company: companyReducer,
    product: productReducer,
    category: categoryReducer,
    module: moduleReducer,
    brand: brandReducer,
    ticket: ticketReducer,
    conversation : conversationReducer,
    dashboard: dashboardReducer,
    knowledgebase : knowledgebaseReducer
})

export default rootReducer