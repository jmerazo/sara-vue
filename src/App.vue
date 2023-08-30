<script setup>
import { ref,onMounted } from 'vue'
import { RouterView} from "vue-router";
import { useConsultaStore } from './stores/consulta';
import {useAuthToken} from '@/stores/auth'
import Header from '@/components/Header.vue';
import Footer from "./components/Footer.vue";
import Modal from './components/Modal.vue';
import ModalFamily from "./components/ModalFamily.vue";
import Spinner from '@/components/Spinner.vue'
import Dashboard from './views/dashboardviews/DashboardMainView.vue'

const store = useAuthToken()
const consulta = useConsultaStore()

</script>
<template>
  <Dashboard v-if="store.authActive"/>
  <Header v-if="!store.authActive"/>
   <main v-if="!store.authActive" class="container mx-auto mt-10" >
    <router-view v-if="!store.authActive" />
  </main>
  <Spinner v-if="consulta.cargando"/>
  <Footer/>
  <Modal/>
  <ModalFamily/>
  
</template>


