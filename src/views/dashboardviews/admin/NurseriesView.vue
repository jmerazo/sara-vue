<script setup>
import { computed, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";
import ModalNurseryAssign from "@/components/dashboard/modals/ModalNurseryAssign.vue";
import ModalPropertyAdd from "@/components/dashboard/modals/ModalPropertyAdd.vue";
import ModalPropertyUpdate from "@/components/dashboard/modals/ModalPropertyUpdate.vue";
import ModalNurserySpeciesList from "@/components/dashboard/modals/ModalNurserySpeciesList.vue";
import { useModalStore } from "@/stores/modal";

import { descargarExcel, descargarPdf, obtenerFecha } from "@/helpers";

//componentes
import LoadingData from "@/components/shared/LoadingData.vue";

const nurseriesStore = useNurseriesDashStore();
const modal = useModalStore();

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  nurseriesStore.removeFilterProperty();
  next();
});

//botones paginador
const displayedPageRange = computed(() => {
  const currentPage = nurseriesStore.currentPage;
  const totalPages = nurseriesStore.totalPages;
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(totalPages, rangeStart + 3);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});

function deleteNursery(id, nu) {
  const confirmDelete = window.confirm(
    `¿Estás seguro de que desea eliminar el vivero ${nu}?`
  );
  if (!confirmDelete) {
    return;
  }
  nurseriesStore.deleteNursery(id);
}
</script>

<template>
  <div class="contenedor">
    <!-- encabezado vista -->
    <h1 class="reporte__heading">
      Listado de viveros <span class="texto__sara">SARA</span>
    </h1>
    <div class="contenido__header">
      <div class="buscador">
        <div class="buscador__contenido"></div>
        <label class="buscador__label">Buscar: </label>
        <input
          class="buscador__input"
          type="text"
          placeholder="Escríbe un término de búsqueda"
          @input="nurseriesStore.searchTerm($event.target.value)"
        />
      </div>
      <div class="botones__descarga">
        <a
          @click="
            descargarExcel(
              nurseriesStore.datosImport,
              `Listado de viveros SARA - ${obtenerFecha()}`
            )
          "
          class="boton"
          href="#"
          ><font-awesome-icon
            class="boton__excel"
            :icon="['fas', 'file-excel']"
        /></a>
        <a
          @click="
            descargarPdf(
              nurseriesStore.datosImport,
              `Listado de usuarios SARA - ${obtenerFecha()}`,
              8,
              1
            )
          "
          class="boton"
          href="#"
          ><font-awesome-icon class="boton__pdf" :icon="['fas', 'file-pdf']"
        /></a>
      </div>
    </div>
    <!-- fin encabezado vista -->
    <hr />
    <LoadingData v-if="nurseriesStore.cargando"/>
    <main v-else>
      <table class="tabla">
        <thead class="tabla__encabezado">
          <tr class="tabla__fila">
            <th class="dato__encabezado">NIT</th>
            <th class="dato__encabezado">VIVERO</th>
            <th class="dato__encabezado">REPRESENTANTE</th>
            <th class="dato__encabezado">EMAIL</th>
            <th class="dato__encabezado">CELULAR</th>
            <th class="dato__encabezado">DIRECCIÓN</th>
            <th class="dato__encabezado">DEPARTAMENTO</th>
            <th class="dato__encabezado">MUNICIPIO</th>
            <th class="dato__encabezado">ESTADO</th>
            <th class="dato__encabezado">ACCIONES</th>
          </tr>
        </thead>
        <tbody class="tabla__contenido">
          <tr
            class="tabla__fila"
            v-for="nursery in nurseriesStore.displayedNursery"
            v-bind:key="nursery.id"
          >
            <td class="tabla__dato nombre__persona">
              {{ nursery.nit }}
            </td>
            <td class="tabla__dato nombre__persona">
              {{ nursery.nombre_vivero }}
            </td>
            <td class="tabla__dato nombre__persona">
              {{ nursery.first_name + " " + nursery.last_name }}
            </td>
            <td class="tabla__dato">
              {{ nursery.email }}
            </td>
            <td class="tabla__dato">
              {{ nursery.telefono }}
            </td>
            <td class="tabla__dato">
              {{ nursery.direccion }}
            </td>
            <td class="tabla__dato">
              {{ nursery.departamento }}
            </td>
            <td class="tabla__dato">
              {{ nursery.municipio }}
            </td>
            <td class="tabla__dato">
              {{ nursery.activo }}
            </td>
            <td class="tabla__dato tabla__botones">
