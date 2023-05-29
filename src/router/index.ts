import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Sign In',
    component: () => import(/* webpackChunkName: "Sign In" */ '../views/sign-in/SignIn.vue'),
  },
  {
    path: '/register',
    name: 'Sign Up',
    component: () => import(/* webpackChunkName: "Sign Up" */ '../views/sign-up/SignUp.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "Contact" */ '../views/contact/Contacts.vue'),
  },
  {
    path: '/purchase-order',
    name: 'Purchase Order',
    component: () => import(/* webpackChunkName: "Purchase Order" */ '../views/purchase-order/PurchaseOrder.vue'),
  },
  {
    path: '/bill',
    name: 'Bill',
    component: () => import(/* webpackChunkName: "Bill" */ '../views/billed/Billed.vue'),
  },
  {
    path: '/app-integration',
    name: 'Application',
    component: () => import(/* webpackChunkName: "Application" */ '../views/application/Application.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
