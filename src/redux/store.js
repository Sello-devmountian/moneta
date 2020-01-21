import {createStore, combineReducers} from 'redux';
import employeeReducer from './reducers/employeeReducer';
import productReducer from './reducers/productReducer';
import customerReducer from './reducers/customerReducer';
import searchReducer from './reducers/searchReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    employee: employeeReducer,
    product: productReducer,
    customer: customerReducer,
    search: searchReducer,
    cart: cartReducer
});

export default createStore(rootReducer);