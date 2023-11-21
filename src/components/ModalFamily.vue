<script setup>
import { reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useModalStore } from "../stores/modal";
import { useConsultaStore } from "../stores/consulta";

const route = useRoute();
const modal = useModalStore();
const consulta = useConsultaStore();

const paginaInicio = computed(() => route.name === "home");
const router = useRouter();

const consultar = (nombre_comun) => {
  consulta.consulta.categoria = "Nombre Común";
  consulta.consulta.vrBuscar = nombre_comun;
  consulta.mostrarConsulta();
};

const irFamilias = () => {
  router.push("/familias");
};
</script>

<template>
  <div class="modal" v-if="modal.modalFamily">
    <div class="modal__contenido">
      <h3 class="modal__heading">
        {{ consulta.strFamilia }}
      </h3>
      <p class="modal__texto">
        Esta familia cuenta con las siguientes especies:
      </p>
      <hr />
      <!-- iterar las especies -->
      <div class="modal__tabla">
        <!-- tabla -->
        <table
          class="tabla"
          v-for="especie in consulta.familia"
          :key="especie.familia"
        >
          <tr class="tabla__fila">
            <td class="tabla__columna">
              <p class="tabla__dato">
                {{ especie.nom_comunes }} -
                {{ especie.nombre_cientifico }}
              </p>
             
            </td>
            <td class="tabla__columna">
              <button
                class="tabla__boton"
                @click="
                  consultar(especie.nom_comunes), modal.handleClickModalFamily()
                "
              >
                Ver especie
              </button>
            </td>
          </tr>
        </table>
        <!-- fin de la tabla -->
      </div>
      <div class="modal__botones">
        <button
          v-if="paginaInicio"
          type="button"
          class="modal__botonMas"
          @click="irFamilias(), modal.handleClickModalFamily()"
        >
          Ver Todas las Familias
        </button>
        <button
          type="button"
          class="modal__botonCerrar"
          @click="modal.handleClickModalFamily()"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.tabla__fila {
  display: flex;
  flex-direction: column;
  background-color: var(--gris-claro);
  border-radius: 20px;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .tabla {
    width: 100%;
  }
  .tabla__fila {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
  }
}

.tabla__dato {
  font-weight: 700;
  color: var(--gris);
  padding: 0 10px;
}
.tabla__boton {
  background-color: #066964;
  color: var(--blanco);
  font-weight: 700;
  border-radius: 10px;
  padding: 10px 55px;
  transition: background-color 0.3s;
}
.tabla__boton:hover {
  background-color: #033b37;
}

@media (min-width: 768px){
  .tabla__boton{
    background-color: var(--blanco);
    color: var(--gris);
    transition-property: background-color color;
    transition-duration: .4s;
  }
  .tabla__boton:hover{
    background-color:#066964;
    color: var(--blanco);
  }
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}

.modal__contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
  transform: translate(-50%, -50%);
}

@media (min-width: 830px) {
  .modal__contenido {
    width: 45%;
  }
}

.modal__heading {
  font-size: 2rem;
  margin: 3rem 0 1.5rem 0;
  color: var(--primary);
}

.modal__texto {
  line-height: 1.5;
  text-align: center;
  font-weight: 700;
  color: var(--secondary);
}
.modal__botones {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal__botonCerrar {
  background-color: var(--secondary);
  color: var(--blanco);
  padding: 1rem;
  font-weight: 700;
  border-radius: 20px;
  transition: background-color 0.3s;
}
.modal__botonCerrar:hover {
  background-color: var(--secondary-hover);
}
.modal__botonMas {
  background-color: var(--primary);
  color: var(--blanco);
  padding: 1rem;
  font-weight: 700;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.modal__botonMas:hover {
  background-color: var(--primary-hover);
}
</style>