<script setup>

import { RouterView} from "vue-router";
import { useAuthTokenStore } from '@/stores/auth'
import Footer from "@/components/Footer.vue";
import ModalSpecie from '@/components/ModalSpecie.vue';
import ModalFamily from "@/components/ModalFamily.vue";

import Dashboard from '@/views/dashboardviews/home/DashboardMainView.vue'
import NavBar from "./components/NavBar.vue";
import Header from '@/components/Header.vue';
const store = useAuthTokenStore()
</script>

<template>
  <NavBar v-if="!store.authActive"/>
  <Header v-if="!store.authActive"/>
  <Dashboard v-if="store.authActive"/>
  
  
  <main v-if="!store.authActive" >
    <router-view v-if="!store.authActive" />
  </main> 

  <Footer/> 
  <ModalSpecie/>
  <ModalFamily/>

</template>

<style >
/* boton agregar */
.agregar {
  background-image: url("/icons/icon-add.png");
  padding: 0;
  margin: 0;
  height: 3rem;
  background-position: center;
  background-size: cover;
  position: fixed;
  bottom: 10%;
  right: -1px;
  z-index: 2;
  width: 4rem;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}
.agregar:hover {
  transform: scale(1.08);
}

@media (min-width: 768px) {
  .agregar {
    right: 1%;
    height: 4rem;
    overflow: hidden;
    border-radius: 50%;
  }
  .agregar::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-image: url("/icons/icon-add.png");
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    transition: transform 0.3s ease-out;
  }
  .agregar:hover::before {
    transform: scale(1.08);
  }
  .agregar:hover {
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
  }
}
/* fin boton agregar */
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