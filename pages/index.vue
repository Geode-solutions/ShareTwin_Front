<template>
  <v-row class="pa-5 text-center">
    <v-col cols="12">
      <p class="font-weight-bold">
        This project is funded by the Region Nouvelle-Aquitaine (France) and is
        codeveloped by Geode-solutions and IFPEN.
      </p>
    </v-col>
  </v-row>
  <v-row class="pa-2">
    <v-col cols="5" align="right">
      <v-img :src="logo_nouvelle_aquitaine" height="150" width="150" />
    </v-col>
    <v-col cols="2" align="center">
      <v-img :src="logo_ifpen" height="150" width="150" />
    </v-col>
    <v-col cols="5" align="left">
      <v-img :src="logo_geode_solutions" height="150" width="150" />
    </v-col>
  </v-row>
  <v-row class="pa-5">
    <v-col class="text-center">
      <p class="text-h3">Architecture</p>
    </v-col>
  </v-row>
  <v-row>
    <v-img :src="OGW_infra" height="600" />
  </v-row>
  <v-row class="pa-5 text-center">
    <v-col cols="12">
      <p class="font-weight-bold">
        Please accept the
        <a :href="'/terms_of_use'" target="_blank">Terms of Use</a> and
        <a :href="'/personal_data_policy'" target="_blank"
          >Personnal Data Policy</a
        >
        before accessing the app:
      </p>
    </v-col>
  </v-row>
  <v-row class="text-center">
    <v-col cols="12">
      <div class="text-center">
        <v-btn
          text="Accept the Terms of Use and Personnal Data Policy"
          @click="app_store.accept_gtcu()"
          color="primary"
          class="text-center"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
  import logo_ifpen from "@/assets/img/logo_ifpen.png"
  import logo_nouvelle_aquitaine from "@/assets/img/logo_nouvelle_aquitaine.png"
  import logo_geode_solutions from "@/assets/img/logo_geode_solutions.png"

  import OGW_infra from "@/assets/img/OGW_infra.svg"

  const app_store = use_app_store()
</script>

<style scoped>
  .v-btn {
    text-transform: unset !important;
  }
</style>
