import * as actionTypes from './OrderingTypes'

export const addToCart = (meal, selections, note) => {
    console.log('meal:', meal)
    return {
        type: actionTypes.ADD_TO_CART,
        payload: {
            id: meal.id,
            name: meal.name,
            price: meal.price,
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
