const initialState = {
    products: []
}

const GET_PRODUCTS = 'GET_PRODUCTS';

export function getProducts(productsArr){
    return {
        type: GET_PRODUCTS,
        payload: productsArr
    }
}

export default function productReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PRODUCTS:
            return {...state, products: payload}

        default:
            return state;
    }
}