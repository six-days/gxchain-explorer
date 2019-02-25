<template>
    <header class="site-header">
        <nav class="navbar navbar-static-top main-navbar" id="top">
            <div class="container">
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" type="button" data-toggle="collapse"
                            data-target="#bs-navbar"
                            aria-controls="bs-navbar" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <nav id="bs-navbar" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#modal-about" data-toggle="modal">{{$t('header.about')}}</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true"
                               aria-expanded="false">
                                <img class="flagimg" :src="flagImg[$t('header.flag')]">
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li ><a href="javascript:;">
                                    <img class="flagimg"
                                         :src="flagImg['zh']">中文</a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <!-- <li @click="switchLanguage('en')"><a href="javascript:;">
                                    <img class="flagimg"
                                         :src="flagImg['en']">English</a>
                                </li> -->
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </nav>
        <div class="container jumbotron">
            <div class="row">
                <div class="col-xs-12">
                    <p class="text-center">
                        <router-link :to="{path:'/'}">
                            <img height="60px" alt="logo-thunderchain" src="/static/exploer-logo.png"
                                 v-on:click="clearInput"/>
                        </router-link>
                    </p>
                    <div class="search-wraper" role="search">
                        <div class="input-group">
                             <div class="input-group-btn">
                                  <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                          {{coinName}}({{symbol}})&nbsp;<span class="caret"></span>
                                  </button>
                                  <ul class="dropdown-menu">
                                    <li v-for="item in assets" v-on:click="chooseChanged(item.symbol, item.name)"><a href="javascript:void(0);">{{item.name}}({{item.symbol}})</a></li>
                                  </ul>
                              </div>
                        <input type="text" class="form-control" placeholder="在此输入链克口袋地址" autocomplete="off" v-model="search"/>
                        <span class="input-group-btn"><!--不换行，与相邻元素内联-->
                              <button class="btn btn-primary" v-on:click="eventChanged">搜索</button>
                        </span>
                     </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        data () {
            return {
                account: null,
                connected: false,
                gscatter: null,
                symbol: 'wkc',
                coinName: '链克',
                search: '',
                flagImg: {
                    'zh': require('../../../static/language-dropdown/img/CN.png'),
                    'en': require('../../../static/language-dropdown/img/US.png')
                },
                assets: [{'symbol': 'wkc', 'name': '链克'},
                    {'symbol': 'hgbc', 'name': '碱基'},
                    {'symbol': 'lzt', 'name': '懒钻'},
                    {'symbol': 'cjf', 'name': '超积分'}
                ]
            };
        },
        watch: {
            'keywords' () {
                if (this.keywords !== this.search) {
                    this.search = this.keywords;
                }
            }
        },
        methods: {
            ...mapActions({
                setKeywords: 'setKeywords'
            }),
            eventChanged () {
                this.setKeywords({keywords: this.search, coinSymbol: this.symbol});
            },
            chooseChanged (choose, name) {
                this.symbol = choose;
                this.coinName = name;
            },
            clearInput () {
                this.setKeywords({keywords: '', coinSymbol: ''});
            }
        }
    };
</script>

<style scoped>
    .site-header {
        position: relative;
        text-align: center;
        background-color: #3c4463;
        background-image: url("../../../static/banner.png");
        background-position: 0 0;
        background-size: 100%;
        color: #fff;
        margin-bottom: 0
    }

    .main-navbar {
        margin-bottom: 0;
        background-color: transparent
    }

    .main-navbar a {
        color: #eee
    }

    .main-navbar a:hover {
        color: #fff
    }

    .main-navbar .nav > li > a:focus, .main-navbar .nav > li > a:hover {
        background-color: transparent
    }

    .main-navbar .nav .open > a,
    .main-navbar .nav .open > a:hover,
    .main-navbar .nav .open > a:focus {
        background: transparent;
    }

    .dropdown-menu > li > a:hover,
    .dropdown-menu > li > a:focus {
        color: #333;
    }

    .main-navbar .navbar-toggle .icon-bar {
        background-color: #fff
    }

    .main-navbar .navbar-brand {
        margin: 0;
        height: 30px;
        position: relative;
        top: -5px;
    }

    .jumbotron {
        background-color: transparent;
        padding-bottom: 25px;
    }

    .site-header h1 {
        font-size: 20px;
    }

    .site-header p {
        color: #f4f4f4;
        font-size: 15px;
    }

    @media screen and (min-width: 768px) {
        .site-header {
        }

        .site-header .jumbotron {
            padding-top: 0
        }

        .site-header h1 {
            font-size: 56px;
            text-shadow: -5px 5px 0 rgba(0, 0, 0, .1)
        }

        .site-header p {
            color: #f4f4f4;
            font-size: 21px;
        }

        .dropdown-menu > li > a {
            color: #666;
        }
    }

    .site-header .fa, .site-header .gxicon {
        color: #a3a3a4;
        font-size: 16px
    }

    .site-header .fa-close, .site-header .gxicon-search {
        position: absolute;
        right: 14px;
        top: 14px
    }

    .site-header .form-group {
        position: relative;
        margin: 0;
    }

    .site-header .search-wraper {
        max-width: 680px;
        margin: 25px auto 0;
    }

    .site-header .search {
        -webkit-box-shadow: none;
        box-shadow: none;
        font-size: 14px;
        padding: 10px 30px;
        border-radius: 0;
        height: auto;
        text-align: center;
        border-color: transparent;
        border-radius: 25px;
    }

    .site-header .search::-ms-clear {
        display: none
    }

    .site-header .search:focus {
        -webkit-box-shadow: 0 0 6px rgba(0, 0, 0, .6);
        box-shadow: 0 0 6px rgba(0, 0, 0, .6)
    }

    .site-header .search + .fa.onX {
        cursor: pointer
    }

    .site-header span {
        font-size: 14px
    }

    .flagimg {
        width: 20px;
        margin-right: 10px;
    }

    .news {
        margin-top: 15px;
        margin-bottom: 0;
    }

    .news a {
        color: #fff;
        font-size: 15px;
    }

    .news .fa-fire {
        color: #ff4519;
        margin-right: 5px;
    }
</style>
