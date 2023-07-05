<template>
  <v-dialog v-model="display_object_selector" width="70%" class="dialog" transition="dialog-top-transition">
    <v-row>
      <v-col cols="11" class="pa-0">
      </v-col>
      <v-col cols="1" class="pa-0">
        <v-btn color="primary" width="5" @click="app_store.$patch({ display_object_selector: false })"><v-icon
            icon="mdi-close" color="white" /></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pa-0">
        <FileLoaderStepper />
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup>
import CrsConverterCrsSelector from '@/components/CrsConverter/CrsSelector.vue'
import FileLoaderObjectSelector from '@/components/CrsConverter/ObjectSelector.vue'
import FileLoaderLoadButton from '@/components/FileLoader/LoadButton.vue'

const app_store = use_app_store()
const { display_object_selector } = storeToRefs(app_store)

const files = ref([])
const geode_object = ref('')

const stepper_tree = reactive({
  current_step_index: ref(0),
  files: files,
  geode_object: geode_object,
  steps: [
    {
      step_title: 'Select an input coordinate reference system',
      component: {
        component_name: shallowRef(CrsConverterCrsSelector),
        component_options: {
          input_geode_object: geode_object,
          crs_key: 'input_crs'
        }
      },
      chips: computed(() => {
        return Object.values(input_crs.value)
      })
    },
    {
      step_title: 'Select an output coordinate reference system',
      component: {
        component_name: shallowRef(CrsConverterCrsSelector),
        component_options: {
          input_geode_object: geode_object,
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
        component_name: shallowRef(ToolsCrsSelectorConversionButton),
        component_options: {
          input_files: files,
          input_geode_object: geode_object,
          input_crs: input_crs,
          output_crs: output_crs,
          input_output_extension: output_extension,
        }
      },
      chips: []
    }
  ]
})

provide('stepper_tree', stepper_tree)

</script>
<style>
.dialog {
  border-radius: 15px
}
</style>