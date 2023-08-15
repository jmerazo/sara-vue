<script setup>
import { useConsultaStore } from '../stores/consulta';

const consulta = useConsultaStore()

const mostrarIndividuos = (nom_familia)=>{
  consulta.consulta.categoria = 'Familia'
  consulta.consulta.vrBuscar = nom_familia
  consulta.mostrarConsulta()
}

defineProps({
  familia: {
    type: Object,
  },
});

</script>
<template>
  <div
    
  >
    <div class="md:flex">
      <div class="md:w-1/3 p-8 justify-content-center flex">
        <!-- Contenido de la sección 1 -->
        <img
          src="../assets/gifFamlia.gif"
          alt="GIF de la especie"
        />
      </div>

      <div class="md:w-1/2">
        <div class="mb-6">
          <h2 class="text-3xl font-bold mb-2">{{familia.familia}}</h2>
          <p class="text-justify text-xl">
            Esta familia comparte las siguientes caraterísticaslas:
            <span class="font-bold">hojas en punta de auja, tallo corrugado y muy húmedo</span>
          </p>
        </div>
        <div class="flex items-center">
          <button
            class="shadow-lg bg-customGreen hover:bg-green-900 flex items-center justify-center w-full p-3 text-bold text-3xl text-white rounded-lg"
            @click="mostrarIndividuos(familia.familia)"
          >
            Ver individuos
          </button>
        </div>
      </div>
    </div>
  </div>
</template>