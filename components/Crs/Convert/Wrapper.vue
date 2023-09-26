<template>
  <v-dialog v-model="display_crs_converter" width="70%" class="dialog" transition="dialog-top-transition">
    <v-row>
      <v-col cols="11" class="pa-0">
      </v-col>
      <v-col cols="1" class="pa-0">
        <v-btn color="primary" width="5" @click="app_store.$patch({ display_crs_converter: false })"><v-icon
            icon="mdi-close" color="white" /></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-0">
        <Stepper />
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup>
import CrsSelector from '@/components/Crs/Selector.vue'
import CrsConvertButton from '@/components/Crs/Convert/Button.vue'

const app_store = use_app_store()
const { display_crs_converter, object_tree_index } = storeToRefs(app_store)

const output_crs = ref({})

const stepper_tree = reactive({
  current_step_index: ref(0),
  output_crs: output_crs,
  steps: [
    {
      step_title: 'Select an output coordinate reference system',
      component: {
        component_name: shallowRef(CrsSelector),
        component_options: {
          crs_key: 'output_crs'
        }
      },
      chips: computed(() => {
        return Object.values(output_crs.value)
      })
    },
    {
      step_title: 'Convert your file',
      component: {
        component_name: shallowRef(CrsConvertButton),
        component_options: {
          object_tree_index: object_tree_index,
          output_crs: output_crs
        }
      },
      chips: []
    }
  ]
})

provide('stepper_tree', stepper_tree)

</script>
<style scoped>
.dialog {
  border-radius: 15px
}
</style>