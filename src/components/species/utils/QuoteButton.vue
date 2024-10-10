<script setup>
import { ref } from "vue";

const showText = ref(false);

const copyText = () => {
  const textToCopyElement = document.querySelector(".modal__texto").textContent;
  if (textToCopyElement) {
    navigator.clipboard
      .writeText(textToCopyElement)
      .then(() => {
        console.log("Texto copiado al portapapeles");
      })
      .catch((error) => {
        console.error("Error al copiar el texto:", error);
      });
  } else {
    console.error("Elemento con la clase modal__texto no encontrado");
  }
};
</script>

<template>
  <div class="citar">
    <button class="citar__boton" @click="showText = !showText">
      <font-awesome-icon icon="quote-left" class="mr-2" /> Cómo Citar
    </button>
  </div>
  <div id="modal" v-if="showText" class="modal">
    <div class="modal__contenido">
      <span @click="showText = !showText" class="modal__close"><font-awesome-icon
          :icon="['fas', 'circle-xmark']" /></span>
      <p class="modal__titulo">Cítese como</p>
      <p class="modal__texto">
        Corpoamazonia (2024), Sistema de Información para la Administración 
        y Manejo Sostenible de los Recursos Naturales del sur de la Amazonia 
        colombiana (SARA), accedido el (fecha actualizada), 
        https://sara.corpoamazonia.gov.co/
      </p>
      <button @click="() => {
        copyText();
        showText = !showText;
      }
        " class="modal__boton">
        <font-awesome-icon icon="copy" class="mr-2" /> Copiar
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* Contenido del modal */
.modal__contenido {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--blanco);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 15rem;
}

@media (min-width: 768px) {
  .modal__contenido {
    width: 35rem;
  }
}

/* Botón para cerrar el modal */
.modal__close {
  position: absolute;
  top: 7px;
  right: 18px;
  font-size: 30px;
  color: #423d3d;
  cursor: pointer;
  border-radius: 10px;
  transition: color 0.3s ease;

}

.modal__close:hover {
  color: var(--primary);
}

/* citar */
.citar {
  position: fixed;
  top: 11.5%;
  right: 0;
  z-index: 10000;
}

@media (min-width: 1024px) {
  .citar {
    top: 90%;
  }
}

.citar__boton {
  background-color: var(--primary);
  /* Reemplazar con el color personalizado de tu elección */
  color: white;
  border-radius: 8px 0 0 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.modal__titulo {
  font-weight: 700;
}

.modal__texto {
  line-height: 1.8;
  text-align: center;
}

.modal__boton {
  font-weight: 700;
  margin-top: 1rem;
  background-color: var(--primary);
  color: var(--blanco);
  padding: 0.5rem;
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
}

.modal__boton:hover {
  background-color: var(--primary-hover);
}
</style>
