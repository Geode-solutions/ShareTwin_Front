<template>
  <div class="view"></div>
</template>

<script steup>
import vtkRemoteView from 'vtk.js/Sources/Rendering/Misc/RemoteView';

const props = defineProps({
  viewId: { type: String, required: true, default: '-1' },
  client: { type: Object, required: true, default: null }
})
const { client, viewId } = props

const connected = ref(false)

onCreated(() => {
  view = vtkRemoteView.newInstance({
    rpcWheelEvent: 'viewport.mouse.zoom.wheel',
  })
  // default of 0.5 causes 2x size labels on high-DPI screens. 1 good for demo, not for production.
  if (location.hostname.split('.')[0] === 'localhost') {
    this.view.setInteractiveRatio(1)
  }
})
onMounted(() => {
  view.setContainer(this.$el)
  window.addEventListener('resize', view.resize)
  connect()
})
function connect () {
  if (client) {
    const session = client.getConnection().getSession()
    view.setSession(session)
    view.setViewId(viewId)
    connected.value = true
    view.render()
  }
}
function handleClick (event) {
  this.onClick(event);
}
// watch: {
//   client() {
//     connect()
//   },
//   viewId(id) {
//     // console.log('RemoteRenderView', id);
//     if (this.connected) {
//       this.view.setViewId(id);
//       this.view.render();
//     }
//   },
//   enablePicking(value) {
//     this.view.getInteractorStyle().setSendMouseMove(value);
//   },
// }
onBeforeUnmount(() => {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
  }
  window.removeEventListener('resize', view.resize);
  view.delete();
})
</script>

<style scoped>
.view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}
</style>
