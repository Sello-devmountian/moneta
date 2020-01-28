const initialState = {
    transactions: []
}

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

export function getTransactions(transactionsArr){
    return {
        type: GET_TRANSACTIONS,
        payload: transactionsArr
    }
}

export default function transactionsReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_TRANSACTIONS:
            return {...state, transactions: payload}
            
        default:
            return state;
    }
}