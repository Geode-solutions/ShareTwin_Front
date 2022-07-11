import Vue from 'vue';
import Vuex from 'vuex';

import App from 'Visualization_Frontend/src/components/App.vue';
import vuetify from 'Visualization_Frontend/src/plugins/vuetify.js';
import store from 'Visualization_Frontend/src/store';

/* eslint-disable-next-line import/extensions */
import 'typeface-roboto';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuex);

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
