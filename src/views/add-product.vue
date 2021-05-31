<template>
  <form
    @submit.prevent="submit"
    class="bg-white max-w-screen-sm mx-auto my-5 px-20 py-6"
  >
    <div class="text-center">Add product</div>
    <div class="mt-4 text-sm">TITLE<span class="text-red-400">*</span></div>
    <input
      class="w-full p-3 border bg-gray-100 rounded"
      placeholder="For example: Iron man suit"
      type="text"
      required
      v-model="title"
    />
    <div class="mt-4 text-sm">LOCATION<span class="text-red-400">*</span></div>
    <input
      class="w-full p-3 border bg-gray-100 rounded"
      placeholder="For example: Los Angeles, CA"
      type="text"
      required
      v-model="location"
    />
    <div class="mt-4 text-sm">DESCRIPTION</div>
    <textarea
      class="w-full p-3 border bg-gray-100 rounded"
      placeholder="For example: Iron man suit"
      type="text"
      v-model="description"
    />
    <div class="mt-4 text-sm">PHOTO</div>
    <div class="bg-gray-100 rounded border p-3">
      <label
        class="cursor-pointer bg-gray-300 w-20 h-20 flex items-center justify-center text-4xl text-green-600 rounded"
        for="upload"
        >+</label
      >
      <input
        id="upload"
        class="h-0 absolute"
        type="file"
        accept="image/*"
        ref="photo"
        required
      />
    </div>
    <div class="mt-4 text-sm">PRICE ($)<span class="text-red-400">*</span></div>
    <input
      class="w-full p-3 border bg-gray-100 rounded"
      type="number"
      required
      v-model="price"
    />
    <button
      type="submit"
      class="mt-6 bg-green-600 text-white block w-full p-3 rounded max-w-xs m-auto hover:bg-green-500 transition active:bg-green-700 focus:outline-none"
    >
      SUBMIT
    </button>
  </form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import firebase from "firebase"
import { useRouter } from "vue-router"

export default defineComponent({
  setup() {
    const router = useRouter()
    const title = ref("")
    const location = ref("")
    const description = ref("")
    const price = ref("")
    const photo = ref()
    async function submit() {
      const data = await firebase
        .database()
        .ref("products")
        .push({
          title: title.value,
          location: location.value,
          description: description.value,
          price: price.value,
        })
      firebase
        .storage()
        .ref("products/" + data.key)
        .put(photo.value.files[0])
      router.push("/")
    }
    return { submit, title, location, description, price, photo }
  },
})
</script>
<style scoped></style>
