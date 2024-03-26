<script setup>
import { RouterLink } from "vue-router";
import { useAuthTokenStore } from "@/stores/auth";

const store = useAuthTokenStore();
const userDataString = localStorage.getItem("user_data");
const userData = JSON.parse(userDataString);

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
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <RouterLink :to="{ name: 'panel' }">
            <li class="nav-item">
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icono-panel.png" alt="panel" />

                <p>Panel Principal</p>
              </a>
            </li>
          </RouterLink>

          <li class="nav-item">
            <a href="#" class="nav-link enlace">
              <img src="/icons/icon-arbol.png" alt="especies" />
              <p>
                Especies
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <RouterLink :to="{ name: 'familias' }">
                <li class="nav-item">
                  <a data-widget="pushmenu" href="#" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Familias</p>
                  </a>
                </li>
              </RouterLink>
              <RouterLink :to="{ name: 'especies' }">
                <li class="nav-item">
                  <a data-widget="pushmenu" href="#" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Especies</p>
                  </a>
                </li>
              </RouterLink>
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link enlace">
              <img src="/icons/icono-publicaciones.png" alt="publicaciones" />

              <p>
                Publicaciones
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <RouterLink :to="{ name: 'glossary' }">
                <li class="nav-item">
                  <a data-widget="pushmenu" href="#" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Glosario</p>
                  </a>
                </li>
              </RouterLink>
            </ul>
          </li>

          <li class="nav-header" id="eventos">EVENTOS</li>

          <RouterLink :to="{ name: 'calendar' }">
            <li class="nav-item">
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icono-calendario.png" alt="calendario" />
                <p>
                  Calendario ambiental
                  <span class="badge badge-info right">1</span>
                </p>
              </a>
            </li>
          </RouterLink>

          <li class="nav-header" id="reportes">REPORTES</li>

          <RouterLink :to="{ name: 'assessment' }">
            <li class="nav-item">
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icono-evalucacion.png" alt="" />

                <p>Evaluaciones realizadas</p>
              </a>
            </li>
          </RouterLink>

          <RouterLink :to="{ name: 'monitoring_data' }">
            <li class="nav-item">
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icon-arbol-lupa.png" alt="" />
                <p>Monitoreos realizados</p>
              </a>
            </li>
          </RouterLink>

          <RouterLink :to="{ name: 'samples_data' }">
            <li class="nav-item">
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icon-muestra.jpg" alt="" />
                <p>Muestras realizadas</p>
              </a>
            </li>
          </RouterLink>

          <RouterLink :to="{ name: 'list-species' }">
            <li
              v-if="
                userData.rol == 'ADMINISTRADOR' &&
                userData.is_superuser == 1 &&
                userData.is_staff == 1
              "
              class="nav-item"
            >
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icon-arbol.png" alt="especies" />
                <p>Especies forestales</p>
              </a>
            </li>
          </RouterLink>
          <RouterLink :to="{ name: 'species-data' }">
            <li
              v-if="
                userData.rol == 'ADMINISTRADOR' &&
                userData.is_superuser == 1 &&
                userData.is_staff == 1
              "
              class="nav-item"
            >
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icono-data.png" alt="especies" />
                <p>Datos generales especies</p>
              </a>
            </li>
          </RouterLink>
          <RouterLink :to="{ name: 'map-general' }">
            <li class="nav-item">
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icono-mapa.png" alt="mapa" />
                <p>Mapa General</p>
              </a>
            </li>
          </RouterLink>

          <li
            v-if="
              userData.rol == 'ADMINISTRADOR' &&
              userData.is_superuser == 1 &&
              userData.is_staff == 1
            "
            class="nav-header navegacion__titulo"
            id="administracion"
          >
            PÁGINA
          </li>

          <RouterLink :to="{ name: 'add-candidates' }">
            <li
              v-if="
                userData.rol == 'ADMINISTRADOR' &&
                userData.is_superuser == 1 &&
                userData.is_staff == 1
              "
              class="nav-item"
            >
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icon-pages.png" alt="users" />
                <p>Páginas</p>
              </a>
            </li>
          </RouterLink>
          <RouterLink :to="{ name: 'species' }">
            <li
              v-if="
                userData.rol == 'ADMINISTRADOR' &&
                userData.is_superuser == 1 &&
                userData.is_staff == 1
              "
              class="nav-item"
            >
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icon-sections.png" alt="users" />
                <p>Secciónes</p>
              </a>
            </li>
          </RouterLink>

          <li
            v-if="
              userData.rol == 'ADMINISTRADOR' &&
              userData.is_superuser == 1 &&
              userData.is_staff == 1
            "
            class="nav-header navegacion__titulo"
            id="administracion"
          >
            ADMINISTRAR
          </li>

          <RouterLink :to="{ name: 'users' }">
            <li
              v-if="
                userData.rol == 'ADMINISTRADOR' &&
                userData.is_superuser == 1 &&
                userData.is_staff == 1
              "
              class="nav-item"
            >
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/icono-users.png" alt="users" />
                <p>Usuarios</p>
              </a>
            </li>
          </RouterLink>
          <RouterLink :to="{ name: 'species' }">
            <li
              v-if="
                userData.rol == 'ADMINISTRADOR' &&
                userData.is_superuser == 1 &&
                userData.is_staff == 1
              "
              class="nav-item"
            >
              <a data-widget="pushmenu" href="#" class="nav-link enlace">
                <img src="/icons/tabla-especie.png" alt="users" />
                <p>Especies forestales</p>
              </a>
            </li>
          </RouterLink>

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