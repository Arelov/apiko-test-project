<template>
  <div :class="{ 'bg-indigo-900': isDarkMode }" class="w-full">
    <div class="px-2 max-w-screen-lg flex justify-between items-center m-auto">
      <router-link to="/">
        <img v-if="isDarkMode" class="p-2" src="@/assets/Logo.svg" alt="" />
        <img v-else class="p-2" src="@/assets/Logo-dark.svg" alt="" />
      </router-link>
      <div class="flex items-center">
        <router-link
          v-if="isAuth"
          :to="isAuth ? '/add-product' : '/authorization'"
        >
          <button
            class="px-12 py-1 m-2 bg-green-600 rounded text-white hover:bg-green-500 transition focus:outline-none"
          >
            ADD
          </button>
        </router-link>
        <button
          v-if="isAuth"
          @click="onLogout"
          :class="{ 'text-white': isDarkMode }"
          class="px-12 py-1 m-2 focus:outline-none shadow_custom"
        >
          LOGOUT
        </button>
        <router-link v-else to="/authorization">
          <button
            :class="{ 'text-white': isDarkMode }"
            class="px-12 py-1 m-2 focus:outline-none"
          >
            LOGIN
          </button>
        </router-link>
        <router-link
          v-if="!isFavorites"
          :to="isAuth ? '/favorites' : '/authorization'"
        >
          <button class="focus:outline-none">
            <i
              :class="[!isDarkMode ? 'text-black' : 'text-white']"
              class="far fa-heart hover:text-red-500 p-2 transition"
            ></i>
          </button>
        </router-link>
        <button v-else class="focus:outline-none cursor-auto">
          <i class="fas fa-heart text-red-500 p-2"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import firebase from "firebase"

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const isAuth = ref(false)
    const isDarkMode = computed(() => {
      if (route.path === "/authorization" || route.path === "/registration")
        return false
      return true
    })
    const isFavorites = computed(() => route.path === "/favorites")
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        isAuth.value = true
      } else {
        isAuth.value = false
      }
    })
    function onLogout() {
      firebase.auth().signOut()
      router.push("/authorization")
    }
    return { isDarkMode, isAuth, onLogout, isFavorites }
  },
})
</script>
<style scoped>
.shadow_custom:hover {
  text-shadow: 1px 1px 6px rgb(255, 255, 255, 0.7);
  transition: 150ms;
}
</style>
