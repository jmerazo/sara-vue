<script setup>
import { RouterView } from "vue-router";
import Header from './components/Header.vue';
import Footer from "./components/Footer.vue";
import Modal from './components/Modal.vue';

</script>

<template>
  <Header/>
  <main class="container mx-auto mt-10">
    <router-view />
  </main>
  <Footer/>
  <Modal/>
</template>


