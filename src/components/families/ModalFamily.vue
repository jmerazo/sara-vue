<script setup>
import { reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useModalStore } from "@/stores/modal";
import { useConsultaStore } from "@/stores/consulta";

const route = useRoute();
const modal = useModalStore();
const consulta = useConsultaStore();

const paginaInicio = computed(() => route.name === "home");
const router = useRouter();



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
      <p class="modal__texto">Esta familia agrupa las siguientes especies:</p>
      <hr />
      <!-- iterar las especies -->
      <div class="listado__contenido">
        <!-- especies -->
        <div class="especies">
          <div class="especie" v-for="especie in consulta.familia" :key="especie.familia">
            <p class="especie__dato">
              {{ especie.vernacularName }} -
              {{ especie.nombre_cientifico }}
            </p>
            <button
              class="card__boton animacion"
              @click="
                consulta.consultSpecie(especie.code_specie), modal.handleClickModalFamily()
              "
            >
              <span>Ver especie</span>
            </button>
          </div>
        </div>
        <!-- fin de la especies -->
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
.especies__fila {
  display: flex;
  flex-direction: column;
  background-color: var(--gris-claro);
  border-radius: 10px;
  margin-bottom: 1rem;
}
.especies {
  width: 100%;
}

@media (min-width: 768px) {
  .especies {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

.especie__dato {
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--gris);
  padding: 0 10px;
}

.especie__boton  {
  background-color: #066964;
  color: var(--blanco);
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 5px;
  padding: 8px 40px;
  transition: background-color 0.3s;
}
.especie__boton :hover {
  background-color: #033b37;
}

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
  width: 85%;
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
  font-size: 1.1rem;
  margin: 3rem 0 1.5rem 0;
  color: var(--primary);
}

.modal__texto {
  line-height: 1.5;
  font-size: 0.8rem;
  text-align: center;
  font-weight: 700;
  color: var(--secondary);
  margin-bottom: 1rem;
}
.modal__botones {
  margin-top: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

.modal__botonCerrar {
  background-color: var(--secondary);
  color: var(--blanco);
  padding: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 5px;
  width: 95%;
  margin: 0 auto;
  transition: background-color 0.3s;
}
.modal__botonCerrar:hover {
  background-color: var(--secondary-hover);
}
.modal__botonMas {
  background-color: var(--primary);
  color: var(--blanco);
  padding: 0.5rem;
  font-size: 1rem;
  width: 95%;
  margin: 0 auto;
  font-weight: 700;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.modal__botonMas:hover {
  background-color: var(--primary-hover);
}

/* boton ver especie */

.card__boton {
  display: inline-flex;
  width: 80%;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 1.7rem;
  background-color: var(--gris);
  color: var(--blanco);
  font-weight: 700;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  margin-top: 0rem;
  margin-bottom: 2rem;
}

@media (min-width: 767px) {
  .card__boton{
    width: 50%;
  }
}

.card__boton span {
  position: relative;
  z-index: 2;
  transition: 0.3s ease all;
}

.animacion::after {
  content: "";
  width: 100%;
  position: absolute;
  z-index: 1;
  transition: 0.3s ease-in-out all;
  top: 0;
  left: calc(-100% - 80px); /* calc elemnt widht with border-right */
  border-right: 80px solid transparent;
  border-bottom: 40px solid var(--primary);
  transition: 0.4s ease-in-out all;
}
.animacion:hover::after {
  left: 0;
}
</style>