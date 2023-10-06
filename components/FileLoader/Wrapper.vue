<template>
  <v-dialog
    v-model="display_object_selector"
    width="70%"
    class="dialog"
    transition="dialog-top-transition"
  >
    <v-row>
      <v-col cols="11" class="pa-0"> </v-col>
      <v-col cols="1" class="pa-0">
        <v-btn
          color="primary"
          width="5"
          @click="app_store.$patch({ display_object_selector: false })"
          ><v-icon icon="mdi-close" color="white"
        /></v-btn>
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
  import FileSelector from "@geode/opengeodeweb-front/components/FileSelector.vue"
  import ObjectSelector from "@geode/opengeodeweb-front/components/ObjectSelector.vue"
  import FileLoaderLoadButton from "@/components/FileLoader/LoadButton.vue"

  const app_store = use_app_store()
  const { display_object_selector } = storeToRefs(app_store)

  const files = ref([])
  const geode_object = ref("")

  const stepper_tree = reactive({
    current_step_index: ref(0),
    files: files,
    geode_object: geode_object,
    route_prefix: "",
    steps: [
      {
        step_title: "Please select the file(s) to load",
        component: {
          component_name: shallowRef(FileSelector),
          component_options: {
            multiple: true,
            label: "Please select a file",
            variable_to_update: "files",
            variable_to_increment: "current_step_index",
          },
        },
        chips: computed(() => {
          return files.value.map((file) => file.name)
        }),
      },
      {
        step_title: "Confirm the data type",
        component: {
          component_name: shallowRef(ObjectSelector),
          component_options: {
            variable_to_update: "geode_object",
            variable_to_increment: "current_step_index",
          },
        },
        chips: computed(() => {
          if (geode_object.value === "") {
            return []
          } else {
            return [geode_object.value]
          }
        }),
      },
      {
        step_title: "Load your file(s)",
        component: {
          component_name: shallowRef(FileLoaderLoadButton),
          component_options: {
            input_files: files,
            input_geode_object: geode_object,
          },
        },
        chips: [],
      },
    ],
  })

  provide("stepper_tree", stepper_tree)
</script>
<style scoped>
  .dialog {
    border-radius: 15px;
  }
</style>
