<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useFamiliasStore } from '../stores/families'
import { useEspeciesStore } from '../stores/species'
import { useConsultaStore } from "../stores/consulta";

import Alerta from '../components/Alerta.vue'
import Slider from '../components/Slider.vue'

const route = useRoute();
const paginaInicio = computed(() => route.name === "home");

const familias = useFamiliasStore();
const especies = useEspeciesStore();
const consulta = useConsultaStore()

const error = ref('')

const validarcampos = () => {

  if (consulta.consulta.categoria && consulta.consulta.vrBuscar) {
    consulta.mostrarConsulta()
    return
  } else {
    error.value = 'Todos los campos son obligatorios'
    setTimeout(() => {
      error.value = ''
    }, 3000)
  }

}
</script>

<template>
  <header class="bg-navbar" :style="!paginaInicio ? {'background-color': '#eaf2ed'} : {}">
    <Slider v-if="paginaInicio" class="header-slider"></Slider>

    <div class="fixed-between-navbar py-16">
      <div class="flex justify-between items-center">
        <div>
          <RouterLink :to="{ name: 'home' }">
            <img class="w-32" src="../assets/sara.png" alt="Logotipo" />
          </RouterLink>
        </div>

        <nav class="flex gap-4" :class="{'text-white' : paginaInicio, 'text-customGreen' : !paginaInicio}">
          <RouterLink :to="{ name: 'home' }" class="text-xl  rounded-lg p-2 txt-blur-transparent uppercase font-bold"
            active-class="text-green-500">
            Inicio
          </RouterLink>

          <RouterLink :to="{ name: 'especies' }" class="text-xl  rounded-lg p-2 txt-blur-transparent uppercase font-bold"
            active-class="text-green-500">
            Especies
          </RouterLink>
          <RouterLink :to="{ name: 'familias' }" class="text-xl  rounded-lg p-2 txt-blur-transparent uppercase font-bold"
            active-class="text-green-500">
            Familias
          </RouterLink>

          <RouterLink :to="{ name: 'glossary' }" class="text-xl  rounded-lg p-2 txt-blur-transparent uppercase font-bold"
            active-class="text-green-500 ">
            Glosario
          </RouterLink>
          <RouterLink :to="{ name: 'aboutus' }" class="text-xl  rounded-lg p-2 txt-blur-transparent uppercase font-bold"
            active-class="text-green-500">
            Acerca de
          </RouterLink>
          <RouterLink :to="{ name: 'auth' }" class="text-xl rounded-lg p-2 txt-blur-transparent uppercase font-bold bg-customGreen text-white flex items-center space-x-2">
            <font-awesome-icon :icon="['far', 'circle-user']" />
            <span>Ingresar</span>            
          </RouterLink>
        </nav>
      </div>

      <form v-if="paginaInicio" class="form-blur md:w-1/3 2xl:w-1/3 my-28 p-10 rounded-lg shadow space-y-6 bg-opacity-50 "
        @submit.prevent="handleSubmit">
        <Alerta v-if="error">
          {{ error }}
        </Alerta>
        <div class="space-y-4">
          <label class="block text-white uppercase font-bold" for="ingrediente">Buscar</label>
          <select id="categoria" class="p-3 w-full rounded-lg focus:outline-none font-bold"
            v-model="consulta.consulta.categoria" @change="consulta.consulta.vrBuscar = ''">
            <option value="">-- Seleccione --</option>
            <option>Familia</option>
            <option>Nombre Común</option>
            <option>Nombre científico</option>

          </select>
        </div>
        <!-- Familia -->
        <div v-if="consulta.consulta.categoria === 'Familia'" class="space-y-4">
          <label class="block text-white uppercase font-bold " for="parametro">Valor a buscar</label>
          <select id="familia" class="p-3 w-full rounded-lg focus:outline-none font-bold"
            v-model="consulta.consulta.vrBuscar">
            <option value="">-- Seleccione --</option>
            <option v-for="familia in familias.familias" :key="familia.familia"> {{ familia.familia }}</option>
          </select>
        </div>

        <!-- Especie -->
        <div v-if="consulta.consulta.categoria === 'Nombre Común'" class="space-y-4">
          <label class="block text-white uppercase font-bold " for="parametro">Valor a buscar</label>
          <select id="especie" class="text-lg p-3 w-full rounded-lg focus:outline-none font-bold"
            v-model="consulta.consulta.vrBuscar">
            <option value="">-- Seleccione --</option>
            <option v-for="especie in especies.especies" :key="especie.nom_comunes"> {{ especie.nom_comunes }}</option>
          </select>
        </div>

        <!-- nombre científico -->
        <div v-if="consulta.consulta.categoria === 'Nombre científico'" class="space-y-4">
          <label class="block text-white uppercase font-bold " for="parametro">Valor a buscar</label>
          <select id="cientifico" class="text-lg p-3 w-full rounded-lg focus:outline-none font-bold"
            v-model="consulta.consulta.vrBuscar">
            <option value="">-- Seleccione --</option>
            <option v-for="especie in especies.especies" :key="especie.nombre_cientifico"> {{ especie.nombre_cientifico }}
            </option>
          </select>
        </div>
        <div v-if="!consulta.consulta.categoria" class="space-y-4">
          <label class="block text-white uppercase font-bold " for="parametro">Valor a buscar</label>
          <select disabled id="categoria" class="text-lg p-3 w-full rounded-lg focus:outline-none font-bold">
            <option value="">-- Seleccione --</option>

          </select>
        </div>
        <input type="submit" class="btn-form-search-header cursor-pointer font-bold w-full p-2 rounded-lg uppercase"
          value="Buscar" @click="validarcampos()" />

      </form>
    </div>

  </header>
</template>

<style>
.glide {
  position: relative;
  background-size: cover;
  background-position: center;
  z-index: -999;
}

.header-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -999;
}

.header-slider .glide__slide img {
  object-fit: cover;
  width: 100%;
  height: 810px;
}

.txt-blur-transparent:hover{
  backdrop-filter: blur(10px); /* Cambia el valor según el nivel de desenfoque que desees */
  opacity: 1;
  background-color: rgba(38, 47, 33, 0.3);
}

.btn-form-search-header {
  background-color: #d3dfcc;
  color: #262f21;
}

.btn-form-search-header:hover {
  background-color: #262f21;
  color: #ecf2e8;
}

.form-blur {
  backdrop-filter: blur(10px);
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.1);
  /* border: 1px solid #ccc; */
}

.fixed-between-navbar {
  margin-left: 200px;
  margin-right: 200px;
}
</style>