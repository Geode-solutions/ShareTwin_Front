export default function ({ $axios, $config, store }) {
  $axios.setBaseURL($config.GEODE_URL)

  $axios.onRequest((config) => {
    store.commit('start_request')
  })
  $axios.onResponse((response) => {
    store.commit('stop_request')
  })
  $axios.onError((error) => {
    store.commit('stop_request')
  })
}
