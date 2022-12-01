
export const state = () => ({
  ID: '',
  connexion_launched: false,
  cloud_running: false,
  under_maintenance: false,
  internal_error: false,
  captcha_validated: false,
  request_counter: 0
})
export const mutations = {
  setID (state, ID) {
    state.ID = ID
    console.log('ID : ', ID)
  },
  set_connexion_launched (state, connexion_launched) {
    state.connexion_launched = connexion_launched
  },
  set_cloud_running (state, cloud_running) {
    state.cloud_running = cloud_running
    console.log('cloud_running : ', cloud_running)
  },
  set_under_maintenance (state, under_maintenance) {
    state.under_maintenance = under_maintenance
  },
  set_internal_error (state, internal_error) {
    state.internal_error = internal_error
  },
  set_captcha_validated (state, captcha_validated) {
    state.captcha_validated = captcha_validated
    console.log('captcha_validated : ', captcha_validated)
  },
  start_request (state) {
    state.request_counter++
  },
  stop_request (state) {
    state.request_counter--
  }
}
export const actions = {
  async create_connexion ({ commit, dispatch }) {
    if (this.state.connexion_launched) { return }
    commit("set_connexion_launched", true)
    const ID = localStorage.getItem('ID')
    if (ID === null || typeof ID === 'undefined') {
      return dispatch('create_backend')
    } else {
      try {
        const response = await this.$axios.post(`/${ID}/geode/ping`)
        if (response.status === 200) {
          commit("setID", ID)
          commit("set_cloud_running", true)
          return dispatch('ping_task')
        }
      } catch (e) {
        return dispatch('create_backend')
      }
    }
  },
  async create_backend ({ commit, dispatch }) {
    try {
      console.log(this.$config)
      const response = await this.$axios.post(`${this.$config.SITE_BRANCH}/sharetwin/createbackend`)
      if (response.status == 200) {
        commit("setID", response.data.ID)
        localStorage.setItem('ID', response.data.ID)
        commit("set_cloud_running", true)
        return dispatch('ping_task')
      }
    } catch (e) {
      let status = e.toJSON().status
      if (status === 500) {
        commit("set_internal_error", true)
      } else if (status === 404) {
        commit("set_under_maintenance", true)
      }
      console.log("error: ", e.toJSON().message)
    }
  },

  ping_task ({ dispatch }) {
    setInterval(() => dispatch('do_ping'), 10 * 1000)
  },
  async do_ping ({ state, commit }) {
    try {
      const response = await this.$axios.post(`/${state.ID}/geode/ping`)
      if (response.status == 200) {
        if (state.cloud_running == false) {
          commit("set_cloud_running", true)
        }

      }
    } catch (e) {
      if (state.request_counter == 0) {
        console.log("error: ", e)
        commit("set_cloud_running", false)
      }
    }
  }
}
