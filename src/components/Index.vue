<template>
    <div class="container">
        <div class="row">
            <div class="col-md-14">
                <div class="panel panel-default panel-ranking">
                    <div class="panel-heading">
                        <img src="/static/change.png" style="width: 6%">&nbsp;一周账户大500链克变动监控：
                    </div>
                    <div class="pabel-body table-responsive no-padding">

                        <div class="col-md-4" v-for="(change,i) in wkcChanges">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <h5>
                                        <router-link :to="
                                        {path:'/asset/'+change.address+'/wkc'}">{{change.address}}</router-link>
                                    </h5>
                                    <h5>
                                        <span class="label label-danger">{{change.pro_wkc}}</span>{{getChageLable(change.growth)}}<span class="label label-success">{{change.change}}</span>{{getChageLable(change.growth)}}><span class="label label-danger">{{change.now_wkc}}</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <Loading v-show="changes_loading"></Loading>
                        <div class="footer" v-if="hasMore">
                            <a href="javascript:;" @click="loadWKCChage(page+1)">
                                <!-- <i class="fa fa-angle-double-down"></i> -->
                                <img src="/static/lu-icon-angle-double-down.png">
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="row">
            <!--Assets-->
            <div class="col-md-14">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        迅雷链上资产
                    </div>
                    <div class="panel-body no-padding">
                        <Loading v-show="assets_loading"></Loading>
                        <div class="col-md-6" >
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <img v-bind:src="'/static/'+assets.wkc.symbol+'-logo.png'" style="width: 30px;">&nbsp;{{assets.wkc.name}}&nbsp;{{assets.wkc.symbol}}
                                </div>
                                <div class="panel-body">
                                    <h5>
                                        合约地址：
                                        <router-link :to="{path:`/account/${assets.wkc.symbol}`}">{{assets.wkc.contract}}</router-link>
                                    </h5>
                                    <h5>
                                        发行量：<span class="label label-danger">{{assets.wkc.supply}}</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6" >
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <img v-bind:src="'/static/'+assets.hgbc.symbol+'-logo.png'" style="width: 30px;">&nbsp;{{assets.hgbc.name}}&nbsp;{{assets.hgbc.symbol}}
                                </div>
                                <div class="panel-body">
                                    <h5>
                                        合约地址：
                                        <router-link :to="{path:`/account/${assets.hgbc.symbol}`}">{{assets.hgbc.contract}}</router-link>
                                    </h5>
                                    <h5>
                                        发行量：<span class="label label-danger">{{assets.hgbc.supply}}</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6" >
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <img v-bind:src="'/static/'+assets.lzt.symbol+'-logo.png'" style="width: 30px;">&nbsp;{{assets.lzt.name}}&nbsp;{{assets.lzt.symbol}}
                                </div>
                                <div class="panel-body">
                                    <h5>
                                        合约地址：
                                        <router-link :to="{path:`/account/${assets.lzt.symbol}`}">{{assets.lzt.contract}}</router-link>
                                    </h5>
                                    <h5>
                                        发行量：<span class="label label-danger">{{assets.lzt.supply}}</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6" >
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <img v-bind:src="'/static/'+assets.cjf.symbol+'-logo.png'" style="width: 30px;">&nbsp;{{assets.cjf.name}}&nbsp;{{assets.cjf.symbol}}
                                </div>
                                <div class="panel-body">
                                    <h5>
                                        合约地址：
                                        <router-link :to="{path:`/account/${assets.cjf.symbol}`}">{{assets.cjf.contract}}</router-link>
                                    </h5>
                                    <h5>
                                        发行量：<span class="label label-danger">{{assets.cjf.supply}}</span>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-14">
                <div class="panel panel-default panel-ranking">
                    <div class="panel-heading">
                        <img src="/static/money.png" style="width: 8%">&nbsp;链克富豪榜TOP100：
                    </div>
                    <Loading v-show="assets_loading"></Loading>
                    <div class="pabel-body table-responsive no-padding">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>序号</th>
                                <th>地址</th>
                                <th class="text-right">金额</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,i) in wkcRanks">
                                <td>{{i+1}}
                                    <img src="/static/1.png" style="width: 50%" v-if="i==0">
                                    <img src="/static/2.png" style="width: 50%" v-if="i==1">
                                    <img src="/static/3.png" style="width: 50%" v-if="i==2">
                                    
                                </td>
                                <td>
                                    <router-link :to="{path:'/asset/'+item.address+'/wkc'}">
                                        {{item.address}}
                                    </router-link>
                                </td>
                                <td align="right">
                                    <span class="label label-danger">{{item.wkc}}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import { coinList } from '@/common/util';
    import { fetch_wck_rank, fetch_wck_change } from '@/services/CommonService';
    export default {
        data () {
            return {
                assets_loading: true,
                changes_loading: true,
                page: 1,
                hasMore: true,
                assets: coinList,
                wkcRanks: [],
                wkcChanges: []
            };
        },
        methods: {
            loadWKCRank () {
                fetch_wck_rank()
                .then(resp => {
                    this.wkcRanks = resp.body.data;
                    this.assets_loading = false;
                }).catch(ex => {
                    console.error(ex);
                });
            },
            loadWKCChage (page) {
                this.changes_loading = true;
                fetch_wck_change(page)
                .then(resp => {
                    this.page = page;
                    if (!resp.body.data || resp.body.data.length < 6) {
                        this.hasMore = false;
                    }
                    this.wkcChanges = this.wkcChanges.concat(resp.body.data);
                    this.changes_loading = false;
                }).catch(ex => {
                    console.error(ex);
                });
            }
        },
        mounted () {
            this.loadWKCChage(1);
            this.loadWKCRank();
        },
        computed: {
            getChageLable (growth) {
                return function (growth) {
                    let tradeSymbole = '------';
                    if (growth === 1) {
                        tradeSymbole = '++++++';
                    }
                    return tradeSymbole;
                };
            }
        }
    };
