const initialState = {
    products: []
}

const GET_PRODUCTS = 'GET_PRODUCTS';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function getProducts(productsArr){
    return {
        type: GET_PRODUCTS,
        payload: productsArr
    }
}

export function editProduct(products){
    return {
        type: EDIT_PRODUCT,
        payload: products
    }
}

export function deleteProduct(product){
    return {
        type: DELETE_PRODUCT,
        payload: null
    }
}

export default function productReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_PRODUCTS:
            return {...state, products: payload}
        
        case EDIT_PRODUCT:
            return {...state, products: payload}

        case DELETE_PRODUCT:
            return {...state, products: {}}

        default:
            return state;
    }
}