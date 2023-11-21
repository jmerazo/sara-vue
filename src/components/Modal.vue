<script setup>
import { watchEffect, computed, ref } from "vue";

import { useModalStore } from "../stores/modal";
import { useEspeciesStore } from "../stores/species";
import { useConsultaStore } from "../stores/consulta";

const modal = useModalStore();
const especies = useEspeciesStore();
const consulta = useConsultaStore();

const imgDefault = ref('https://static.vecteezy.com/system/resources/previews/000/527/023/non_2x/tree-with-roots-vector.jpg')

const imagenModal = ref({
    imgEspecie:'https://static.vecteezy.com/system/resources/previews/000/527/023/non_2x/tree-with-roots-vector.jpg',
    imgHojas:'https://inaturalist-open-data.s3.amazonaws.com/photos/24715/large.jpg',
    imgTallo:'https://www.researchgate.net/profile/Gerardo-Robledo/publication/274314363/figure/fig1/AS:669424336007177@1536614607961/Figura-3-Tejidos-que-constituyen-el-tronco-de-un-arbol-corte-transversal-En-el-centro.jpg',
    imgFlores:'https://img.freepik.com/fotos-premium/flores-amarillas-arbol-hoja-perenne-cassia-isla_136404-734.jpg',
    imgFrutos:'https://img.freepik.com/fotos-premium/fruta-granada-madura-colgando-jardin-espacio-copiar_150101-4103.jpg',
    sinImagen: '/img/sin_imagen.jpg'
})

const cambiarImagenModal = (nuevaImagen) => {
  if (nuevaImagen) {
    imagenModal.value.imgEspecie = nuevaImagen;
  } else {
    imagenModal.value.imgEspecie = imagenModal.value.sinImagen;
  }
};

const consultar = (nombre_comun) => {
  consulta.consulta.categoria = "Nombre Común";
  consulta.consulta.vrBuscar = nombre_comun;
  consulta.mostrarConsulta();
};
</script>

<template>
  <div class="modal" v-if="modal.modal">
    <div class="modal__contenido" :class="{ showModal: modal.modal }">
      <div class="modal__flex">
        <div class="modal__imagen">
          <img
            :src="imagenModal.imgEspecie"
            :alt="'imagen de ' + especies.especies.nom_comunes"
            @click="cambiarImagenModal(imgDefault)"
          />
        </div>
        <div class="modal__iconos">
          <img
            @click="cambiarImagenModal(imagenModal.imgHojas)"
            class="modal__icono"
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-leaves-plants-flaticons-lineal-color-flat-icons-2.png"
            alt="external-leaves-plants-flaticons-lineal-color-flat-icons-2"
          />
          <img
            @click="cambiarImagenModal(imagenModal.imgFlores)"
            class="modal__icono"
            src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-flowers-valentines-day-flatart-icons-lineal-color-flatarticons.png"
            alt="external-flowers-valentines-day-flatart-icons-lineal-color-flatarticons"
          />
          <img
            @click="cambiarImagenModal(imagenModal.imgFrutos)"
            class="modal__icono"
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-fruits-farm-flaticons-lineal-color-flat-icons-2.png"
            alt="external-fruits-farm-flaticons-lineal-color-flat-icons-2"
          />
          <img
            @click="cambiarImagenModal(imagenModal.imgTallo)"
            class="modal__icono"
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-stem-plants-flaticons-lineal-color-flat-icons-2.png"
            alt="external-stem-plants-flaticons-lineal-color-flat-icons-2"
          />
        </div>
      </div>

      <div class="modal__info">
        <h3 @click="cambiarImagenModal(imgDefault)" class="modal__heading">
          {{ especies.especie.nom_comunes }}
        </h3>
        <h3 class="modal__titulo">Otros nombres:</h3>

        <p class="modal__texto">
          {{ especies.especie.otros_nombres }}
        </p>
        <h3 class="modal__titulo">Sinónimos:</h3>
        <p class="modal__texto">
          {{ especies.especie.sinonimos }}
        </p>
      </div>
      <div class="modal__botones">
        <button
          type="button"
          class="modal__botonMas"
          @click="consultar(especies.especie.nom_comunes)"
        >
          Ver Descripción completa
        </button>
        <button
          type="button"
          class="modal__botonCerrar"
          @click="modal.handleClickModal(), cambiarImagenModal(imgDefault)"
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
}

@media (min-width: 830px) {
  .modal__contenido {
    width: 45%;
  }
  .modal__flex {
    display: flex;
    flex-direction: row-reverse;
    
    justify-content: center;
    gap: 2rem;
  }
}
.showModal {
  transform: translate(-50%, -50%);
}

.modal__iconos {
  display: flex;
  justify-content: space-evenly;
  gap: 2px;
  margin-top: 1rem;
}
@media (min-width: 830px) {
  .modal__iconos {
    flex-direction: column;
    justify-content: space-evenly;
    margin-top: 1rem;
  }
}
.modal__icono {
  border: 1px solid var(--primary);
  transition: transform 0.4s;
}
.modal__icono:hover {
  transform: scale(1.2);
}

.modal__heading {
  font-size: 2rem;
  margin-top: 2rem;
  color: var(--primary);
  cursor: pointer;
}

.modal__titulo {
  font-weight: 700;
  font-size: 1.2rem;
  border-top: 1px solid gray;
  padding: 1rem;
  margin-bottom: 2px;
}

.modal__texto {
  line-height: 1.8;
  text-align: center;
  font-weight: 700;
  color: var(--secondary);
}
.modal__botones {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.modal__botonCerrar {
  background-color: var(--secondary);
  color: var(--blanco);
  padding: 1rem;
  font-weight: 900;
  border-radius: 20px;
  transition: background-color 0.3s;
}
.modal__botonCerrar:hover {
  background-color: var(--secondary-hover);
}
.modal__botonMas {
  margin-top: 3rem;
  background-color: var(--primary);
  color: var(--blanco);
  padding: 1rem;
  font-weight: 900;
  border-radius: 20px;
  transition: background-color 0.3s;
}

.modal__botonMas:hover {
  background-color: var(--primary-hover);
}
</style>