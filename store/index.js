// import Vue from 'vue';
import Vuex from 'vuex'

import cone from '@/store/cone'
import wslink from '@/store/wslink'

/* eslint-enable no-param-reassign */

function createStore () {
  return new Vuex.Store({
    modules: {
      cone,
      wslink
    }
  })
}

export default createStore
