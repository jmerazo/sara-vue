<script setup>
import { ref } from "vue";

import { useModalStore } from "@/stores/modal";
import { useEspeciesStore } from "@/stores/species";
import { useConsultaStore } from "@/stores/consulta";
import { getFullImageUrl} from '@/helpers/'

const modal = useModalStore();
const especies = useEspeciesStore();
const consulta = useConsultaStore();
const imagen = ref("");

const verImg = (url) => {
  imagen.value = getFullImageUrl(url);
};

const consultar = (nombre_comun) => {
  consulta.consulta.categoria = "Nombre Común";
  consulta.consulta.vrBuscar = nombre_comun;
  consulta.mostrarConsulta();
};

const limpiarModal = ()=>{
  imagen.value=''
}
</script>

<template>
  <div class="modal" v-if="modal.modal">
    <div
      class="modal__contenido"
      :class="{ showModal: modal.modal }"
      v-for="especie in especies.especie"
      :key="especie.cod_especie"
    >
      <div class="modal__flex">
        <div class="modal__imagen">
          <img
            :src="
              imagen ? imagen : getFullImageUrl(especie.img_general)
            "
            :alt="'imagen de ' + especie.nom_comunes"
            @click="verImg(especie.img_general)"
          />
        </div>
        <div class="modal__iconos">
          <img
            @click="verImg(especie.img_leafs)"
            class="modal__icono"
            src="/icons/hojas.png"
            alt="external-leaves-plants-flaticons-lineal-color-flat-icons-2"
          />
          <img
            @click="verImg(especie.img_flowers)"
            class="modal__icono"
            src="/icons/flores.png"
            alt="external-flowers-valentines-day-flatart-icons-lineal-color-flatarticons"
          />
          <img
            @click="verImg(especie.img_fruits)"
            class="modal__icono"
            src="/icons/frutos.png"
            alt="external-fruits-farm-flaticons-lineal-color-flat-icons-2"
          />
          <img
            @click="verImg(especie.img_seeds)"
            class="modal__icono"
            src="/icons/semillas.png"
            alt="external-fruits-farm-flaticons-lineal-color-flat-icons-2"
          />
          <img
            @click="verImg(especie.img_stem)"
            class="modal__icono"
            src="/icons/tallo.png"
            alt="external-stem-plants-flaticons-lineal-color-flat-icons-2"
          />
        </div>
      </div>

      <div class="modal__info">
        <h3 @click="verImg(especie.img_general)" class="modal__heading">
          {{ especie.nom_comunes }}
        </h3>
        <p class="modal__texto">
          {{ especie.nombre_cientifico}}
        </p>
        <p class="modal__texto">
          {{ especie.familia}}
        </p>
        <h3 class="modal__titulo">Otros nombres:</h3>

        <p class="modal__texto">
          {{ especie.otros_nombres }}
        </p>
        <h3 class="modal__titulo">Sinónimos:</h3>
        <p class="modal__texto">
          {{ especie.sinonimos }}
        </p>
      </div>
      <div class="modal__botones">
        <button
          type="button"
          class="modal__Mas"
          @click="consultar(especie.cod_especie),limpiarModal()"
        >
          Ver Descripción completa
        </button>
        <button
          type="button"
          class="modal__Cerrar"
          @click="modal.handleClickModal(), verImg(especie.img_general),limpiarModal()"
        >
          Cerrar
        </button>
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
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
  transform: translate(-200%, -200%);
  transition: transform 10s ease-in-out;
  z-index: 11000;
}

@media (min-width: 768px) {
  .modal__contenido {
    width: 70%;
  }
  .modal__flex {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    gap: 1.5rem;
  }
}
@media (min-width: 992px) {
  .modal__contenido {
    width: 35%;
  }
}
@media (min-width: 1820px) {
  .modal__contenido {
    width: 30%;
  }
}
.showModal {
  transform: translate(-50%, -50%);
}

.modal__iconos {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
}
@media (min-width: 768px) {
  .modal__iconos {
    flex-direction: column;
    margin-top: 1rem;
  }
}
.modal__icono {
  width: 2.3rem;
  border: 1px solid var(--primary);
  transition: transform 0.3s;
}
.modal__icono:hover {
  transform: scale(1.1);
}

.modal__heading {
  font-size: 1rem;
  margin: 2rem auto .5rem auto;
  color: var(--primary);
  cursor: pointer;
}

.modal__titulo {
  font-weight: 700;
  font-size: .8rem;
  border-top: 1px solid gray;
  padding: .3rem;
  margin-bottom: 2px;
}

.modal__texto {
  line-height: 1.2;
  font-size: .8rem;
  font-weight: 700;
  text-align: center;
  color: var(--gris);
}
.modal__botones {
  display: flex;
  flex-direction: column;
 
}
@media (min-width: 992px){
  .modal__botones{
    flex-direction: row;
     gap: 1rem;
  }
}
.modal__Cerrar {
  transition: background-color 0.3s;
  font-size: 1rem;
  margin-top: 1rem;
  background-color: var(--secondary);
  color: var(--blanco);
  padding: .6rem;
  font-weight: 700;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.3s;
}
@media (min-width: 992px){
  .modal__Cerrar {
    margin-top: 3rem;
  }
}
.modal__Cerrar:hover {
  background-color: var(--secondary-hover);
}
.modal__Mas {
  font-size: 1rem;
  margin-top: 3rem;
  background-color: var(--primary);
  color: var(--blanco);
  padding: .6rem;
  font-weight: 700;
  border-radius: 5px;
  width: 100%;
  transition: background-color 0.3s;
}

.modal__Mas:hover {
  background-color: var(--primary-hover);
}
.modal__imagen img{
  width: 500px;
  height: 375px;
}
</style>