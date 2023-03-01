<template>
  <v-dialog v-model="display_object_selector">
    <v-card>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore
        magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="app_store.$patch({ display_object_selector: false })">Close
          Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import geode_objects from '@/assets/geode_objects'
import FileSelector from '@/components/FileSelector.vue'
import ObjectSelector from '@/components/ObjectSelector.vue'
import ToolsFileSelectorConversionButton from '@/components/Tools/FileConverter/ConversionButton.vue'
import { use_app_store } from '@/stores/app'

const app_store = use_app_store()
const { display_object_selector } = storeToRefs(app_store)


const files = ref([])
const geode_object = ref('')

const stepper_tree = reactive({
  current_step_index: ref(0),
  tool_name: 'File converter',
  tool_route: 'fileconverter',
  files: files,
  geode_object: geode_object,
  output_extension: output_extension,
  steps: [
    {
      step_title: 'Please select a file to convert',
      component: {
        component_name: shallowRef(ToolsFileSelector),
        component_options: {
          multiple: true,
          label: 'Please select a file'
        }
      },
      chips: computed(() => { return files.value.map((file) => file.name) })
    },
    {
      step_title: 'Confirm the data type',
      component: {
        component_name: shallowRef(ToolsObjectSelector),
        component_options: {
          geode_objects: geode_objects,
          input_files: files
        }
      },
      chips: computed(() => {
        if (geode_object.value === '') {
          return []
        } else {
          return [geode_object.value]
        }
      })
    },
    {
      step_title: 'Load your files',
      component: {
        component_name: shallowRef(ToolsFileSelectorConversionButton),
        component_options: {
          input_files: files,
          input_geode_object: geode_object,
          input_output_extension: output_extension,
        }
      },
      chips: []
    }
  ]
})

provide('stepper_tree', stepper_tree)

</script>