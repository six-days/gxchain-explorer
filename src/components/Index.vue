<template>
    <div class="container">
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
    </div>
</template>

<script>
    import { coinList } from '@/common/util';
    export default {
        data () {
            return {
                assets_loading: false,
                assets: coinList
            };
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
