import * as actionTypes from './OrderingTypes'

const INIT_STATE = {
    cart: []
}

const orderReducer = (state = INIT_STATE, action) => {
    console.log('action: ', action)
    let mealInCart = state.cart.filter(item => item.uuid === action.payload.uuid)[0];
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            let addSize = state.size + 1;
            let addTotal = state.total + (action.payload.price + action.payload.selections.reduce((prev, cur) => { return prev + cur.price }, 0))
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
        default:
            return state
    }
}
export default orderReducer