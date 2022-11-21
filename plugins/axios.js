export default function ({ $axios, $config, store }) {
  $axios.setBaseURL($config.GEODE_URL)

  $axios.onRequest((config) => {
    store.commit('startRequest')
  })
  $axios.onResponse((response) => {
    store.commit('stopRequest')
  })
  $axios.onError((error) => {
    store.commit('stopRequest')
  })
}
