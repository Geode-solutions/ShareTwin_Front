<template>
  <v-container class="pa-0 fill-height" fluid>
    <v-row>
      <v-col cols="12" class="pa-5 text-center">
        <p>Please accept the general terms and conditions before accessing the app:
          <a :href="'/license'" target="_blank">General Terms and Conditions of Use</a>
        </p>
        <br />
        <div class="text-center">
          <v-btn text="Accept Terms and Conditions" @click="app_store.accept_gtcu()" color="primary"
            class="text-center" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const app_store = use_app_store()
</script>

<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>

