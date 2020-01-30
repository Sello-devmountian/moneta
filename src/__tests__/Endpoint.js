import axios from 'axios';

const endpoints = {
    getProducts: async () => {
        let result = await axios.get('/api/product')
        // console.log(result)
        return result
    }
}

module.exports = endpoints;