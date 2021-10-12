import * as actionTypes from './ordering-types'

export const addToCart = (mealId, selections, note) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: mealId,
            selections: selections,
            note: note
        }
    }
}

export const removeFromCart = (mealId) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            id: mealId
        }
    }
}

export const adjustQty = (mealId, value) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payload: {
            id: mealId,
            qty: value
        }
    }
}
