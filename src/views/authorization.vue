<template>
  <div
    class="mx-auto mt-10 bg-white max-w-sm rounded p-4 w-full text-center shadow-xl"
  >
    <div class="text-center text-xl	mb-4">Login</div>
    <div class="mt-3 text-left text-sm font-medium">EMAIL</div>
    <input
      class="w-full p-3 border bg-gray-100 rounded"
      type="email"
      v-model="email.value"
    />
    <div class="mt-3 text-left text-sm font-medium">PASSWORD</div>
    <input
      class="w-full p-3 border bg-gray-100 rounded"
      type="password"
      v-model="password.value"
    />
    <div class="text-red-400 text-left pt-2" v-if="error">Your data is incorrect</div>
    <button
      class="block w-full text-right text-sm text-gray-500 p-2 focus:outline-none"
    >
      Don’t remember password?
    </button>
    <button
      class="mt-2 bg-green-600 text-white block w-full p-3 rounded"
      @click="onContinue"
    >
      Continue
    </button>
  </div>
  <router-link to="/registration">
    <div
      class="mx-auto text-sm mt-4 bg-white max-w-sm rounded p-4 w-full text-center shadow-xl"
    >
      I have no account,
      <button class="text-green-600 focus:outline-none">REGISTER NOW</button>
    </div>
  </router-link>
</template>
<script lang="ts">
import firebase from "firebase"
import { useRouter } from "vue-router"
import { defineComponent, reactive, ref, watch } from "vue"

export default defineComponent({
  setup() {
    const router = useRouter()
    const email = reactive({ value: "" })
    const password = reactive({ value: "" })
    const error = ref(false)

    watch(
      () => [email.value, password.value],
      () => {
        if (error.value) error.value = false
      }
    )

    async function onContinue() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
        router.push("/")
      } catch (err) {
        error.value = true
      }
    }
    return { onContinue, email, password, error }
  },
})
</script>
<style scoped></style>
