
import { createRouter, createWebHistory } from "vue-router";

import MaintenanceView from "../views/MaintenanceView.vue";
import GuestLayoutView from "@/views/layouts/GuestLayoutView.vue";


import { useAuthTokenStore } from "@/stores/auth";
import {useHomeStore} from '../stores/home'




const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/maintenance',
      name: 'maintenance',
      component: () => import('../views/MaintenanceView.vue'),
    },

    {
      path: "/",
      name: "guest",
      component: GuestLayoutView,
      meta:{
        isMaintenance: true
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: "especies",
          name: "especies",
          component: () => import("../views/SpeciesView.vue"),
        },
        {
          path: "busqueda",
          name: "busqueda",
          component: () => import("../views/specieSoughtView.vue"),
        },
        {
          path: "familias",
          name: "familias",
          component: () => import("../views/FamiliesView.vue"),
        },
        {
          path: "glossary",
          name: "glossary",
          component: () => import("../views/GlossaryView.vue"),
        },
        {
          path: "nurseries",
          name: "nurseries",
          component: () => import("../views/NurseriesView.vue"),
        },
        {
          path: "nursery",
          name: "nursery",
          component: () => import("../views/NurserySoughtView.vue"),
        },
        {
          path: "acercade",
          name: "aboutus",
          component: () => import("../views/AboutUsView.vue"),
          meta: {
            auth: false,
          },
        },
        {
          path: "auth",
          name: "auth",
          component: () => import("../views/AuthView.vue"),
        },
        {
          path: "auth/verify-Account",
          name: "authVerify",
          component: () => import("../views/AuthVerifyView.vue"),
        },
        {
          path: "auth/signUp-success",
          name: "signUpSuccess",
          component: () => import("../views/SingUpSuccess.vue"),
        },
        

      ]
    },


    {
      path: "/panel",
      name: "panel",
      component: () => import("../views/layouts/PanelLayoutView.vue"),
      meta: {
        auth: true,
        roles: ["ADMINISTRADOR", "is_superuser", "is_staff"],
      },
      children: [
        {
          path: 'home-panel',
          name: 'home-panel',
          component: () => import("../views/dashboardviews/home/HomePanelView.vue")
        },
        {
          path: "panel-especies",
          name: "panel-especies",
          component: () => import("../views/SpeciesView.vue"),
        },
        {
          path: "panel-busqueda",
          name: "panel-busqueda",
          component: () => import("../views/specieSoughtView.vue"),
        },
        {
          path: "panel-familias",
          name: "panel-familias",
          component: () => import("../views/FamiliesView.vue"),
        },
        {
          path: "assessment",
          name: "assessment",
          component: () => import("../views/dashboardviews/reports/AssessmentListView.vue"),
        },
        {
          path: "monitoring_data",
          name: "monitoring_data",
          component: () => import("../views/dashboardviews/reports/MonitoringListView.vue"),
          
        },
        {
          path: "samples_data",
          name: "samples_data",
          component: () => import("../views/dashboardviews/reports/SamplesListView.vue"),
        },
        
        {
          path: "list-species",
          name: "list-species",
          component: () => import("../views/dashboardviews/reports/ListSpeciesView.vue"),
        },
        //view from list-species
        {
          path: "monitoring-species",
          name: "monitoring-species",
          component: () =>  import("../views/dashboardviews/reports/MonitoringSpecieView.vue"),
        },
        //view from list-species
        {
          path: "candidates-species",
          name: "candidates-species",
          component: () => import("../views/dashboardviews/reports/ListCandidatesSpecie.vue"),
        },
  
        {
          path: "species-data",
          name: "species-data",
          component: () => import("../views/dashboardviews/reports/SpeciesDataView.vue"),
        },
                
        {
          path: "map-general",
          name: "map-general",
          component: () =>
            import("../views/dashboardviews/reports/MapGeneralView.vue"),
        },

      ]
    },

    {
      path: "/admin",
      name: 'admin',
      component: () => import("../views/layouts/AdminLayoutView.vue"),
      meta: {
        auth: true,
        roles: ["ADMINISTRADOR", "is_superuser", "is_staff"],
      },
      children: [
        {
          path: "users",
          name: "users",
          component: () => import("../views/dashboardviews/admin/UsersView.vue"),
        },
        {
          path: "users-validate",
          name: "users-validate",
          component: () => import("../views/dashboardviews/admin/UsersValidateView.vue"),
        },
        {
          path: "species",
          name: "species",
          component: () => import("../views/dashboardviews/admin/ForestSpeciesView.vue"),
        },
        {
          path: "add-candidates",
          name: "add-candidates",
          component: () => import("../views/dashboardviews/admin/AddCandidateView.vue"),
        },
        {
          path: "pages",
          name: "pages",
          component: () => import("../views/dashboardviews/PagesListView.vue"),
        },
        {
          path: "sections",
          name: "sections",
          component: () => import("../views/dashboardviews/SectionsListView.vue"),
        },
        {
          path: "nurseries_adm",
          name: "nurseries_adm",
          component: () => import("../views/dashboardviews/admin/NurseriesView.vue"),
        },
        {
          path: "property",
          name: "property",
          component: () => import("../views/dashboardviews/admin/PropertyView.vue"),
        },
      ]
    },

  ],
});


// En tu archivo de router
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthTokenStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    const isAuthenticated = await authStore.checkAuth();
    if (!isAuthenticated) {
      next('/auth');
    } else {
      next();
    }
  } else {
    next();
  }
});

/* router.beforeEach(async (to, from, next) => {
  const authStore = useAuthTokenStore();
  const homeStore = useHomeStore();

  // Verificación de mantenimiento
  if (to.matched.some((record) => record.meta.isMaintenance)) {
    if (homeStore.maintenance) {
      return next("/maintenance");
    }
  }

  // Verificación de autenticación
  if (to.matched.some((record) => record.meta.auth)) {
    if (!authStore.token) {
      console.log("No hay token, redirigiendo a /auth");
      return next("/auth");
    } else {
      // Verificar si el token es válido
      const isTokenValid = await authStore.checkTokenValidity();
      if (!isTokenValid) {
        console.log("Token no válido, redirigiendo a /auth");
        authStore.logout();
        return next("/auth");
      }
    }

    // Verificar roles si es necesario
    if (to.meta.roles && to.meta.roles.length) {
      const userRole = authStore.userData?.role;
      if (!userRole || !to.meta.roles.includes(userRole)) {
        console.log("Usuario no tiene los roles necesarios");
        return next("/unauthorized");
      }
    }
  }

  // Si no se cumplen ninguna de las condiciones anteriores, continúa
  next();
}); */

export default router;
