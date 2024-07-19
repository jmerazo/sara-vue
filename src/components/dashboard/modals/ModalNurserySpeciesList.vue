<script setup>

import { useNurseriesDashStore } from "@/stores/dashboard/nurseries";
import { useModalStore } from "@/stores/modal";

const modal = useModalStore();
const nurseriesStore = useNurseriesDashStore();

function deleteSpecieUser(id, nu) {
  const confirmDelete = window.confirm(
    `¿Estás seguro de que desea eliminar la especie ${nu}?`
  );
  if (!confirmDelete) {
    return;
  }
  property.deleteSpecieUser(id);
}
</script>

<template>
  <div class="modal" v-if="modal.modalNurserySpecieList">
    <div class="modal__contenido">
      <div class="list__content">
        <div v-if="nurseriesStore.nurseriesSpeciesList.nombre_vivero">
          <h3 class="list__title">Vivero: {{ nurseriesStore.nurseriesSpeciesList.nombre_vivero }}</h3>
          <hr>
        </div>

        <div v-if="!nurseriesStore.nurseriesSpeciesList.nombre_vivero">
          <p style="font-weight: 500;">No hay especies asignadas para este vivero</p>
          <svg style="width: 2rem; color: var(--rojo);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="currentColor">
            <path
              d="M15.936 2.50098L21.501 8.06595V15.936L15.936 21.501H8.06595L2.50098 15.936V8.06595L8.06595 2.50098H15.936ZM15.1076 4.50098H8.89437L4.50098 8.89437V15.1076L8.89437 19.501H15.1076L19.501 15.1076V8.89437L15.1076 4.50098ZM11.0002 15.0002H13.0002V17.0002H11.0002V15.0002ZM11.0002 7.00024H13.0002V13.0002H11.0002V7.00024Z">
            </path>
          </svg>
        </div>

        <div v-else class="card__specie-user">

          <div v-for="(ns, index) in nurseriesStore.nurseriesSpeciesList.especies" :key="index">
            <div class="card__body">
              <p class="info">{{ ns.nom_comunes }}</p>
              <p>{{ ns.nombre_cientifico_especie }}, {{ ns.nombre_autor_especie }}</p>
              <p>Tipo: <span class="info">{{ ns.tipo_venta }}</span></p>
              <p>U/M: <span class="info">{{ ns.unidad_medida }}</span></p>
              <hr>

              <div>
                <p>Vendidas: <span class="info">{{ ns.ventas_realizadas }}</span></p>
                <p>Disponible: <span class="info">{{ ns.cantidad_stock - ns.ventas_realizadas }}</span></p>
              </div>
              <div v-if="!ns.observaciones === 'NA' || !ns.observaciones === ''">
                <hr>
                <p><span class="info">{{ ns.observaciones }}</span></p>
              </div>
              <button class="card__body-button">
                <svg style="width: 1.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z">
                  </path>
                </svg>
              </button>
            </div>
          </div>


        </div>



        <div class="list__botones">
          <div class="button__modal--close" @click="modal.handleClickModalNurserySpecieList()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info {
  font-weight: 600;
}

.card__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.list__content .list__title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 500;
}

.card__body-button {
  position: absolute;
  background: none;
  top: .5rem;
  right: .5rem;
  opacity: 0.7;
  transition: all .2s ease-in-out;
  color: rgb(187, 10, 10);
}


@media (min-width: 768px) {
  .card__body-button {
    opacity: 0.5;
  }

  .card__body-button:hover {
    color: rgb(187, 10, 10);
    opacity: 1;
  }
}

.card__specie-user {
  position: relative;
  background: rgb(247, 247, 247);
  border-radius: .5rem;
  overflow: hidden;
  box-shadow: 0 0 .5rem #00000030;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

@media (min-width: 768px) {
  .card__specie-user {
    grid-template-columns: 1fr 1fr;
  }
}

.card__specie-user .card__body {
  padding: 1rem;
  background-color: #fff;
  border-radius: .5rem;
  height: 300px;
  position: relative;
}

.card__specie-user .card__body p {
  margin: 0;
  font-size: 1rem;
  padding: .2rem 0;
  text-align: center;
}

/* styles generals */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 11000;
}

.modal__contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 95%;
  max-height: 83%;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  z-index: 1000;
  margin-top: 2rem;
}

@media (min-width: 768px) {
  .modal__contenido {
    margin-top: 0;
  }
}

@media (min-width: 992px) {
  .modal__contenido {
    width: 50%;
    margin-top: 1rem;
  }
}

@media (min-width: 1440px) {
  .modal__contenido {
    width: 40%;
  }
}

@media (min-width: 1820px) {
  .modal__contenido {
    width: 30%;
  }
}
</style>