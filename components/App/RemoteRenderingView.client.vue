<template>
  <v-col v-element-size="resize" style="overflow: hidden; position: relative; z-index: 1; height: 100%; width: 100%"
    ref="viewer" class="viewer" @click="get_x_y()">
  </v-col>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
import vtkRemoteView from '@kitware/vtk.js/Rendering/Misc/RemoteView';
import { useMouse } from '@vueuse/core'


import { vElementSize } from '@vueuse/components'

const app_store = use_app_store()

const { display_point_picker } = storeToRefs(app_store)

function get_x_y () {
  if (display_point_picker.value === true) {
    const { x, y } = useMouse({ touch: false })
    console.log('x', x.value)
    console.log('y', y.value)
    app_store.add_point(x.value, y.value)
  }

}

const props = defineProps({
  viewId: { type: String, default: '-1' },
  client: { type: Object, required: true }
})

const viewer = ref(null)
const { width, height } = useElementSize(viewer)

function resize () {
  view.getCanvasView().setSize(0, 0) // hack to fit full size
  view.resize();
}
watch(display_point_picker, value => {
  const cursor = value == true ? 'crosshair' : 'pointer'
  view.getCanvasView().setCursor(cursor)
})
watch(width, value => {
  resize()
})
watch(height, value => {
  resize()
})
const { client, viewId } = toRefs(props)
const connected = ref(false)

const view = vtkRemoteView.newInstance({ rpcWheelEvent: 'viewport.mouse.zoom.wheel' })
// default of 0.5 causes 2x size labels on high-DPI screens. 1 good for demo, not for production.
if (location.hostname.split('.')[0] === 'localhost') {
  view.setInteractiveRatio(1)
}


watch(client, (new_client) => {
  connect()
})

watch(viewId, (id) => {
  if (connected.value) {
    view.setViewId(id)
    view.render()
  }
})

onMounted(async () => {
  if (process.client) {
    window.addEventListener('resize', resize)
    await nextTick()
    view.setContainer(viewer.value.$el)
    connect()
    resize()
    app_store.set_display_point_picker(true)
  }
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
