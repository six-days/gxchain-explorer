<template>
    <div class="container">
        <Loading v-show="loading"></Loading>
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <img v-bind:src="'/static/'+$route.params.id_or_name+'-logo.png'" style="width: 30px;">&nbsp;
                        {{asset.name}}
                    </div>
                    <div class="panel-body">
                        <p>{{asset.description}}</p>
                    </div>
                    <div class="panel-heading">
                        创世地址：
                       <h5><router-link :to="{path:'/asset/'+asset.address+'/'+$route.params.id_or_name}">{{asset.address}}</router-link></h5>

                    </div>
                </div>
            </div>
        </div>
            <div class="row">
                <!--Code-->
                <div class="col-md-6" >
                    <div class="panel panel-default panel-code">
                        <div class="panel-heading">
                            &nbsp;合约代码
                        </div>
                        <div class="panel-body no-padding">
                            <div class="tab-content">
                                <pre>{{asset.code}}</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <!--ABI-->
                <div class="col-md-6">
                    <div class="panel panel-default panel-abi">
                        <div class="panel-heading">
                            &nbsp;合约ABI
                        </div>
                        <div class="panel-body no-padding">
                            <div class="tab-content">
                                <pre>{{asset.abi}}</pre>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    </div>
</template>

<script>
    import { fetch_contract } from '@/services/CommonService';

    export default {
        data () {
            return {
                loading: true,
                asset: {}
            };
        },
        methods: {
            loadContract () {
                fetch_contract(this.$route.params.id_or_name)
                .then(resp => {
                    this.asset = resp.body.data;
                    this.loading = false;
                }).catch(ex => {
                    console.error(ex);
                });
            }
        },
        mounted () {
            this.loadContract();
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
