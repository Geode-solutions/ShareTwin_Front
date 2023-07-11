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
import geode_objects from '@/assets/geode_objects'
import FileLoaderFileSelector from '@/components/FileLoader/FileSelector.vue'
import FileLoaderObjectSelector from '@/components/FileLoader/ObjectSelector.vue'
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
      step_title: 'Please select the file(s) to load',
      component: {
        component_name: shallowRef(FileLoaderFileSelector),
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
        component_name: shallowRef(FileLoaderObjectSelector),
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
      step_title: 'Load your file(s)',
      component: {
        component_name: shallowRef(FileLoaderLoadButton),
        component_options: {
          input_files: files,
          input_geode_object: geode_object
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