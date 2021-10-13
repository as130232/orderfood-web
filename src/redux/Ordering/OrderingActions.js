import * as actionTypes from './OrderingTypes'
import { v4 as uuidv4 } from 'uuid';

export const addToCart = (meal, selections, note) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            uuid: uuidv4(),
            id: meal.id,
            name: meal.name,
            price: meal.price,
            selections: selections,
            note: note,
            qty:1
        }
    }
}

export const removeFromCart = (uuid) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: {
            uuid: uuid
        }
    }
}

export const adjustQty = (uuid, qty) => {
    return {
        type: actionTypes.ADJUST_QTY,
        payload: {
            uuid: uuid,
            qty: qty
        }
    }
}
