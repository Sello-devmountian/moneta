import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware'
import employeeReducer from './reducers/employeeReducer';
import productReducer from './reducers/productReducer';
import customerReducer from './reducers/customerReducer';
import transactionsReducer from './reducers/transactionsReducer';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
    employee: employeeReducer,
    product: productReducer,
    customer: customerReducer,
    transactions: transactionsReducer,
    search: searchReducer
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));