<script setup>
import { RouterView } from "vue-router";
import { useConsultaStore } from './stores/consulta';

const consulta = useConsultaStore()

import Header from './components/Header.vue';
import Footer from "./components/Footer.vue";
import Modal from './components/Modal.vue';
import ModalFamily from "./components/ModalFamily.vue";
import Spinner from './components/Spinner.vue'
</script>

<template>
  
  <Header/>
   <main class="container mx-auto mt-10">
    <router-view />
  </main>
  <Spinner v-if="consulta.cargando"/>
  <Footer/>
  <Modal/>
  <ModalFamily/>
</template>

<style>
#app {
  width: auto;
  height: auto;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}
</style>

