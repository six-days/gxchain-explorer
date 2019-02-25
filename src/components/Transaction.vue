<template>
    <div class="container">
        <Loading v-show="loading"></Loading>
        <div class="row">
            <div class="col-md-12">
                    <div class="panel panel-default" v-if="transaction.result&&transaction.result.length>0">
                        <div class="panel-heading">
                            <span class="fa fa-fw fa-money-check"></span>&nbsp;交易记录
                        </div>
                        <div class="panel-body no-padding">
                            <table class="table table-striped no-margin">
                                <thead>
                                <tr>
                                    <th>对方钱包</th>
                                    <th>交易类型</th>
                                    <th align="right">余额</th>
                                    <th>日期</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(asset,i) in transaction.result" :key="asset.symbol">
                                    <td>{{i+1}}</td>
                                    <th>{{asset.tradeAccount}}</th>
                                    <th>{{asset.type}}</th>
                                    <td>{{asset.amount}}</td>
                                    <th>{{asset.timestamp}}</th>
                                </tr>
                                </tbody>
                            </table>
                            <div class="footer" v-if="hasMore">
                                <a href="javascript:;" @click="fetch_transaction(page+1)">
                                    <i class="fa fa-angle-double-down"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { fetch_transaction } from '@/services/CommonService';
    import JSON from './partial/JSON.vue';

    export default {
        data () {
            return {
                loading: true,
                page: 1,
                hasMore: true,
                assets: [{
                    'symbol': 'wkc',
                    'amount': '100000000',
                    'address': '0x57519795335f07234d4b21508a63576082d87b53',
                    'type': '转入0',
                    'time': '2018-11-10 00:29:00'}],
                transaction: {}
            };
        },
        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            fetch_transaction (page) {
                let self = this;
                this.transaction = {};
                fetch_transaction(this.$route.params.tx_id, self.page).then(function (resp) {
                    self.transaction = resp.body.data;
                    self.loading = false;
                    self.page = page;
                    let totleSupply = resp.body.data.total;
                    if (!resp.body.data || Math.pow(10, self.page) > totleSupply) {
                        self.hasMore = false;
                    }
                }).catch(() => {
                    self.transaction = {error: this.$t('transaction.error')};
                    self.loading = false;
                });
            }
        },
        computed: {
            ...mapGetters({
                keywords: 'keywords'
            })
        },
        watch: {
            keywords () {
                this.loading = true;
                this.fetch_transaction(1);
            }
        },
        components: {
            json: JSON
        },
        mounted () {
            if (this.$route.params.tx_id !== this.keywords) {
                this.setKeywords({keywords: this.$route.params.tx_id});
            }
            this.fetch_transaction(1);
        }
    };
</script>

<style scoped>

</style>
