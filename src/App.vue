<template>
  <Layout />
  <router-view />
</template>
<script lang="ts">
import firebase from "firebase"
import firebaseConfig from "@/constants/firebase"
import "tailwindcss/tailwind.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { defineComponent } from "vue"
import Layout from "@/components/layout.vue"
export default defineComponent({
  components: { Layout },
  setup() {
    firebase.initializeApp(firebaseConfig)
  },
})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
* {
  font-family: "Roboto", sans-serif;
}
body {
  background: rgb(249, 250, 251);
}
</style>
