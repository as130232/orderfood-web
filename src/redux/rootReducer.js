import { combineReducers } from 'redux'
import orderReducer from './Ordering/OrderingReducer'

const rootReducer = combineReducers({
    order: orderReducer
})

export default rootReducer