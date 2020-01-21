const initialState = {
    customer: []
}

const GET_CUSTOMER = 'GET_CUSTOMER';

export function getCustomer(customerObj){
    return {
        type: GET_CUSTOMER,
        payload: customerObj
    }
}

export default function customerReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_CUSTOMER:
            return {...state, customer: payload}
            
        default:
            return state;
    }
}