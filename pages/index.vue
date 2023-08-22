<template>
  <v-container class="pa-0 fill-height" fluid>
    <v-row class="fill-height">
      <v-col cols="12" class="pa-5 text-center">
        <h1>General Terms and Conditions of Use</h1>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. At augue eget arcu dictum varius duis at consectetur. Iaculis urna id volutpat lacus laoreet non
          curabitur. Lectus sit amet est placerat. Condimentum lacinia quis vel eros donec ac. Ut placerat orci nulla
          pellentesque dignissim. Placerat duis ultricies lacus sed. Nam libero justo laoreet sit amet. Dignissim enim sit
          amet venenatis urna cursus. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Facilisis
          mauris
          sit amet massa vitae tortor condimentum lacinia quis. Ut faucibus pulvinar elementum integer enim neque
          volutpat.
          Eu scelerisque felis imperdiet proin fermentum. Ut sem viverra aliquet eget sit. Lectus arcu bibendum at varius
          vel pharetra vel turpis. Nisi porta lorem mollis aliquam ut porttitor. Tincidunt arcu non sodales neque. Lacus
          suspendisse faucibus interdum posuere lorem ipsum dolor. Pretium lectus quam id leo in vitae turpis massa. Eget
          velit aliquet sagittis id.
        </p>
        <br />
        <ul>
          <li>
            Nulla porttitor massa id neque aliquam vestibulum. Ac feugiat sed lectus vestibulum mattis ullamcorper velit
            sed.
          </li>
          <li>
            Urna nunc id cursus metus aliquam eleifend mi. Ut morbi tincidunt augue interdum velit euismod in
            pellentesque.
          </li>
          <li>
            Odio tempor orci dapibus ultrices in iaculis. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo
          </li>
          <li>
            Odio eu feugiat pretium nibh ipsum consequat. Mi sit amet mauris commodo. Sed cras ornare arcu dui. Enim nulla
            aliquet
            porttitor lacus luctus accumsan. Scelerisque fermentum dui faucibus in. Urna et pharetra pharetra massa massa
            ultricies mi. Eget duis at tellus at urna condimentum. Ornare suspendisse sed nisi lacus sed viverra.
          </li>
        </ul>
        <br />
        <p>
          Sed lectus vestibulum mattis ullamcorper. Ultrices dui sapien eget mi proin sed. Dignissim convallis aenean et
          tortor at. Integer eget aliquet nibh praesent tristique magna sit amet purus. At erat pellentesque adipiscing
          commodo elit at imperdiet dui. Tempor commodo ullamcorper a lacus. Lectus mauris ultrices eros in cursus. Eu
          feugiat pretium nibh ipsum consequat nisl vel pretium. Varius duis at consectetur lorem donec massa. Purus
          viverra
          accumsan in nisl. Quisque non tellus orci ac auctor augue mauris augue. Morbi tristique senectus et netus et
          malesuada fames ac. Quam vulputate dignissim suspendisse in est ante in.
        </p>
        <br />
        <p>
          Massa tempor nec feugiat nisl pretium fusce id. Euismod in pellentesque massa placerat. Senectus et netus et
          malesuada. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim. Pulvinar pellentesque habitant
          morbi tristique senectus. Scelerisque fermentum dui faucibus in ornare quam viverra orci. Non blandit massa
          enim
          nec dui nunc mattis enim. Nullam non nisi est sit amet. Blandit libero volutpat sed cras ornare arcu dui.
          ac.
        </p>
        <br />
        <v-btn text="Accept Terms and Conditions" @click="app_store.accept_gtcu()" color="primary" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const app_store = use_app_store()
</script>

