import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
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
            path: '/account/:id_or_name',
            name: 'Account',
            component: Account
        },
        {
            path: '/asset/:asset_name/:asset_symbole',
            name: 'Asset',
            component: Asset
        }

    ]
});

export default router;
