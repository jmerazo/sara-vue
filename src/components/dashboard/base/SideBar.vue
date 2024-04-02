<script setup>
import { RouterLink } from "vue-router";
import { useAuthTokenStore } from "@/stores/auth";
import { computed } from 'vue';

const store = useAuthTokenStore();
const userDataString = localStorage.getItem("user_data");
const userData = JSON.parse(userDataString);

const authStore = useAuthTokenStore();
const storedPermissions = JSON.parse(localStorage.getItem('user_permissions') || '{}');
console.log('permissions:', storedPermissions);

// Agrupa los módulos por sección
const sections = computed(() => {
  const groupedSections = {};
  for (const mod of storedPermissions.modules) {
    const section = mod.page_section || 'GENERAL';
    if (!groupedSections[section]) {
      groupedSections[section] = [];
    }
    groupedSections[section].push(mod);
  }
  return groupedSections;
});
</script>
<template>
  <aside
    class="main-sidebar sidebar-dark-primary elevation-4 rounded"
    id="sidebar"
  >
    <!-- Brand Logo -->
    <a href="#" class="brand-link enlace center">
      <img class="user" src="/icons/user.png" alt="mapa" />
      <span class="brand-text font-weight-light text-ellipsis my-2">{{
        userData.first_name + " " + userData.last_name
      }}</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >

          <div v-for="(modules, section) in sections" :key="section">
            <li class="navheader__section">{{ section }}</li>
          <!-- Iterar sobre las páginas permitidas -->
              <li v-for="mod in modules" :key="mod.page_id" class="nav-item">
                <RouterLink :to="{ name: mod.page_router }">
                  <a href="#" class="nav-link enlace">
                    <img :src="mod.page_icon" :alt="mod.page_name" />
                    <p>
                      {{ mod.page_name }} 
                      <!--i v-if="mod.page_subtitle && mod.page_subtitle.length" class="fas fa-angle-left right"></i-->
                    </p>
                  </a>
                </RouterLink>
                <ul v-if="mod.page_subtitle" class="nav nav-treeview">
                  <li v-for="sub in mod.page_subtitle" :key="sub.subtitle" class="nav-item">
                    <RouterLink :to="{ name: sub.router }">
                      <a data-widget="pushmenu" href="#" class="nav-link">
                        <i :class="sub.style"></i>
                        <p>{{ sub.subtitle }}</p>
                      </a>
                    </RouterLink>
                  </li>
                </ul>
              </li>
          </div> 

          <li class="nav-item">
            <a @click="store.logout()" class="nav-link  enlace cerrar " href="#" id="cerrar">
              <img src="/icons/salir.png" alt="users" /> <p>Cerrar sesión</p></a
            >
          </li>
                   
        </ul>
      </nav>
    </div>
  </aside>
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");


.enlace {
  display: flex;
  margin: 0;
  padding: 0;
  color: var(--blanco) !important;
  font-size: 1rem;
}
.enlace img {
  width: 1.5rem;
}
@media (min-width:1440px){
  .enlace{
    font-size: 1.1rem;
  }
}
#administracion,
#reportes,
#eventos {
  color: var(--blanco);
  background-color: var(--primary);
  text-align: center;
  padding: 0.3rem;
  font-weight: 700;
  margin: 1rem 0;
}

.navheader__section {
  color: var(--blanco);
  background-color: var(--primary);
  text-align: center;
  padding: 0.3rem;
  font-weight: 700;
  margin: 1rem 0;
}

.enlace .user {
  width: 3rem;
}
#sidebar {
  position: fixed;
  max-height: 100vh; /* Altura máxima basada en la altura de la ventana del navegador */
  overflow-y: auto; /* Habilita el desplazamiento vertical si el contenido excede la altura máxima */
}

/* Estilos adicionales para responsividad */
@media (max-width: 768px) {
  .sidebar {
    max-height: 60vh; /* Puedes ajustar la altura máxima para dispositivos móviles */
  }
}
#cerrar.cerrar {
  color: var(--blanco);
  border: 1px solid var(--blanco);
  width: auto;
  padding: 0.3rem;
  margin-top: 1.5rem;
}
#cerrar.cerrar:hover {
  color: var(--negro)!important;
  background-color: var(--blanco);
}
@media (min-width:768px){
  #cerrar.cerrar {
  
  margin-top: 4rem;
}
}

</style>