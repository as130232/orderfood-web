import * as actionTypes from './ordering-types'

const INIT_STATE = {
    cart: []
}

const orderReducer = (state = INIT_STATE, action) =>  {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            // const item = {id: action.payload.id}
            // // const item = state.meals.find((meal) => meal.id === action.payload.id)
            // //檢查是否已存在購物車中
            // const inCart = state.cart.find(item =>
            //     item.id === action.payload.id ? true : false
            // )
            // console.log('inCart:' + inCart + ', test:' + action.payload.id)
            // return {
            //     ...state,
            //     cart: 
            //         inCart
            //         ? state.cart.map((item) =>
            //             item.id === action.payload.id
            //                 ? { ...item, qty: item.qty + 1 }
            //                 : item
            //         )
            //         : [...state.cart, { ...item, qty: 1 }]

            // }
            console.log('payload: ', action.payload)
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            }
        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item => item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item)
            }
        default:
            return state
    }
}
export default orderReducer