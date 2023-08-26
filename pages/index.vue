<template>
  <v-container class="pa-0 fill-height" fluid>
    <v-row>
      <v-col cols="12" class="pa-5 text-center">
        This project is funded by the Région Nouvelle-Aquitaine (France) and codeveloped by Geode-solutions and IFPEN.
        <br />
        <v-row>
          <v-col cols="4" align="right">
            <v-img :src="logo_nouvelle_aquitaine" height="150" />
          </v-col>
          <v-col cols="4">
            <v-img :src="logo_ifpen" height="150" />
          </v-col>
          <v-col cols="4" align="left">
            <v-img :src="logo_geode_solutions" height="150" />
          </v-col>
        </v-row>
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
import logo_ifpen from '@/assets/img/logo_ifpen.png'
import logo_nouvelle_aquitaine from '@/assets/img/logo_nouvelle_aquitaine.png'
import logo_geode_solutions from '@/assets/img/logo_geode_solutions.png'

const app_store = use_app_store()
</script>

<style scoped>
.v-btn {
  text-transform: unset !important;
}
</style>

