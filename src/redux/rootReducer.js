import { combineReducers } from 'redux'
import orderReducer from './Ordering/ordering-reducer'

const rootReducer = combineReducers({
    order: orderReducer
})

export default rootReducer