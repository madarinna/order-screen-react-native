const data = require('./data.json');

export function getCustomerData() { // to access customers data
    return data.customers;
}


export function getProductData() { // to access products data
    return data.products;
}