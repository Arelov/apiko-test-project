<template>
  <div
    class="mx-auto mt-10 bg-white max-w-sm rounded p-4 w-full text-center shadow-xl"
  >
    <div class="text-center text-xl	mb-4">Register</div>
    <div class="mt-3 text-left text-sm font-medium">EMAIL</div>
    <input
      class="w-full p-3 border bg-gray-100 rounded"
      type="email"
      v-model="email.value"
    />
    <div class="text-red-400 text-left pt-2" v-if="email.isError">
      Email entered incorrectly
    </div>
    <div class="mt-3 text-left text-sm font-medium">FULL NAME</div>
    <input
      class="w-full p-3 border bg-gray-100 rounded"
      type="name"
      v-model="fullName.value"
    />
    <div class="text-red-400 text-left pt-2" v-if="fullName.isError">
      Full Name entered incorrectly
    </div>
    <div class="mt-3 text-left text-sm font-medium">PASSWORD</div>
    <input
      class="w-full p-3 border bg-gray-100 rounded"
      type="password"
      v-model="password.value"
    />
    <div class="text-red-400 text-left pt-2" v-if="password.isError">
      Password must be longer than 6 characters
    </div>
    <div class="mt-3 text-left text-sm font-medium uppercase">
      Password again
    </div>
    <input
      class="w-full p-3 border bg-gray-100 rounded"
      type="password"
      v-model="passwordAgain.value"
    />
    <div class="text-red-400 text-left pt-2" v-if="passwordAgain.isError">
      Your fields don't match
    </div>
    <button
      class="mt-6 bg-green-600 text-white block w-full p-3 rounded"
      @click="onRegister"
    >
      Register
    </button>
  </div>
  <div
    class="mx-auto text-sm mt-4 bg-white max-w-sm rounded p-4 w-full text-center shadow-xl"
  >
    I already have an account,
    <router-link to="/authorization">
      <button class="text-green-600 focus:outline-none">LOG IN</button>
    </router-link>
  </div>
</template>
<script lang="ts">
import firebase from "firebase"
import { defineComponent, reactive, watch } from "vue"
import isEmail from "validator/lib/isEmail"
import isStrongPassword from "validator/lib/isStrongPassword"
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const router = useRouter()
    const email = reactive({ value: "", isError: false })
    const fullName = reactive({ value: "", isError: false })
    const password = reactive({ value: "", isError: false })
    const passwordAgain = reactive({ value: "", isError: false })
    function testError(value: any) {
      return watch(
        () => value.value,
        () => {
          if (value.isError) value.isError = false
        }
      )
    }

    testError(email)
    testError(fullName)
    testError(password)
    testError(passwordAgain)

    async function onRegister() {
      if (!isEmail(email.value)) {
        email.isError = true
        return
      }
      if (fullName.value === "") {
        fullName.isError = true
        return
      }

      if (
        !isStrongPassword(password.value, {
          minLength: 6,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        })
      ) {
        password.isError = true
        return
      }
      if (password.value !== passwordAgain.value) {
        passwordAgain.isError = true
        return
      }
      const data = await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
      firebase
        .database()
        .ref("users/" + data.user?.uid)
        .set({
          fullName: fullName.value,
        })
      router.push("/")
    }
    return { onRegister, email, fullName, password, passwordAgain }
  },
})
</script>
<style scoped></style>
