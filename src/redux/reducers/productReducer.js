import axios from 'axios';

const initialState = {
    products: [],
    loading: false
}

const GET_PRODUCTS = 'GET_PRODUCTS';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function getProducts(){
    let data = axios.get("/api/product").then(res => res.data)
    return {
        type: GET_PRODUCTS,
        payload: data
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
        case GET_PRODUCTS + '_PENDING':
            return {...state, loading: true}
        case GET_PRODUCTS + '_FULFILLED':
            return {...state, products: payload, loading: false}
        
        case EDIT_PRODUCT:
            return {...state, products: payload}

        case DELETE_PRODUCT:
            return {...state, products: {}}

        default:
            return state;
    }
}