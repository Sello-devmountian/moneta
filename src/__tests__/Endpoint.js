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

const total = () => {
    let order = ['20', '10', '7'];
    let newTotal = order.reduce((acc, b) => acc + (+b * 1.088), 0).toFixed(2)
    return newTotal
}

const sorter = (total) => {
    let sort = total.sort((a, b) => b - a)
    return sort
}

const tax = (money) => {
    let myTax = money.reduce((acc, b) => acc + (+b * 0.088), 0).toFixed(2);
    return myTax; 
}

export {
    customerChange,
    total,
    sorter,
    tax
}

