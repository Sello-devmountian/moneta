import {createStore, combineReducers} from 'redux';
import employeeReducer from './reducers/employeeReducer';
import productReducer from './reducers/productReducer';
import customerReducer from './reducers/customerReducer';
import searchReducer from './reducers/searchReducer';

const rootReducer = combineReducers({
    employee: employeeReducer,
    product: productReducer,
    customer: customerReducer,
    search: searchReducer
});

export default createStore(rootReducer);