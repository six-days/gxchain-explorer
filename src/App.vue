<template>
    <div id="app">
        <v-header></v-header>
        <div class="main-container">
            <router-view></router-view>
        </div>
        <modal-about></modal-about>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import 'bootstrap';
    import 'bootstrap/dist/css/bootstrap.css';
    import './global.css';
    import modalAbout from './components/modals/modal-about.vue';
    import header from './components/partial/Header.vue';
    import footer from './components/partial/Footer.vue';
    import { mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters({
                keywords: 'keywords',
                coinSymbol: 'coinSymbol'
            })
        },
        watch: {
            keywords () {
                this.keywordsChanged();
            },
            coinSymbol () {
                this.keywordsChanged();
            }
        },
        methods: {
            keywordsChanged () {
                this.$router.push(`/asset/${this.keywords}`);
            }
        },
        components: {
            vHeader: header,
            vFooter: footer,
            modalAbout
        }
    };
</script>

<style scoped>
    #seg {
        margin: 20px 10px;
    }
    .router-link-active {
        border-color: #3c4463 !important;
        background: #3c4463 !important;;
        color: #fff !important;;
    }
</style>