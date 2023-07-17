<script setup>
import { ref, computed, createElementBlock} from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useFamiliasStore } from "../stores/families";
import {useEspeciesStore} from '../stores/species'
import Alerta from '../components/Alerta.vue'

const route = useRoute();
const router = useRouter();
const paginaInicio = computed(() => route.name === "home");

const familias = useFamiliasStore();
const especies = useEspeciesStore()
const error = ref('')

const categoria = ref('')
const valorBuscar = ref('')

const validarcampos = ()=>{
  
  if(categoria.value){

    if(categoria.value === 'Familia' && valorBuscar.value ){
      msgFamilia()
      return
    }else if(categoria.value === 'Especie' && valorBuscar.value){
      msgComun(valorBuscar.value)
      return
    }else if(categoria.value === 'Nombre científico' && valorBuscar.value){
      msgCientifico(valorBuscar.value)
      return
    }else{
      error.value = 'Todos los campos son obligatorios'
      setTimeout(()=>{
        error.value = ''
      },3000)
  }

  }else{
    error.value = 'Todos los campos son obligatorios'
    setTimeout(()=>{
      error.value = ''
    },3000)
  }
}

const msgFamilia = ()=>{
  router.push('/familias');
}
const msgComun = (comun)=>{
  router.push('/especies');
}
const msgCientifico = (cientifico)=>{
  alert(cientifico)
}

</script>

<template>
  <header class="bg-green-950" :class="{ header: paginaInicio }">
    <div class="mx-auto container px-5 py-10">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <img class="w-20" src="../assets/sara.png" alt="Logotipo" />
          </RouterLink>
        </div>

        <nav class="flex gap-4 text-white">
          <RouterLink
            :to="{ name: 'home' }"
            class="text-2xl rounded-lg p-2 hover:bg-green-900 uppercase font-bold"
            active-class="text-green-500"
          >
            Inicio
          </RouterLink>

          <RouterLink
            :to="{ name: 'especies' }"
            class="text-2xl rounded-lg p-2 hover:bg-green-900 uppercase font-bold"
            active-class="text-green-500"
          >
            Especies
          </RouterLink>
          <RouterLink
            :to="{ name: 'familias' }"
            class="text-2xl rounded-lg p-2 hover:bg-green-900 uppercase font-bold"
            active-class="text-green-500"
          >
            Familias
          </RouterLink>
        </nav>
      </div>
      
      <form
        v-if="paginaInicio"
        class="md:w-1/2 2xl:w-1/3 bg-green-700 my-32 p-10 rounded-lg shadow space-y-6 bg-opacity-50 .form"
        @submit.prevent="handleSubmit"
      >
      <Alerta v-if="error">
        {{ error }}
      </Alerta>
        <div class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >Buscar</label
          >
          <select
            id="categoria"
            class="text-2xl p-3 w-full rounded-lg focus:outline-none font-bold"
            v-model="categoria"
            @click="valorBuscar=''"
          >
            <option value="" >-- Seleccione --</option>
            <option>Familia</option>
            <option>Especie</option>
            <option>Nombre científico</option>
            
          </select>
        </div>

        <div v-if="categoria ==='Familia'" class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="parametro"
            >Valor a buscar</label
          >
          <select
            id="categoria"
            class="text-2xl p-3 w-full rounded-lg focus:outline-none font-bold"
            v-model="valorBuscar"
          >
            <option value="">-- Seleccione --</option>
            <option v-for="familia in familias.familias" :key="familia.familia"> {{ familia.familia }}</option>
          </select>
        </div>
        <div v-if="categoria ==='Especie'" class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="parametro"
            >Valor a buscar</label
          >
          <select
            id="categoria"
            class="text-2xl p-3 w-full rounded-lg focus:outline-none font-bold"
            v-model="valorBuscar"
          >
            <option value="">-- Seleccione --</option>
            <option v-for="especie in especies.especies" :key="especie.nom_comunes"> {{ especie.nom_comunes }}</option>
          </select>
        </div>
        <div v-if="categoria ==='Nombre científico'" class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="parametro"
            >Valor a buscar</label
          >
          <select
            id="categoria"
            class="text-2xl p-3 w-full rounded-lg focus:outline-none font-bold"
            v-model="valorBuscar"
          >
            <option value="">-- Seleccione --</option>
            <option v-for="especie in especies.especies" :key="especie.nombre_cientifico"> {{ especie.nombre_cientifico }}</option>
          </select>
        </div>
        <div v-if="!categoria" class="space-y-4">
          <label
            class="block text-white uppercase font-extrabold text-lg"
            for="parametro"
            >Valor a buscar</label
          >
          <select
            disabled
            id="categoria"
            class="text-2xl p-3 w-full rounded-lg focus:outline-none font-bold"
            
          >
            <option value="">-- Seleccione --</option>
            
          </select>
        </div>
        <input
          type="submit"
          class="bg-lime-400 hover:bg-lime-500 cursor-pointer font-extrabold w-full p-2 rounded-lg uppercase"
          value="Buscar"
          @click="validarcampos()"
        />
        <!-- fdsfjskdfjsdonsdondso -->


      </form>
    </div>
  </header>
</template>

<style>
.header {
  background-image: url("../assets/media/r1.jpg");
  background-size: cover;
  background-position: center;
}
</style>