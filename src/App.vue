<script setup>

import { RouterView} from "vue-router";
import { useAuthTokenStore } from '@/stores/auth'
import Footer from "@/components/Footer.vue";
import Modal from '@/components/Modal.vue';
import ModalFamily from "@/components/ModalFamily.vue";

import ModalUserUpdate from "@/components/dashboard/ModalUserUpdate.vue";
import ModalCandidate from '@/components/dashboard/ModalCandidates.vue'
import ModalInfoCandidate from '@/components/dashboard/ModalInfoCandidate.vue';
import Dashboard from '@/views/dashboardviews/DashboardMainView.vue'
import Header from '@/components/Header.vue';
const store = useAuthTokenStore()
</script>

<template>

  <Dashboard v-if="store.authActive"/>
  <Header v-if="!store.authActive"/>
  <main v-if="!store.authActive" >
    <router-view v-if="!store.authActive" />
  </main> 
 
  <Footer/> 
  <Modal/>
  <ModalFamily/>
  <ModalUserUpdate/>
  <ModalCandidate/>
  <ModalInfoCandidate/>
  
</template>

<style >

.texto__sara {
  color: var(--primary);
}
/* buscador */
.header__label {
  font-weight: 700;
  font-size: .8rem;
  color: var(--gris);
}

@media (min-width: 768px) {
  .header__label {
    font-size: 1rem;
  }
}

.header__buscador {
  border: 1px solid var(--gris);
  padding: 0.5rem;
  border-radius: 8px;
  width: 100%;
  font-size: .8rem;
}

@media (min-width: 768px) {
  .header__buscador {
    border: 2px solid var(--gris);
    padding: .5rem;
    width: 40%;
  }
}
@media (min-width: 992px) {
  .header__buscador {
    width: 25%;
  }
}
/* Paginador */
.paginador {
  margin: 2rem 0 0 0;
}
.paginador__botones {
  display: flex;
  justify-content: center;
}
.paginador__boton {
  font-weight: 700;
  font-size: 1rem;
  padding: 0.3rem;
}
@media (min-width: 768px) {
  .paginador__boton {
    font-size: 1.3rem;
  }
}
.paginador__boton-actual {
  background-color: rgb(183, 211, 183);
}
.paginador__boton--anterior {
  border-bottom-left-radius: 10px;
  color: var(--blanco);
  background-color: var(--primary);
}
.paginador__boton--siguiente {
  border-bottom-right-radius: 10px;
  color: var(--blanco);
  background-color: var(--primary);
}

/* validacion */
.validacion__contenido {
  margin-bottom: 8rem;
}
.validacion__heading {
  font-size: 1.5rem;
}
</style>