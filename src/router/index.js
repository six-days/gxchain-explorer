import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Transaction from '@/components/Transaction';
import Account from '@/components/Account';
import Asset from '@/components/Asset';

Vue.use(Router);

const router = new Router({

    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/transaction/:tx_id',
            name: 'Transaction',
            component: Transaction
        },
        {
            path: '/account/:id_or_name',
            name: 'Account',
            component: Account
        },
        {
            path: '/asset/:asset_name',
            name: 'Asset',
            component: Asset
        }

    ]
});

export default router;
