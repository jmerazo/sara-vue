<script setup>
import { ref } from 'vue'
import { RouterView} from "vue-router";
import { useConsultaStore } from './stores/consulta';
import Header from '@/components/Header.vue';
import Footer from "./components/Footer.vue";
import Modal from './components/Modal.vue';
import ModalFamily from "./components/ModalFamily.vue";
import Spinner from './components/Spinner.vue'
import Dashboard from './views/dashboardviews/DashboardMainView.vue'
const consulta = useConsultaStore()

const panel = ref(false)
</script>

<template>
  <Dashboard v-if="panel"/>
  <Header v-if="!panel"/>
   <main v-if="!panel" class="container mx-auto mt-10" >
    <router-view v-if="!panel" />
  </main>
  <Spinner v-if="consulta.cargando"/>
  <Footer  />
  <Modal/>
  <ModalFamily/>
  
</template>


