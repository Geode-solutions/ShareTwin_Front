<template>
  <div class="toto" />
</template>

<script>
// import vtkRemoteView from '@kitware/vtk.js/Rendering/Misc/RemoteView'

export default {
  name: 'RemoteRenderView',
  props: {
    viewId: {
      type: String,
      default: '-1'
    },
    client: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      connected: false
    }
  },
  watch: {
    client () {
      this.connect()
    },
    viewId (id) {
      // console.log('RemoteRenderView', id);
      if (this.connected) {
        this.view.setViewId(id)
        this.view.render()
      }
    },
    enablePicking (value) {
      this.view.getInteractorStyle().setSendMouseMove(value)
    }
  },
  created () {
    // this.view = vtkRemoteView.newInstance({
    //   rpcWheelEvent: 'viewport.mouse.zoom.wheel'
    // })
    // default of 0.5 causes 2x size labels on high-DPI screens. 1 good for demo, not for production.
    if (location.hostname.split('.')[0] === 'localhost') {
      this.view.setInteractiveRatio(1)
    }
  },
  mounted () {
    this.view.setContainer(this.$el)
    window.addEventListener('resize', this.view.resize)
    this.connect()
  },
  beforeDestroy () {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null
    }
    window.removeEventListener('resize', this.view.resize)
    this.view.delete()
  },
  methods: {
    connect () {
      if (this.client) {
        const session = this.client.getConnection().getSession()
        this.view.setSession(session)
        this.view.setViewId(this.viewId)
        this.connected = true
        this.view.render()
      }
    },
    handleClick (event) {
      this.onClick(event)
    }
  }
}
</script>

<style scoped>
.toto {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}
</style>
