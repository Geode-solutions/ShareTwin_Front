<template>
    <v-dialog
        v-if="cloudRunning"
        width="70%"
        :value="value"
        :persistent="loading"
        :fullscreen="$vuetify.breakpoint.smAndDown"
        @input="onDialogChange"
        @click:outside="!loading && close()"
        >
    <v-card>
        <v-card-text class="pa-0">
        <v-card flat>
            <v-card-text>
            <v-container>
                <v-tabs v-model="active_tab">
                <v-tab>Local</v-tab>
                
                <v-tab-item transition="fade-transition">
                    <girder-box />     
                </v-tab-item>
                </v-tabs>
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer />
            <span v-if="anyErrors" class="red--text mr-3">Only checked files will be loaded.</span>
            <v-btn
                text
                :disabled="loading"
                @click="close"
            >
                Cancel
            </v-btn>
            <v-btn
                color="primary"
                :disabled="loading || pendingFiles || !hasReadyFiles"
                @click="loadFiles"
            >
            {{ loading ? 'Loading...' : 'Load' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card-text>
  </v-card>
</v-dialog>
</template>


<script>
// import { mapGetters, mapState, mapActions } from 'vuex';


export default {
name: 'AppLoader',
data () {
    return {
        connected: false,
        loading: false,
        value: true
    }
},
methods: {
    // close() {
    //   this.$emit('input', false);
    //   // hack to reset queue only after the file dialog closes
    //   setTimeout(() => this.resetQueue(), 10);
    // }
}
}
</script>

<style scoped>
.toto {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
overflow: hidden;
z-index: 0;
}
</style>
