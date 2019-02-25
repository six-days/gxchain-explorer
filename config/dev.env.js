var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    STA_SERVICE: '"http://192.168.1.168/api.php/"',
    // STA_SERVICE: '"https://wallet.gxb.io/statistics/gxchain"',
    network: JSON.stringify({
        blockchain: 'gxc',
        protocol: 'https',
        host: 'testnet.gxchain.org',
        port: 443,
        chainId: 'c2af30ef9340ff81fd61654295e98a1ff04b23189748f86727d0b26b40bb0ff4'
    })
});
