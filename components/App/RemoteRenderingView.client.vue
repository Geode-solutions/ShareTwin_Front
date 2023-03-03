<template>
  <v-col style="overflow: hidden; position: relative; z-index: 1; height: 100%; width: 100%" ref="viewer" class="viewer">
  </v-col>
</template>

<script setup>
import vtkRemoteView from '@kitware/vtk.js/Rendering/Misc/RemoteView';

const props = defineProps({
  viewId: { type: String, default: '-1' },
  client: { type: Object, required: true }
})
const { client, viewId } = toRefs(props)
const connected = ref(false)

const view = vtkRemoteView.newInstance({ rpcWheelEvent: 'viewport.mouse.zoom.wheel' })
// default of 0.5 causes 2x size labels on high-DPI screens. 1 good for demo, not for production.
if (location.hostname.split('.')[0] === 'localhost') {
  view.setInteractiveRatio(1)
}
const viewer = ref(null)


watch(client, (new_client) => {
  connect()
})

watch(viewId, (id) => {
  if (connected.value) {
    view.setViewId(id)
    view.render()
  }
})

function resize () {
  view.getCanvasView().setSize(0, 0) // hack to fit full size
  view.resize();
}


onMounted(async () => {
  window.addEventListener('resize', resize)
  await nextTick()
  view.setContainer(viewer.value.$el)
  connect()
  resize()

})

function connect () {
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
