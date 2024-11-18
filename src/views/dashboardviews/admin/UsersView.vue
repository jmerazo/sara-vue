<script setup>
import { computed, onMounted} from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useUsersStore } from "@/stores/users";
import { useModalStore } from "@/stores/modal";

import ModalUserAdd from "@/components/dashboard/modals/ModalUserAdd.vue";
import ModalUserUpdate from "@/components/dashboard/modals/ModalUserUpdate.vue";
import ModalProperty from "@/components/dashboard/modals/ModalProperty.vue";
import ModalNurseryAdd from "@/components/dashboard/modals/ModalNurseryAdd.vue";
import ModalAssignUserSpecies from "@/components/dashboard/modals/ModalAssignUserSpecies.vue";
import ModalUserSpeciesList from "@/components/dashboard/modals/ModalUserSpeciesList.vue";
import AdminUser from "@/components/dashboard/cards/AdminUser.vue";
import { descargarExcels, descargarPdfs, obtenerFecha } from "@/helpers";

//componentes
import LoadingData from "@/components/shared/LoadingData.vue";

const usersStore = useUsersStore();
const modal = useModalStore();

onMounted(async () => {
    await usersStore.fetchUsers();
});

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  usersStore.quitarFiltroUsuario();
  next();
});

function changeUserState(id, state) {
  usersStore.changeStateUser(id, state);
}

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = usersStore.currentPage;
  const totalPages = usersStore.totalPages;
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(totalPages, rangeStart + 3);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});
</script>

<template>
  <div class="contenedor">
    <!-- encabezado vista -->
    <h1 class="reporte__heading">
      Listado de usuarios 
    </h1>

    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input class="buscador__input" type="text" placeholder="Escríbe un término de búsqueda"
          @input="usersStore.buscarTermino($event.target.value)" />
      </div>
      <div class="botones__descarga">
        <a @click="
            descargarExcels(
              usersStore.datosImport,
              `Listado de usuarios SARA - ${obtenerFecha()}`
            )
            " class="boton" href="#"><font-awesome-icon class="boton__excel" :icon="['fas', 'file-excel']" /></a>
        <a @click="
            descargarPdfs(
              usersStore.datosImport,
              `Listado de usuarios SARA - ${obtenerFecha()}`,
              8,
              1
            )
            " class="boton" href="#"><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']" /></a>
      </div>
    </div>
    <!-- fin encabezado vista -->
    <hr />
    <LoadingData v-if="usersStore.cargando" />
    <main v-else>
      <div class="users__grid">
        <div v-for="user in usersStore.displayedUsers" v-bind:key="user.id">

          <AdminUser :user="user" :changeUserState="changeUserState" />
        </div>
      </div>

      <!-- paginador -->
      <section class="paginador">
        <div class="paginador__content">
          <div class="paginador__botones">
            <!-- Botón "Ir al inicio" -->
            <button 
              class="paginador__boton" 
              @click="usersStore.goToFirstPage" 
              v-if="usersStore.currentPage > 1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.83578 12L11.0429 18.2071L12.4571 16.7929L7.66421 12L12.4571 7.20712L11.0429 5.79291L4.83578 12ZM10.4857 12L16.6928 18.2071L18.107 16.7929L13.3141 12L18.107 7.20712L16.6928 5.79291L10.4857 12Z"></path>
              </svg>
            </button>
            
            <!-- Botón de página anterior -->
            <button 
              class="paginador__boton paginador__boton--anterior" 
              v-if="usersStore.currentPage > 1" 
              @click="usersStore.changePage(usersStore.currentPage - 1)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.8284 12.0005L14.6569 14.8289L13.2426 16.2431L9 12.0005L13.2426 7.75781L14.6569 9.17203L11.8284 12.0005Z"></path>
              </svg>           
            </button>

            <!-- Botones de páginas numeradas -->
            <button 
              v-for="page in usersStore.displayedPageRange" 
              :key="page" 
              @click="usersStore.changePage(page)"
              class="paginador__boton" 
              :class="{ 'paginador__boton-actual': page === usersStore.currentPage }"
            >
              {{ page }}
            </button>

            <!-- Botón de página siguiente -->
            <button 
              class="paginador__boton paginador__boton--siguiente" 
              v-if="usersStore.currentPage < usersStore.totalPages" 
              @click="usersStore.changePage(usersStore.currentPage + 1)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"></path>
              </svg> 
            </button>

            <!-- Botón "Ir al final" -->
            <button 
              class="paginador__boton" 
              @click="usersStore.goToLastPage" 
              v-if="usersStore.currentPage < usersStore.totalPages"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"></path>
              </svg>
            </button>

          </div>
          <!-- Indicador de página actual -->
          <div class="paginador__info">
            Página {{ usersStore.currentPage }} de {{ usersStore.totalPages }}
          </div>
        </div>        
      </section>

      <div @click="modal.handleClickModalUserAdd(false)" class="agregar"></div>

      <!--fin paginador -->
      <!-- texto validacion buscador -->
      <section class="validacion__contenido">
        <h1 v-if="usersStore.noResultados && !usersStore.cargando" class="validacion__heading">
          No hay resultados de búsqueda
        </h1>
      </section>
      <!--fin texto validacion buscador -->

    </main>
    <ModalUserUpdate/>
    <ModalProperty/>
    <ModalAssignUserSpecies/>
    <ModalUserSpeciesList/>
    <ModalNurseryAdd/>
    <ModalUserAdd/>
  </div>
</template>

<style scoped>
/* encabezado de la vista */
.reporte__heading {
  font-size: 1.1rem;
  margin: 2rem ;
}

.paginador__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.3rem;
    margin: 0 0 3rem 0;
  }
}

.contenido__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 0.6rem;
}

@media (min-width: 768px) {
  .contenido__header {
    flex-direction: row-reverse;
    justify-content: space-between;
    margin: 0 1rem 2rem 1rem;
  }
}

/* buscador */
.buscador__label {
  display: none;
}

@media (min-width: 768px) {
  .buscador__label {
    display: inline;
    margin-right: 1rem;
  }
}

.buscador__input {
  width: 300px;
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid var(--primary);
  text-align: center;
}

@media (min-width: 768px) {
  .buscador__input {
    padding: 0.5rem;
    text-align: left;
  }
}

/* descargas */
.botones__descarga {
  display: flex;
  gap: 1rem;
}

.boton {
  font-size: 2rem;
}

.boton__excel {
  color: rgb(6, 114, 6);
}

.boton__pdf {
  color: var(--rojo);
}

.users__grid {
  display: grid;
  gap: 1.4rem;
  margin-top: 5rem;
}

/* listado */
@media (min-width: 768px) {
  .users__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

</style>