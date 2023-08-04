import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:HomeView
    },
    {
      path: '/especies',
      name: 'especies',
      component: ()=> import('../views/SpeciesView.vue')
    },
    {
      path: '/familias',
      name: 'familias',
      component: ()=> import('../views/FamiliesView.vue')
    },
    ,
    {
      path: '/glossary',
      name: 'glossary',
      component: ()=> import('../views/GlossaryView.vue')
    },
    {
      path: '/busqueda',
      name: 'busqueda',
      component: ()=> import('../views/specieSoughtView.vue')
    },
    {
      path: '/acercade',
      name: 'aboutus',
      component: ()=> import('../views/AboutUsView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: ()=> import('../views/AuthView.vue')
    },
  ]
})

export default router
