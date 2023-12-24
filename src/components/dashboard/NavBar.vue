<script setup>
import { RouterLink } from "vue-router";
import { useAuthToken } from "@/stores/auth";
import { ref, onMounted, onBeforeUnmount } from 'vue';

const storeAuth = useAuthToken();

const isFixed = ref(false);

const handleScroll = () => {
  isFixed.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <nav class="main-header navbar navbar-white navegacion" :class="{ 'fixed-top': isFixed }" ref="barraNavegacion">

      <div class="logo mx-3">
        <img src="/icons/sara.png" alt="" />
      </div>
      <div class="menu mx-4">
        <a data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </div>
   
  </nav>
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
#barra-navegacion.navegacion{
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: var(--blanco); /* Puedes ajustar el color de fondo según tus preferencias */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Agregar una sombra opcional */
  display: flex;
  justify-content: space-between;
  padding: 10px 20px; 
}
#barra-navegacion.navegacion.fixed-top {
  position: fixed;
}
.logo{
  width: 4rem;
}
.menu a{
  color: var(--gris);
  font-size: 2rem;
  transition: color .3s ease;
}
.menu a:hover{
  color: var(--primary);
}
</style>