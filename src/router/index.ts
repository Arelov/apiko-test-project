import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Main from "@/views/main.vue"
import Authrization from "@/views/authorization.vue"
import Registration from "@/views/registration.vue"
import AddProduct from "@/views/add-product.vue"
import Favorites from "@/views/favorites.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/authorization",
    component: Authrization,
  },
  {
    path: "/registration",
    component: Registration,
  },
  {
    path: "/add-product",
    component: AddProduct,
  },
  {
    path: "/favorites",
    component: Favorites,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
