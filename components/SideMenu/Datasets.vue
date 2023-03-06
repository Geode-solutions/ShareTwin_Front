<template>
  <v-expansion-panel-title>
    <v-row>
      <v-col cols="auto" class="pa-0 align-self-center">

        <v-btn flat icon small v-on:click.stop="app_store.toggle_object_vibility(index)">
          <v-icon>
            {{ is_visible ? 'mdi-checkbox-marked-outline' : 'mdi-checkbox-blank-outline' }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto" class="pa-0 align-self-center">
        <v-img :src="geode_objects[type].image" width="35" />
      </v-col>
      <v-col cols="auto" class="pa-0 align-self-center">
        <h4>
          {{ displayed_name }}
        </h4>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <div v-on:click.stop>
          <v-menu offset-x>
            <template v-slot:activator="{ on }">
              <v-btn flat icon small v-on="on">
                <v-icon icon="mdi-dots-vertical" />
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item @click="app_store.remove_object_tree_item(index)">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
  </v-expansion-panel-title>
  <v-expansion-panel-text>
    <!-- {{ id }} -->
  </v-expansion-panel-text>
</template>

<script setup>
import { use_app_store } from '@/stores/app'
import { use_cloud_store } from '@/stores/cloud'
import geode_objects from '@/assets/geode_objects'

const app_store = use_app_store()
const cloud_store = use_cloud_store()

const { is_cloud_running } = storeToRefs(cloud_store)
const { display_menu, object_tree } = storeToRefs(app_store)

const props = defineProps({
  id: { type: String, required: true },
  index: { type: Number, required: true },
  displayed_name: { type: String, required: true },
  type: { type: String, required: true },
  is_visible: { type: Boolean, required: true }
})

const { id, index, displayed_name, type, is_visible } = toRefs(props)
// const datasets = ref([])
// const internalPanelState = ref({})
// const subpanels = ref({}) // proxyId -> subpanels:[bool]
// const activeSourceId = ref(-1)

// computed: {
// ...mapState({
//   collapseDatasetPanels: 'collapseDatasetPanels',
//   panels: (state) => {
//     const priorities = Object.keys(state.panels).map((n) => Number(n));
//     priorities.sort((a, b) => a - b);
//     return [].concat(...priorities.map((prio) => state.panels[prio]));
//   },
// }),

//   opened_panels: {
//     get() {
//       const ret = [];
//       for (let i = 0; i < this.datasets.length; i++) {
//         const id = this.datasets[i];
//         if (this.internalPanelState[id]) {
//           ret.push(i);
//         }
//       }
//       return ret;
//     },
// ,
//   },
// ,
// },

// onMounted(() => {
//   update_dataset_list();
// })
//   proxyManagerHooks: {
//   onProxyModified() {
//     this.update_dataset_list();
//   },
//   onProxyCreated({ proxyGroup, proxyName }) {
//     if (proxyGroup === 'Sources' && proxyName === 'TrivialProducer') {
//       this.update_dataset_list();
//     }
//   },
//   onProxyDeleted({ proxyId, proxyGroup, proxyName }) {
//     if (proxyGroup === 'Sources' && proxyName === 'TrivialProducer') {
//       const idx = this.datasets.indexOf(proxyId);
//       if (idx > -1) {
//         this.$delete(this.internalPanelState, proxyId);
//         this.$delete(this.subpanels, proxyId);
//         this.update_dataset_list();
//       }
//     }
//   },
//   onActiveSourceChange(source) {
//     if (source) {
//       this.activeSourceId = source.getProxyId();
//     } else {
//       this.activeSourceId = -1;
//     }
//   },
// },

// function update_dataset_list () {
//   const sources = this.$proxyManager
//     .getSources()
//     .filter(
//       (s) =>
//         s.getProxyGroup() === 'Sources' &&
//         s.getProxyName() === 'TrivialProducer'
//     )
//     .filter((s) => Boolean(s.getDataset()));

//   for (let i = 0; i < sources.length; i++) {
//     const proxy = sources[i];
//     const proxyId = proxy.getProxyId();
//     if (!(proxyId in this.internalPanelState)) {
//       this.internalPanelState[proxyId] = !this.collapseDatasetPanels;
//     }
//     if (!(proxyId in this.subpanels)) {
//       if (this.collapseDatasetPanels) {
//         this.subpanels[proxyId] = [];
//       } else {
//         this.subpanels[proxyId] = Controls.filter((c) => c.visible(proxy))
//           .map((c, j) => (c.defaultExpand ? j : -1))
//           .filter((v) => v > -1);
//       }
//     }
//   }

//   this.datasets = sources.map((s) => s.getProxyId());
//   this.$store.dispatch('views/updateMasterSourceId', this.datasets);
// }
</script>
