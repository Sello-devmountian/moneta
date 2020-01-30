// import React from 'react';
// import {render, act} from '@testing-library/react';
// import axios from 'axios';
import { customerChange, login } from './Endpoint';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  initialState,
  getEmployee,
} from '../redux/reducers/employeeReducer';
import React from 'react';
import { render, act } from '@testing-library/react';
import Authentication from '../Components/Authentication/Authentication';
function renderWithRedux(
  ui,
  { initialState, store = createStore(getEmployee, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

test('testing', () => {
    const {container} = renderWithRedux(<Authentication />)
    // console.log(container);
    expect(container).toBeTruthy();
})




test('Returns 1 penny', () => {
    // Grayson 1
    let amount = 20;
    let total = 19.99;
    expect(customerChange(amount, total)).toBeTruthy();
});

// test('Username is 1', async done => {
//     let username;
//     await act(async () => {
//         username = await login();
//     });
//     console.log(username.username);
//     expect(username.username).toBe(1)
//     done();
// });