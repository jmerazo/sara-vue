<script setup>
import { ref, computed, watch } from 'vue'
import { RouterView} from "vue-router";
import Header from '@/components/Header.vue';
import Footer from "./components/Footer.vue";
import Modal from './components/Modal.vue';
import ModalFamily from "./components/ModalFamily.vue";
import Spinner from './components/Spinner.vue'
import Dashboard from './views/dashboardviews/DashboardMainView.vue'
import { useAuthToken } from "./stores/auth";
import { useConsultaStore } from "./stores/consulta";
const store = useAuthToken();
const consulta = useConsultaStore();

// Observar cambios en dashboardActive
const dash = ref(store.dashboardActive);
watch(() => store.dashboardActive, (newValue) => {
  dash.value = newValue;
});
</script>

<template>
  <Dashboard v-if="dash"/>
  <Header v-if="!dash"/>
   <main v-if="!dash" class="container mx-auto mt-10" >
    <router-view v-if="!dash" />
  </main>
  <Spinner v-if="consulta.cargando"/>
  <Footer  />
  <Modal/>
  <ModalFamily/>  
</template>