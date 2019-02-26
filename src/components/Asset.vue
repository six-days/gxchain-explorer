<template>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default panel-ranking"  v-if="rankings&&rankings.length>0">
                    <div class="panel-heading">
                        <span class="fa fa-fw gxicon gxicon-rank"></span>&nbsp;账号余额：<span class="label label-danger">{{coinBalance}}&nbsp;{{coinSymbol}}</span>，共<span class="label label-info">{{totleSupply}}</span>条交易
                    </div>
                    <div class="pabel-body table-responsive no-padding">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>交易地址</th>
                                <th >类型</th>
                                <th class="text-right">金额</th>
                                <th >时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,i) in rankings">
                                <td>{{i+1}}</td>
                                <td>
                                    <img v-bind:src="'/static/'+coinSymbol+'-logo.png'" style="width: 18px;height: 18px;">
                                    &nbsp;
                                    <router-link :to="{path:'/asset/'+item.tradeAccount}">
                                        {{item.tradeAccount}}
                                    </router-link>
                                </td>
                                <td>
                                <span data-toggle="tooltip" data-placement="bottom" :title="'收录区块信息 #' + item.blocknum" :class="tradeSymboleF(item.type).label">{{tradeSymboleF(item.type).title}}</span>
                                </td>
                                <td align="right">
                                    <span :class="tradeSymboleF(item.type).label">{{item.amount}}</span>
                                </td>
                                <td>
                                    {{item.timestamp}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="footer" v-if="hasMore">
                            <a href="javascript:;" @click="loadTransactions(page+1)">
                                <i class="fa fa-angle-double-down"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div v-else v-show="!loading">
                    <h4 class="page-header">交易记录</h4>
                    <p class="null-tip">{{errormsg}}</p>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { fetch_transaction, fetch_balance } from '@/services/CommonService';
    export default {
        data () {
            return {
                loading: true,
                page: 1,
                hasMore: true,
                totleSupply: 0,
                rankings: [],
                coinBalance: null,
                errormsg: null
            };
        },
        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            loadBalance () {
                fetch_balance(this.coinSymbol, this.$route.params.asset_name)
                .then(resp => {
                    this.coinBalance = resp.body.data[0];
                }).catch(ex => {
                    console.error(ex);
                });
            },
            loadTransactions (page) {
                const pageSize = 10;
                fetch_transaction(this.coinSymbol, this.$route.params.asset_name, page)
                .then(resp => {
                    this.page = page;
                    this.totleSupply = resp.body.data.total;
                    if (!resp.body.data || pageSize * page > this.totleSupply) {
                        this.hasMore = false;
                    }
                    if (resp.body.state !== 1 && resp.body.data.result !== []) {
                        this.rankings = this.rankings.concat(resp.body.data.result);
                    }
                    this.errormsg = resp.body.msg;
                    this.loading = false;
                }).catch(ex => {
                    console.error(ex);
                });
            }
        },
        watch: {
            keywords () {
                this.loading = true;
                this.hasMore = true;
                this.rankings = [];
                this.loadBalance();
                this.loadTransactions(1);
            },
            coinSymbol () {
                this.loading = true;
                this.hasMore = true;
                this.rankings = [];
                this.loadBalance();
                this.loadTransactions(1);
            },
            '$route' () {
                if (this.$route.params.asset_name !== this.keywords) {
                    this.loading = true;
                    this.setKeywords({keywords: this.$route.params.asset_name});
                }
            }
        },
        computed: {
            ...mapGetters({
                keywords: 'keywords',
                coinSymbol: 'coinSymbol'
            }),
            tradeSymboleF (tradeType) {
                return function (tradeType) {
                    let tradeSymbole = null;
                    if (tradeType === 1) {
                        tradeSymbole = {label: 'label label-success', title: '转入'};
                    } else if (tradeType === 0) {
                        tradeSymbole = {label: 'label label-danger', title: '转出'};
                    } else {
                        tradeSymbole = {label: 'label label-primary', title: '其它'};
                    }
                    return tradeSymbole;
                };
            }
        }
    };
</script>
<style scoped>
    .panel-ranking .footer {
        text-align: center;
        padding: 10px 0;
        border-top: 1px solid #eee;
        font-size: 20px;
    }
    .panel-ranking .footer a {
        color: #999;
    }
</style>