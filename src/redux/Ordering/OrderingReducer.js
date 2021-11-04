import * as actionTypes from './OrderingTypes'

const INIT_STATE = {
    cart: [],
    storeCode: null,
    user: {}
}

const orderReducer = (state = INIT_STATE, action) => {
    console.log('action: ', action)
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: {...state.user, id: action.payload.id}
            }
        case actionTypes.CHOOSE_STORE:
            return {
                ...state,
                storeCode: action.payload.id
            }
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.uuid !== action.payload.uuid),
            }
        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.uuid === action.payload.uuid
                        ? { ...item, qty: action.payload.qty }
                        : item),
            }
        case actionTypes.UPDATE_TO_CART:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.uuid === action.payload.uuid
                        ? { ...action.payload } 
                        : item),
            }
        default:
            return state
    }
}
export default orderReducer