<template>
  <div class="flex my-2 max-w-4xl m-auto flex-col md:flex-row md:mb-6">
    <div
      class="bg-white border mb-2 md:mb-0 rounded md:w-full mx-2 flex items-center"
    >
      <label for="search"><i class="fas fa-search p-2"></i></label>
      <input
        id="search"
        class="p-2 w-full"
        type="text"
        placeholder="Search products by name"
        v-model="byName"
      />
    </div>
    <div
      class="bg-white border mb-2 md:mb-0 rounded md:w-full mx-2 flex items-center"
    >
      <label for="search2"><i class="fas fa-map-marker-alt p-2"></i></label>
      <input
        id="search2"
        class="p-2 w-full"
        type="text"
        placeholder="Location"
        v-model="byLocation"
      />
    </div>
    <button
      class="bg-blue-400 text-white px-8 py-2 uppercase rounded mx-2 hover:bg-blue-500 transition focus:outline-none active:bg-blue-700"
      @click="onSearch"
    >
      Search
    </button>
  </div>
  <div class="bg-white py-3 max-w-4xl m-auto shadow">
    <input
      class="bg-gray-100 px-4 py-2 ml-2 border rounded"
      type="number"
      placeholder="Price from (USD)"
      v-model="priceFrom"
    />
    <input
      class="bg-gray-100 px-4 py-2 ml-2 border rounded"
      type="number"
      placeholder="Price to (USD)"
      v-model="priceTo"
    />
  </div>
  <div class="flex flex-wrap justify-center max-w-4xl m-auto">
    <div v-for="(product, index) of products" :key="index">
      <div
        class="bg-white w-52 p-1 rounded border m-1 relative"
        v-if="product.visible"
      >
        <button
          @click="
            favorites.map((el) => el.productId).includes(product.uid)
              ? deleteFavorite(product.uid)
              : onAddFavorite(product.uid)
          "
          class="bg-white rounded-full focus:outline-none w-10 h-10 flex items-center justify-center absolute right-4 bottom-14 shadow-md"
        >
          <i
            :class="[
              favorites.map((el) => el.productId).includes(product.uid)
                ? 'text-red-500 fas'
                : 'text-gray-500 far',
            ]"
            class="fa-heart absolute hover:opacity-0 p-3 rounded-full z-50 bg-white transition"
          ></i>
          <i
            :class="[
              favorites.map((el) => el.productId).includes(product.uid)
                ? 'text-red-500 far'
                : 'text-gray-500 fas',
            ]"
            class="fa-heart"
          ></i>
        </button>
        <img class="w-52 h-36" :src="product.url" alt="" />
        <div class="px-2 pt-2">
          {{ product.title }}
        </div>
        <div class="p-2 font-bold">${{ product.price }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue"
import firebase from "firebase"

export default defineComponent({
  setup() {
    const products = reactive<any>([])
    const byName = ref("")
    const byLocation = ref("")
    const priceFrom = ref("")
    const priceTo = ref("")
    const favorites = reactive<any>([])

    watch([priceTo, priceFrom], priceChange)

    async function onAddFavorite(uid: any) {
      const userId = firebase.auth().currentUser?.uid
      await firebase
        .database()
        .ref("users/" + userId + "/favorites")
        .push({
          uid,
        })
      getFavorites()
    }
    function priceChange() {
      if (priceFrom.value === "" || priceTo.value === "") {
        for (const e of products) {
          e.visible = true
        }
      } else
        for (const e of products) {
          e.visible = +e.price <= +priceTo.value && +e.price >= +priceFrom.value
        }
    }
    function onSearch() {
      for (const e of products) {
        e.visible =
          e.title.includes(byName.value) &&
          e.location.includes(byLocation.value)
      }
    }
    async function getFavorites() {
      const userId = firebase.auth().currentUser?.uid
      const data = (
        await firebase
          .database()
          .ref("users/" + userId + "/favorites")
          .once("value")
      ).val()
      favorites.splice(0)
      for (const favorite in data) {
        favorites.push({ productId: data[favorite].uid, uid: favorite })
      }
    }
    async function deleteFavorite(uid: any) {
      const userId = firebase.auth().currentUser?.uid
      const favoriteId = favorites.find((e: any) => e.productId === uid).uid
      await firebase
        .database()
        .ref("users/" + userId + "/favorites/" + favoriteId)
        .remove()
      getFavorites()
    }
    async function asyncFunc() {
      const data = await firebase.database().ref("products")
      data.on("value", async (snapshot) => {
        const data = snapshot.val()
        for (const product in data) {
          try {
            const url = await firebase
              .storage()
              .ref("products/" + product)
              .getDownloadURL()
            products.push({
              ...data[product],
              url: url,
              uid: product,
            })
          } catch (error) {}
        }
        priceChange()
        getFavorites()
      })
    }
    asyncFunc()

    return {
      products,
      priceFrom,
      priceTo,
      byName,
      byLocation,
      onSearch,
      onAddFavorite,
      deleteFavorite,
      favorites,
    }
  },
})
</script>
<style scoped>
.my_bg {
  background: linear-gradient(180deg, #090810 0%, #171236 100%);
}
</style>
