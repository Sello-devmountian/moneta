const initialState = {
    cart: []
}

const GET_CART = 'GET_CART';

export function getCart(cartArr){
    return {
        type: GET_CART,
        payload: cartArr
    }
}

export default function cartReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_CART:
            return {...state, cart: payload}

        default:
            return state;
    }
}