<script setup>
import { RouterView } from "vue-router";

import Footer from "@/components/shared/Footer.vue";
import NavBar from "@/components/shared/NavBar.vue";
</script>


<template>
  <div>
    <NavBar />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>



<style scoped>
</style>