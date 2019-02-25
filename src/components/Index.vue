<template>
    <div class="container">
        <div class="row">

            <!--Assets-->
            <div class="col-md-14">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <span class="fa fa-fw gxicon gxicon-asset"></span> 迅雷链上资产
                    </div>
                    <div class="panel-body no-padding">
                        <Loading v-show="assets_loading"></Loading>
                        <table class="table table-striped no-margin" v-show="!assets_loading">
                            <thead>
                            <tr>
                                <th>资产名称</th>
                                <th>合约地址</th>
                                <th class="right">发行总量</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="asset in coinList" :key="asset.id">
                                <td>
                                    <img height="30px" alt="logo-thunderchain" src="/static/logo.png"/>
                                    &nbsp;
                                    <router-link :to="{path:`/asset/${asset.symbol}`}">{{asset.symbol}}</router-link>
                                </td>
                                <td>
                                    <router-link :to="{path:`/account/${asset.contract}`}">{{asset.contract}}
                                    </router-link>
                                </td>
                                <td class="right">{{asset.supply}}</td>
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
    export default {
        data () {
            return {
                assets_loading: false,
                supportedAssets: ['wkc', 'hgbc', 'lzt', 'cjf'],
                currentAsset: 'wkc',
                assets: [{
                    'symbol': 'wkc',
                    'supply': '100000000',
                    'contract': '0xead0edd69c479f3a81c2f1b8b36de118c6db8486'
                }]
            };
        }
    };
</script>

<style scoped>
    .page-header {
        margin: 0 0 20px;
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
