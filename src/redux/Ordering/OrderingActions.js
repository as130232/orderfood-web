import * as actionTypes from './OrderingTypes'
import { v4 as uuidv4 } from 'uuid';

export const chooseStore = (storeCode, openTime, closedTime) => {
    return {
        type: actionTypes.CHOOSE_STORE,
        payload: {
            id: storeCode,
            openTime: openTime,
            closedTime: closedTime,
        }
    }
}

export const addToCart = (meal, selections, note, qty) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            uuid: uuidv4(),
            id: meal.id,
            name: meal.name,
            price: meal.price,
            selections: selections,
            note: note,
            qty: qty
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

export const updateToCart = (uuid, meal, selections, note, qty) => {
    return {
        type: actionTypes.UPDATE_TO_CART,
        payload: {
            uuid: uuid,
            id: meal.id,
            name: meal.name,
            price: meal.price,
            selections: selections,
            note: note,
            qty: qty
        }
    }
}
