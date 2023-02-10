<template>
  <div style="overflow: hidden; position: relative; z-index: 0"  ref="viewer" class="viewer">toto</div>
</template>

<script setup>
import vtkRemoteView from '@kitware/vtk.js/Rendering/Misc/RemoteView';

const props = defineProps({
  viewId: { type: String, default: '-1' },
  client: { type: Object, required: true }
})
const { client, viewId } = toRefs(props)
const connected = ref(false)
console.log("coucou", client, process.client)

const view = vtkRemoteView.newInstance({ rpcWheelEvent: 'viewport.mouse.zoom.wheel' })
// default of 0.5 causes 2x size labels on high-DPI screens. 1 good for demo, not for production.
if (location.hostname.split('.')[0] === 'localhost') {
  view.setInteractiveRatio(1)
}
const viewer = ref(null)


watch(client, (new_client) => {
  console.log(new_client)
  // console.log("client", client, new_client)
  connect()
})

watch(viewId, (id) => {
  if (connected.value) {
    view.setViewId(id)
    view.render()
  }
})

// function enablePicking (value) {
//   view.getInteractorStyle().setSendMouseMove(value)
// }


onMounted(async () => {
  window.addEventListener('resize', view.resize)
  window.addEventListener('resize', () => { console.log("rect", viewer.value.getBoundingClientRect()) })
  console.log("onMounted", client, viewer.value)
  await nextTick()
  view.setContainer(viewer.value)
  connect()
  console.log("onMounted2", client, viewer.value)

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
  console.log('client', client)
  const session = client.value.getConnection().getSession()
  view.setSession(session)
  view.setViewId(viewId.value)
  connected.value = true
  view.render()
}
function handleClick (event) {
  onClick(event)
}


</script>

<style>
.viewer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  overflow: hidden;
  z-index: 1;
}
</style>
