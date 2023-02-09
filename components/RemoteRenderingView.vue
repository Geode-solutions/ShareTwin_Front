<template>
  <div ref="canva" class="canva"></div>
</template>

<script setup>
import vtkRemoteView from '@kitware/vtk.js/Rendering/Misc/RemoteView';

const props = defineProps({
  viewId: { type: String, required: true, default: '-1' },
  client: { type: Object, required: true, default: null }
})
const { client, viewId } = props
const connected = ref(false)


const view = vtkRemoteView.newInstance({ rpcWheelEvent: 'viewport.mouse.zoom.wheel' })
const canva = ref(null).




  watch(client, () => {
    connect()
  })

watch(viewId, (id) => {
  if (connected.value) {
    view.setViewId(id)
    view.render()
  }
})

function enablePicking (value) {
  view.getInteractorStyle().setSendMouseMove(value)
}


onMounted(() => {

  // default of 0.5 causes 2x size labels on high-DPI screens. 1 good for demo, not for production.
  if (location.hostname.split('.')[0] === 'localhost') {
    view.setInteractiveRatio(1)
  }
})
onMounted(() => {
  view.setContainer(canva)
  window.addEventListener('resize', view.resize)
  connect()
})
onBeforeUnmount(() => {
  if (this.subscription) {
    this.subscription.unsubscribe()
    this.subscription = null
  }
  window.removeEventListener('resize', view.resize)
  view.delete()
})

function connect () {
  if (client) {
    const session = client.getConnection().getSession()
    view.setSession(session)
    view.setViewId(viewId)
    connected = true
    view.render()
  }
}
function handleClick (event) {
  onClick(event)
}


</script>

<style scoped>
.canva {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}
</style>
