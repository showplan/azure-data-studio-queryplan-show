import Vue from 'vue';

import 'normalize.css';
import 'showplan-vue/dist/showplan-vue.css';
import './styles.css';
import App from './App.vue';

new Vue({
    render: h => h(App),
}).$mount('#app');
