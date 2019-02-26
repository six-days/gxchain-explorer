import '@/common/global';
import '@/common/util';
import Vue from 'vue';
import App from './App';
import router from '@/router';
import VueResource from 'vue-resource';
import store from '@/vuex/store';
import Loading from './components/partial/Loading.vue';
import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';

Vue.use(VueResource);
Vue.component('Loading', Loading);
Vue.component('Chart', ECharts);

Vue.config.productionTip = true;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
