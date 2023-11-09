<script setup>
import { RouterLink } from "vue-router";
import {useAuthToken} from "@/stores/auth"

const storeAuth = useAuthToken()

</script>
<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav mt-2">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"
          ><i class="fas fa-bars"></i
        ></a>
      </li>
      <li class="nav-item">
        <a href="#" class="brand-link">
          <img
            src="@/adminlte/img/sara.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-1"
            style="opacity: 0.8"
          />
          <h4>SARA</h4>
        </a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <RouterLink :to="{ name: 'panel' }">
        <li>
        <a class="btn btn-success" href="#"
          ><i class="fa fa-home"></i> Inicio</a
        >
      </li>
      </RouterLink>
      
      <li class="mx-3">
        <a @click="storeAuth.logout()"  class="btn btn-secondary" href="#"
          ><i class="fa fa-user"></i> Cerrar sesión</a
        >
      </li>
    </ul>
  </nav>
</template>
<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>