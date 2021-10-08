import * as actionTypes from './ordering-types'

export const addToCart = (itemId, selections, note) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: itemId,
            selections: selections,
            note: note
        }
    }
}

export const removeFromCart = (itemId) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            id: itemId
        }
    }
}

export const adjustQty = (itemId, value) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payload: {
            id: itemId,
            qty: value
        }
    }
}
