import { customerChange, total, sorter, tax } from './Endpoint';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {
  initialState,
  getEmployee
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

//Grayson 1
test('testing', () => {
    const {container} = renderWithRedux(<Authentication />)
    // console.log(container);
    expect(container).toBeTruthy();
})

// Grayson 2
test('Returns 1 penny', () => {
    let amount = 20;
    let total = 19.99;
    expect(customerChange(amount, total)).toBeTruthy();
});

// Grayson 3
test('Returns correct total', () => {
    expect(total()).toBe("40.26")
});

// Grayson 4
test('sorts from biggest to smallest', () => {
    let total = [1, 3, 5];
    expect(sorter(total)).toBeTruthy();
})

// Grayson 5
test('Returns correct tax amount', () => {
    let money = ['13', '49', '18'];
    expect(tax(money)).toBe("7.04")
})