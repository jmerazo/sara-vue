<script setup>
import { computed, ref } from "vue";
import {useRoute} from "vue-router"
import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species";
import { useConsultaStore } from "@/stores/consulta";
import {useCalendarStore} from '@/stores/calendarMonitoring'
import { getFullImageUrl } from "@/helpers/";

const modal = useModalStore();
const species = useEspeciesStore();
const consulta = useConsultaStore();
const calendar = useCalendarStore()

const route = useRoute();
const queryPage = computed(()=> route.name)

console.log(route);
const imagen = ref("");

const verImg = (url) => {
  imagen.value = getFullImageUrl(url);
};
//calendar.calendarFlower()


const limpiarModal = () => {
  imagen.value = "";
};
</script>

<template>
  <div class="modal" v-if="modal.modalSpecie">
    <div
      class="modal__contenido"
      :class="{ showModal: modal.modalSpecie }"
      v-for="specie in species.specie"
      :key="specie.code_specie"
    >
      <div class="contenido">
        <div class="contenido__derecha">
          <div class="modal__flex">
            <div class="modal__imagen">
              <img
                :src="imagen ? imagen : getFullImageUrl(specie.images[0].img_general)"
                :alt="'imagen de ' + specie.vernacularName"
                @click="verImg(especie.images[0].img_general)"
              />
            </div>
            <div class="modal__iconos">
              <img
                @click="verImg(specie.images[0].img_leafs)"
                class="modal__icono"
                src="/icons/hojas.png"
                alt="external-leaves-plants-flaticons-lineal-color-flat-icons-2"
              />
              <img
                @click="verImg(specie.images[0].img_flowers)"
                class="modal__icono"
                src="/icons/flores.png"
                alt="external-flowers-valentines-day-flatart-icons-lineal-color-flatarticons"
              />
              <img
                @click="verImg(specie.images[0].img_fruits)"
                class="modal__icono"
                src="/icons/frutos.png"
                alt="external-fruits-farm-flaticons-lineal-color-flat-icons-2"
              />
              <img
                @click="verImg(specie.images[0].img_seeds)"
                class="modal__icono"
                src="/icons/semillas.png"
                alt="external-fruits-farm-flaticons-lineal-color-flat-icons-2"
              />
              <img
                @click="verImg(specie.images[0].img_stem)"
                class="modal__icono"
                src="/icons/tallo.png"
                alt="external-stem-plants-flaticons-lineal-color-flat-icons-2"
              />
            </div>
          </div>
        </div>
        <div class="contenido__izquierda">
          <div class="modal__info">
            <h3 @click="verImg(specie.images[0].img_general)" class="modal__heading">
              {{  specie.vernacularName  }}
            </h3>
            <p class="modal__texto">
              <span class="nombre__cientifico">{{
                specie.scientificName
              }}</span>
              <span class="nombre__autor">{{
                " " + specie.scientificNameAuthorship
              }}</span>
            </p>
            <p class="modal__texto">
              {{ specie.family }}
            </p>
            <h3 class="modal__titulo">Otros nombres:</h3>

            <p class="modal__texto modal-texto--cortar">
              {{ specie.otherNames }}
            </p>
            <h3 class="modal__titulo">Sinónimos:</h3>
            <p class="modal__texto modal-texto--container">
              {{ specie.synonyms }}
            </p>
          </div>
          <div class="modal__botones">
            <div class="boton__container">
              <button
                type="button"
                class="boton__mas animacion"
                @click="consulta.consultSpecie(specie.code_specie,queryPage),calendar.getCalendarSpecie(specie.code_specie), limpiarModal()"
              >
                <span>Ver Descripción completa</span>
              </button>
            </div>
            <div
              @click="
                modal.handleClickModalSpecie(),
                  verImg(specie.images[0].img_general),
                  limpiarModal()
              "
              class="button__modal--close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  z-index: 1000;
}

.modal__contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: var(--blanco);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 75%;
  max-height: 90vh;
  overflow-y: auto;
  transform: translate(-200%, -200%);
  transition: transform 10s ease-in-out;
  z-index: 11000;
}
.modal__flex {
  display: grid;
  justify-content: center;
}
@media (min-width: 768px) {
  .modal__contenido {
    width: 70%;
    
  }
  .modal__flex {
    flex-direction: row-reverse;
    justify-content: center;
    gap: 1.5rem;
  }
}

@media (min-width: 992px) {
  .modal__contenido {
    width: 80%;
    padding: 40px;
  }
}
@media (min-width: 1440px) {
  .modal__contenido {
    width: 50%;
  }
}
@media (min-width: 1820px) {
  .modal__contenido {
    width: 40%;
  }
}
.showModal {
  transform: translate(-50%, -50%);
}

@media (min-width: 992px) {
  .contenido {
    display: grid;
    gap: 2.5rem;
    grid-template-columns: repeat(5, 1fr);
  }
  .contenido__derecha {
    grid-column: 4/6;
    grid-row: 1;
  }
  .contenido__izquierda {
    grid-column: 1/4;
    grid-row: 1;
  }
}
.modal__iconos {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
}
@media (min-width: 768px) {
  .modal__iconos {
    margin-top: 1rem;
  }
}
.modal__icono {
  width: 2.3rem;
  border: 1px solid var(--primary);
  border-radius: 50%;
  transition: transform 0.3s;
}
.modal__icono:hover {
  transform: scale(1.1);
}

.modal__heading {
  font-size: 1rem;
  margin: 2rem auto 0.5rem auto;
  color: var(--primary);
  cursor: pointer;
}

.modal__titulo {
  font-weight: 700;
  font-size: 0.8rem;
  border-top: 1px solid gray;
  padding: 0.3rem;
  margin-bottom: 2px;
}

.modal__texto {
  line-height: 1.2;
  font-size: 0.8rem;
  font-weight: 700;
  text-align: center;
  color: var(--gris);
}
.modal__botones {
  display: flex;
  flex-direction: column;
}
@media (min-width: 992px) {
  .modal__botones {
    gap: 1rem;
  }
}


.boton__container {
  position: absolute;
  width: 82%;
}

@media (min-width: 768px) {
  .boton__container {
    width: 88%;
  }
}
@media (min-width: 992px) {
  .boton__container {
    position: absolute;
    width: 50%;
    top: 85%;
    margin-top:0 ;
  }
}
.boton__mas {
  display: inline-flex;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 3rem;
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
  margin: 1rem 0 1.5rem 0;
}

.boton__mas span {
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
  left: calc(-100% - 75px); /* calc elemnt widht with border-right */
  border-right: 80px solid transparent;
  border-bottom: 80px solid var(--primary);
  transition: 0.4s ease-in-out all;
}
.animacion:hover::after {
  left: 0;
}
@media (min-width: 992px) {
  .boton__mas {
    display: inline-flex;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 2.3rem;
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
    margin: auto;
  }
  .boton__cerrar {
    z-index: 2;
    top: 1%;
    right: 0.8%;
  }
}
.modal__imagen img {
  width: 500px;
  height: 375px;
  border-radius: 1rem;
}

.nombre__cientifico {
  font-style: italic; /* Cursiva */
  font-weight: bold; /* Negrita */
}

.nombre__autor {
  font-weight: bold; /* Negrita */
}

.modal-texto--container {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7; /* Número de líneas a mostrar */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; /* Agrega los puntos suspensivos */
}
.modal-texto--cortar {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* Número de líneas a mostrar */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis; /* Agrega los puntos suspensivos */
}
</style>