import React from 'react';
import {render} from '@testing-library/react';
// import axios from 'axios';
const endpoints = require('./Endpoint');


test('Returns an array of products', () => {
    console.log(endpoints.getProducts());
    expect(endpoints.getProducts()).toContain({});
})