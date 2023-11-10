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
      path: '/panel',
      name: 'panel',
      component: ()=> import('../views/dashboardviews/HomePanelView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/charts',
      name: 'charts',
      component: ()=> import('../views/dashboardviews/ChartsView.vue')
    },
    {
      path: '/acercade',
      name: 'aboutus',
      component: ()=> import('../views/AboutUsView.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: ()=> import('../views/AuthView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: ()=> import('../views/AuthRegisterView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: ()=> import('../views/dashboardviews/UsersView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path: '/species',
      name: 'species',
      component: ()=> import('../views/dashboardviews/ForestSpeciesView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/list-species',
      name:'list-species',
      component: () => import('../views/dashboardviews/ListSpeciesView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/monitoring-species',
      name:'monitoring-species',
      component: () => import('../views/dashboardviews/MonitoringSpecieView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/candidates-species',
      name:'candidates-species',
      component: () => import('../views/dashboardviews/ListCandidatesSpecie.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/species-data',
      name:'species-data',
      component: () => import('../views/dashboardviews/SpeciesDataView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },   
  ]
})

router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem("access_token")
  const refresh_token = localStorage.getItem("refresh_token")

  if (to.matched.some(record => record.meta.auth)){
    if (!access_token || !refresh_token){
      next('/auth')
    } else {
      next() // Llama a next solo si la ruta requiere autenticación y los tokens están presentes
    }
  } else {
    next() // Llama a next para otras rutas que no requieren autenticación
  }
})

export default router
