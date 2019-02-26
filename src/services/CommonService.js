import Vue from 'vue';

export const fetch_transaction = (symbole, address, pageNum) => {
    return Vue.http.post('/api.php/getTokenRecords', {
        symbole: symbole,
        address: address,
        pageNum: pageNum});
};

export const fetch_balance = (symbole, address) => {
    return Vue.http.post('/api.php/getBalance', {
        symbole: symbole,
        address: address});
};

export const fetch_contract = (symbole) => {
    return Vue.http.post('/api.php/getContract', {
        symbole: symbole});
};