<!--               <button
                @click="nurseriesStore.selectedPropertyUpdate(property.id)"
                class="tabla__boton"
              >
                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
              </button> -->
              <button
                @click="nurseriesStore.selectedNurseryAssignSpecie(nursery.id)"
                class="tabla__boton" title="Asignar especie"
              >
                <font-awesome-icon :icon="['fab', 'pagelines']" />
              </button>

              <button
                @click="nurseriesStore.selectedNurserySpeciesList(nursery.id)"
                class="tabla__boton" title="Listar especies"
              >
                <font-awesome-icon :icon="['fas', 'table-list']" />
              </button>

              <button
                @click="deleteNursery(nursery.id, nursery.nombre_vivero)"
                class="tabla__boton" title="Eliminar vivero"
              >
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div
        @click="modal.handleClickModalPropertyAdd()"
        class="agregar"
      ></div> -->
      <!-- paginador -->
      <section class="paginador">
        <div class="paginador__botones">
          <button
            class="paginador__boton paginador__boton--anterior"
            v-if="nurseriesStore.currentPage > 1"
            @click="nurseriesStore.changePage(nurseriesStore.currentPage - 1)"
          >
            <font-awesome-icon :icon="['fas', 'angles-left']" />
          </button>

          <button
            v-for="page in displayedPageRange"
            :key="page"
            @click="nurseriesStore.changePage(page)"
            class="paginador__boton"
            :class="{
              'paginador__boton-actual': page === nurseriesStore.currentPage,
            }"
          >
            {{ page }}
          </button>
          <button
            class="paginador__boton paginador__boton--siguiente"
            v-if="nurseriesStore.currentPage < nurseriesStore.totalPages"
            @click="nurseriesStore.changePage(nurseriesStore.currentPage + 1)"
          >
            <font-awesome-icon :icon="['fas', 'angles-right']" />
          </button>
        </div>
      </section>
      <!--fin paginador -->
      <!-- texto validacion buscador -->
      <section class="validacion__contenido">
        <h1 v-if="nurseriesStore.noResultados && !nurseriesStore.cargando" class="validacion__heading">
          No hay resultados de búsqueda
        </h1>
      </section>
      <!--fin texto validacion buscador -->
      
    </main>
    <ModalPropertyAdd/>
    <ModalNurseryAssign/>
    <ModalNurserySpeciesList/>
  </div>
</template>

<style scoped>
/* encabezado de la vista */
.reporte__heading {
  font-size: 1.3rem;
  margin: 2rem;
}
@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.8rem;
    margin: 3rem;
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
  font-size: 1.5rem;
}
@media (min-width: 768px) {
  .boton {
    font-size: 1.8rem;
  }
}
.boton__excel {
  color: rgb(6, 114, 6);
}
.boton__pdf {
  color: var(--rojo);
}

/* Tabla */
/* Estilos para escritorio*/
.tabla {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: var(--blanco);
}

.dato__encabezado {
  background-color: var(--primary-backgound);
}

.tabla__fila,
.tabla__dato {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.nombre__campo {
  font-weight: 900;
  display: none;
}

.tabla__botones {
  display: flex;
  gap: 1rem;
}
.tabla__boton {
  background-color: var(--primary);
  text-align: center;
  color: var(--blanco);
  border-radius: 5px;
  padding: 0.1rem 0.5rem;
  transition: background-color 0.3s ease;
}

.tabla__boton:hover {
  background-color: var(--primary-hover);
}

/* Estilos para dispositivos */
@media (max-width: 1340px) {
  .tabla,
  .dato__encabezado,
  .tabla__contenido,
  .tabla__fila,
  .tabla__dato {
    display: block;
  }
  .tabla {
    background-color: unset;
  }

  .nombre__campo {
    font-weight: 900;
    display: inline;
  }

  .dato__encabezado {
    display: none;
  }
  .tabla__fila {
    padding: 0;
    border-radius: 5px;
    background-color: var(--blanco);
    margin-bottom: 1rem;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .tabla__dato {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 5px;
    position: relative;
    gap: 0.3rem;
  }
  .tabla__botones {
    gap: 0.7rem;
    margin-bottom: 1rem;
  }
  .fecha {
    text-align: center;
    padding: 10px;
  }
  .nombre__persona {
    font-weight: 900;
    margin-top: 1rem;
  }
  .tabla__contenido {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .tabla__botones {
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .tabla__contenido {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
@media (max-width: 625px) {
  .tabla__contenido {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
/* swithc */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin-left: 4px;
}

.switch .tabla__input {
  opacity: 0;
  width: 0;
  height: 0;
}

.tabla__boton-ckeck {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--secondary);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.tabla__boton-ckeck:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

.tabla__input:checked + .tabla__boton-ckeck {
  background-color: var(--primary);
}

.tabla__input:focus + .tabla__boton-ckeck {
  box-shadow: 0 0 1px var(--primary);
}

.tabla__input:checked + .tabla__boton-ckeck:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}
</style>