</script>

<style scoped>
    .page-header {
        margin: 0 0 20px;
    }

    .label {
        padding: 0.2em .5em .2em;
        font-size: 100%;
    }

    .right {
        text-align: right;
    }

    .center {
        text-align: center;
    }

    #search-result .btn-group {
        margin: 20px;
    }

    #search-result .btn-group .btn.active {
        background-color: #3c4463;
        border-color: #3c4463;
        color: #fff;
    }

    #search-result .null-tip {
        color: #999;
    }

    .section-summary {
        background: #f2f2f2;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 10px;
        transition-duration: 0.3s;
    }

    .section-summary:hover {
        box-shadow: 0 0 15px #ccc;
    }

    .section-summary .top,
    .section-summary .bottom {
        padding: 20px;
    }

    .section-summary .title {
        color: #9d9faf;
        font-size: 15px;
        margin-bottom: 15px;
    }

    .font-bebas {
        font-family: bebas;
        font-size: 20px;
        color: #3c4463;
    }

    .section-summary hr {
        border-color: #e0e0e0;
        margin: 20px -20px;
    }

    .btn-ranking {
        border: transparent;
    }

    .btn-ranking.active, .btn-ranking:active {
        background: #eaf2ff;
        color: #7095e1;
        border: transparent;
        border-radius: 10px;
        box-shadow: none;
    }

    .btn-ranking:focus {
        outline: none;
    }

    .panel-ranking .footer {
        text-align: center;
        padding: 10px 0;
        border-top: 1px solid #eee;
        font-size: 20px;
    }

    .panel-ranking .footer a {
        color: #999;
    }

    .panel-progress .panel-body {
        border-top: 1px solid #eee;
    }

    .progress-bar-info {
        background-color: #3d4463;
    }

    .panel-witness .table-responsive, .panel-trust-nodes .table-responsive {
        margin-bottom: 0;
        border: none;
    }

    .panel-trust-nodes .tip {
        color: #666;
    }

    .panel-trust-nodes pre {
        border: none;
        border-radius: 0;
        margin: 0;
        padding: 10px;
        font-size: 8px;
        line-height: 8px;
        color: #666;
    }
</style>
