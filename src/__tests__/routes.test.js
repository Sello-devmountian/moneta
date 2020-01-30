import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

const {LOCAL_HOST} = process.env;

describe('links', () => {
    test('links to checkout', () => {
        expect(`${LOCAL_HOST}checkout`).toContain('/checkout')
    })
    test('links to authorization', () => {
        expect(`${LOCAL_HOST}`).toContain('/')
    })
    test('links to transactions', () => {
        expect(`${LOCAL_HOST}transactions`).toContain('/transactions')
    })
    test('links to customers', () => {
        expect(`${LOCAL_HOST}customers`).toContain('/customers')
    })
    test('links to admin', () => {
        expect(`${LOCAL_HOST}admin`).toContain('/admin')
    })
})