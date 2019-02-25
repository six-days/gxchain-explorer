<template>
    <div class="container">
        <Loading v-show="loading"></Loading>
        <section v-if="account_info&&account_info.id" v-show="!loading">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        {{asset.symbol}}
                    </div>
                    <div class="panel-body">
                        <p>{{asset.description}}</p>
                    </div>
                </div>
            </div>
        </div>
            <div class="row">
                <!--Code-->
                <div class="col-md-6" >
                    <div class="panel panel-default panel-code">
                        <div class="panel-heading">
                            <span class="fas fa-code"></span>&nbsp;合约代码
                        </div>
                        <div class="panel-body no-padding">
                            <div class="tab-content">
                                <pre>var a = 1</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <!--ABI-->
                <div class="col-md-6">
                    <div class="panel panel-default panel-abi">
                        <div class="panel-heading">
                            <span class="fas fa-angle-right"></span>&nbsp;合约ABI
                        </div>
                        <div class="panel-body no-padding">
                            <div class="tab-content">
                                <pre>var a = 1</pre>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!--Recent Transactions-->
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <span class="fa fa-fw gxicon gxicon-transaction"></span>&nbsp;{{$t('index.transactions.title')}}
                            <a class="pull-right more-btn" v-on:click="collapse"
                               v-if="latestTransactions.length > 9">{{$t('account.basic.more')}}</a>
                        </div>
                        <div class="panel-body no-padding">
                            <Loading v-show="history_loading"></Loading>
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered no-margin" v-show="!history_loading">
                                    <thead>
                                    <tr>
                                        <th>{{$t('index.transactions.type')}}</th>
                                        <th>{{$t('index.transactions.content')}}</th>
                                        <th class="right">{{$t('index.transactions.time')}}</th>
                                    </tr>
                                    </thead>
                                    <History_Op :latestTransactions="latestTransactions" parent="Account"></History_Op>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { ChainStore } from 'gxbjs';
    import { Apis } from 'gxbjs-ws';
    import { calc_block_time, get_assets_by_ids } from '@/services/CommonService';
    import filters from '@/filters';
    import History_Op from './partial/History_Op.vue';

    export default {
        data () {
            return {
                loading: true,
                history_loading: true,
                asset: {
                    'symbol': 'wkc',
                    'supply': '100000000',
                    'description': '链克是迅雷链上的资产',
                    'contract': '0xead0edd69c479f3a81c2f1b8b36de118c6db8486'
                },
                abi: {
                    type: 'raw'
                },
                code: {
                    type: 'wast',
                    wast: ''
                },
                current_table: {
                    headers: [],
                    name: '',
                    page: 0,
                    hasMore: false,
                    data: []
                },
                account_info: null,
                latestTransactions: [],
                history_length: 100,
                isTrustNode: -1,
                ChainStore
            };
        },
        filters: filters,
        methods: {

            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            collapse () {
                $('.collapse').collapse('toggle');
            },
            getWAST () {
                this.$http.post('/api/wasm2wast', {wasm: this.account_info.code}).then(resp => {
                    this.code.wast = resp.body.wast;
                }).catch(console.error);
            },
            getActionDefine (action_name) {
                let actionDef = this.account_info.abi.structs.find(s => s.name === action_name);
                return `void ${action_name}(${actionDef.fields.map(f => `${f.type} ${f.name}`).join(', ')})`;
            },
            getTableDefine (tables) {
                return this.account_info.abi.structs.filter(s => tables.find(t => t.name === s.name));
            },
            loadTableData (page) {
                const pageSize = 10;
                Apis.instance().db_api().exec('get_table_rows', [
                    this.account_info.name, // contract_name
                    this.current_table.name, // table_name
                    pageSize * page, // start
                    pageSize // limit
                ]).then(resp => {
                    this.current_table.page = page;
                    this.current_table.data = resp.rows.map(row => {
                        let result = [];
                        this.current_table.headers.forEach(h => {
                            result.push(row[h]);
                        });
                        return result;
                    });
                    this.current_table.hasMore = resp.rows.length === pageSize;
                });
            },
            loadTrustNodeInfo (id) {
                if (this.trustNodeInfoLoading) {
                    return;
                }
                this.trustNodeInfoLoading = true;
                Promise.all([
                    Apis.instance().db_api().exec('get_witness_by_account', [id]),
                    Apis.instance().db_api().exec('get_committee_member_by_account', [id])
                ]).then(results => {
                    this.isTrustNode = results[0] && results[1];
                });
            },
            onUpdate () {
                try {
                    if (!ChainStore.fetchFullAccount(this.$route.params.id_or_name)) {
                        this.loading = false;
                        return;
                    }
                } catch (e) {
                    this.loading = false;
                }
                this.account_info = ChainStore.fetchFullAccount(this.$route.params.id_or_name).toJS();
                if (this.account_info && this.account_info.code && !this.code.wast) {
                    if (this.account_info.abi.tables.length > 0) {
                        this.current_table.name = this.account_info.abi.tables[0].name;
                    }
                    this.getWAST();
                }
                if (this.account_info && this.account_info.id && this.isTrustNode === -1) {
                    this.loadTrustNodeInfo(this.account_info.id);
                }
                let ids = Object.keys(this.account_info.balances);
                get_assets_by_ids(ids).then(assets => {
                    let assetMap = {};
                    assets.forEach(asset => {
                        assetMap[asset.id] = asset;
                    });
                    for (let i = 0; i < ids.length; i++) {
                        let obj = {
                            symbol: assetMap[ids[i]].symbol,
                            amount: filters.number(((ChainStore.getObject(this.account_info.balances[ids[i]]).get('balance') || 0) / 100000).toFixed(assetMap[ids[i]].precision), assetMap[ids[i]].precision)
                        };
                        this.account_info.balances[ids[i]] = obj;
                    }
                });
                if (this.account_info.history) {
                    let length = this.account_info.history.length < this.history_length ? this.account_info.history.length : this.history_length;
                    for (let i = length - 1; i >= 0; i--) {
                        this.account_info.history[i].op.block_id = this.account_info.history[i].block_num;

                        if (ChainStore.getObject('2.0.0') && ChainStore.getObject('2.1.0')) {
                            let block_interval = ChainStore.getObject('2.0.0').get('parameters').get('block_interval');
                            let head_block_number = ChainStore.getObject('2.1.0').get('head_block_number');
                            let head_block_time = new Date(ChainStore.getObject('2.1.0').get('time') + '+00:00');
                            this.account_info.history[i].op.timestamp = calc_block_time(this.account_info.history[i].block_num, block_interval, head_block_number, head_block_time);
                        }

                        this.latestTransactions.unshift(this.account_info.history[i].op);
                        if (this.latestTransactions.length > length) {
                            this.latestTransactions.pop();
                        }
                    }
                    this.history_loading = false;
                }
                this.loading = false;
            }
        },
        watch: {
            keywords () {
                this.loading = true;
                this.account_info = null;
                this.current_table = {
                    headers: [],
                    name: '',
                    page: 0,
                    data: [],
                    hasMore: false
                };
                this.code.wast = '';
                this.latestTransactions = [];
                this.onUpdate();
            },
            'current_table.name': function (val) {
                if (val) {
                    this.account_info.abi.structs.forEach(s => {
                        if (s.name === val) {
                            this.current_table.headers = s.fields.map(f => f.name);
                            this.current_table.page = 0;
                            this.loadTableData(0);
                        }
                    });
                }
            },
            '$route' () {
                if (this.$route.params.id_or_name !== this.keywords) {
                    this.loading = true;
                    this.account_info = null;
                    this.latestTransactions = [];
                    this.setKeywords({keywords: this.$route.params.id_or_name});
                }
            }
        },
        computed: {

            ...mapGetters({
                keywords: 'keywords'
            }),

            is_contract_account () {
                return this.account_info && !!this.account_info.code;
            },

            account_type () {
                let result = [];
                if (this.account_info.code) {
                    return `<span class="label label-warning">${this.$t('account.membership.contract')}</span>`;
                }
                if (this.account_info.membership_expiration_date !== '1970-01-01T00:00:00') {
                    result.push(`<span class="label label-warning">${this.$t('account.membership.lifetime')}</span>`);
                } else {
                    result.push(`<span class="label label-default">${this.$t('account.membership.normal')}</span>`);
                }
                if (this.isTrustNode) {
                    result.push(`<span class="label label-success">${this.$t('account.membership.trustnode')}</span>`);
                }
                return result.join('&nbsp;');
            }
        },
        mounted () {
            if (this.$route.params.id_or_name !== this.keywords) {
                this.setKeywords({keywords: this.$route.params.id_or_name});
            }
            ChainStore.subscribe(this.onUpdate);
            this.onUpdate();
        },
        destroyed () {
            ChainStore.unsubscribe(this.onUpdate);
        },
        components: {
            History_Op: History_Op
        }
    };
</script>

<style scoped>
    .color-warning{
        color: #ffbc10;
    }
    .right {
        text-align: right;
    }

    .center {
        text-align: center;
    }

    .more-btn {
        cursor: pointer;
    }

    .overflow-wrap {
        word-break: break-all;
    }

    .panel .table-responsive {
        margin-bottom: 0;
        border: none;
    }

    .panel-abi pre, .panel-code pre {
        border: none;
        border-top: 1px solid #eee;
        border-radius: 0;
        margin: 0;
        max-height: 500px;
    }

    .panel-code .wasm pre {
        white-space: normal
    }

    .panel-code .panel-heading, .panel-abi .panel-heading {
        border-bottom: 1px solid #eee;
    }

    .panel-code .panel-body, .panel-abi .panel-body {
        padding-top: 10px !important;
    }

    .panel-tables {
        margin: 10px;
    }

    .panel-tables .panel-heading {
        font-size: 15px;
        background: #eee;
        padding: 5px;
    }
</style>
