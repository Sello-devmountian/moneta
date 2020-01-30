import axios from 'axios';
//  const getProducts = () => {
//         axios.get('/api/product').then(res => {
//             console.log(res.data);
//             return res.data[0].name
//         })
//         .catch(err => console.log(err));
// }

// export {getProducts}

const customerChange = (amount, total) => {
    var Money = +amount - +total;
    let newTotal = (Money * 100);
    var Twenty = Math.floor(newTotal/2000);
    newTotal -= (2000*Twenty);
    var Ten = Math.floor(newTotal/1000);
    newTotal -= (1000*Ten);
    var Five = Math.floor(newTotal/500);
    newTotal -= (500*Five);
    var One = Math.floor(newTotal/100);
    newTotal -= (100*One);
    var Quarter = Math.floor(newTotal/25);
    newTotal -= (25*Quarter);
    var Dime = Math.floor(newTotal/10);
    newTotal -= (10*Dime);
    var Nickel = Math.floor(newTotal/5);
    newTotal -= (5*Nickel);
    var obj = {Money,Twenty,Ten,Five,One,Quarter,Dime,Nickel,Penny: Math.floor(newTotal)}
    let myChange = Object.keys(obj).filter(k=>obj[k]).reduce((o,k)=>{
        o[k] = obj[k];
        return o
    },{})
    return myChange;
}

const login = async () => {
    let data;
    await axios
        .post('/api/auth/login', {username: 1, password: 1})
        .then(res => (data = res.data))
        .catch(err => console.log(err))
    return data
}



export {
    customerChange,
    login
}

