import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthTokenStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth/callback', // Esta es tu URL de redireccionamiento
      component: 'OAuthCallback',
      component: ()=> import('../components/OAuthCallback.vue')
    },
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
      component: ()=> import('../views/dashboardviews/home/HomePanelView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: ()=> import('../views/dashboardviews/base/calendarView.vue')
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
      component: ()=> import('../views/dashboardviews/admin/UsersView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path: '/species',
      name: 'species',
      component: ()=> import('../views/dashboardviews/admin/ForestSpeciesView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/list-species',
      name:'list-species',
      component: () => import('../views/dashboardviews/reports/ListSpeciesView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/add-candidates',
      name:'add-candidates',
      component: () => import('../views/dashboardviews/admin/AddCandidateView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/monitoring-species',
      name:'monitoring-species',
      component: () => import('../views/dashboardviews/reports/MonitoringSpecieView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/candidates-species',
      name:'candidates-species',
      component: () => import('../views/dashboardviews/reports/ListCandidatesSpecie.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/species-data',
      name:'species-data',
      component: () => import('../views/dashboardviews/reports/SpeciesDataView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },
    {
      path:'/map-general',
      name:'map-general',
      component: () => import('../views/dashboardviews/reports/MapGeneralView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },  
    {
      path:'/assessment',
      name:'assessment',
      component: () => import('../views/dashboardviews/reports/AssessmentListView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },  
    {
      path:'/monitoring_data',
      name:'monitoring_data',
      component: () => import('../views/dashboardviews/reports/MonitoringListView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },  
    {
      path:'/samples_data',
      name:'samples_data',
      component: () => import('../views/dashboardviews/reports/SamplesListView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },  
    {
      path:'/pages',
      name:'pages',
      component: () => import('../views/dashboardviews/PagesListView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },  
    {
      path:'/sections',
      name:'sections',
      component: () => import('../views/dashboardviews/SectionsListView.vue'),
      meta: {
        auth: true,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    },  
    {
      path:'/nurseries',
      name:'nurseries',
      component: () => import('../views/NurseriesView.vue'),
      meta: {
        auth: false,
        roles: ['ADMINISTRADOR', 'is_superuser', 'is_staff']
      }
    }       
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthTokenStore();

  if (to.matched.some(record => record.meta.auth)) {
    if (!store.refreshToken) {
      next('/auth'); // Redirige si no hay refreshToken
    } else {
      if (!store.accessToken) {
        await store.rehydrateAuth(); // Intenta obtener un nuevo accessToken
      }
      next(); // Continúa si el refreshToken está presente (y ahora también el accessToken)
    }
  } else {
    next(); // Rutas que no requieren autenticación
  }
});

export default router
