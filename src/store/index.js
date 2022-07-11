// import Vue from 'vue';
import Vuex from 'vuex';

import cone from 'Visualization_Frontend/src/store/cone';
import wslink from 'Visualization_Frontend/src/store/wslink';

/* eslint-enable no-param-reassign */

function createStore () {
  return new Vuex.Store({
    modules: {
      cone,
      wslink,
    },
  });
}

export default createStore;
