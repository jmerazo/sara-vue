<script setup>
import { useModalStore } from "@/stores/modal";

const modal = useModalStore();
</script>

<template>
  <div class="modal" v-if="modal.modalComponent">
    <div class="modal__contenido" :class="{ showModal: modal.modalComponent }">
      <div class="contenido">
        <div class="contenido__derecha">
          <div class="modal__flex">
            <div class="modal__imagen">
              <img alt="'imagen coponente" :src="modal.componentsTree[0]" />
            </div>
          </div>
        </div>
        <div class="contenido__izquierda">
          <div>
            <h4 class="contenido__titulo">{{ modal.componentsTree[1] }}</h4>
            <p class="contenido__descripcion">{{ modal.componentsTree[2] }}</p>
          </div>
        </div>
      </div>
      <div @click="modal.handleClickModalComponent([])" class="boton__cerrar">
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
  width: 80%;
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
    width: 85%;
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
    /* grid-template-columns: repeat(5, 1fr); */
  }
}

.boton__cerrar {
  position: absolute;
  top: 0.2%;
  right: 0.2%;
  font-size: 1rem;
  color: var(--gris);
  width: 40px;
  padding: 0;
  margin: 0;
  background: none;
}
.boton__cerrar path {
  transition: 0.4s ease all;
}
.boton__cerrar:hover svg {
  background: var(--gris);
  border-radius: 50%;
  color: var(--blanco);
}

.modal__imagen img {
  width: 500px;
  height: 200px;
  border-radius: 1rem;
}

.contenido__titulo {
  margin: 1rem 0 0 0;
}

.contenido__descripcion {
  margin: 1rem 0 0 0;
  font-size: 0.9rem;
  text-align: justify;
}

@media (min-width: 768px) {
  .modal__imagen img {
    width: 800px;
    height: 500px;
  }
}
@media (min-width: 1440px) {
  .contenido__titulo {
    margin: 0;
  }
  .modal__imagen img {
    height: 400px;
  }
}
</style>