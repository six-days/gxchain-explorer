import Vue from 'vue';

export const fetch_transaction = (symbole, address, pageNum) => {
    return Vue.http.get('/api.php/getTokenRecords', {
        params: {
            symbole: symbole,
            address: address,
            pageNum: pageNum}});
};

export const fetch_balance = (symbole, address) => {
    return Vue.http.get('/api.php/getBalance', {
        params: {
            symbole: symbole,
            address: address}});
};

export const fetch_contract = (symbole) => {
    return Vue.http.get('/api.php/getContract', {
        params: {symbole: symbole}});
};

export const fetch_wck_rank = () => {
    return Vue.http.get('/api.php/getRank');
};

export const fetch_wck_change = (num) => {
    return Vue.http.get('/api.php/getWKCChange', {
        params: {num: num}});
};
