<script setup>
import BarraLateral from "../components/BarraLateral.vue";

import "@/adminlte/plugins/jquery/jquery.min.js";
import "@/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js";
import "@/adminlte/plugins/filterizr/jquery.filterizr.min.js";
import "@/adminlte/plugins/ekko-lightbox/ekko-lightbox.min.js";
import "@/adminlte/dist/js/adminlte.min.js";


  $(document).on("click", '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox({
      alwaysShowClose: true,
    });
  });


import { RouterView } from "vue-router";
</script>
<template >
  <body class="sidebar-mini">
    <div class="wrapper">
      <!-- Navbar -->
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
          <li>
            <a class="btn btn-success" href="#"
              ><i class="fa fa-home"></i> Inicio</a
            >
          </li>
          <li class="mx-3">
            <a class="btn btn-danger" href="#"
              ><i class="fa fa-user"></i> Cerrar sesión</a
            >
          </li>
        </ul>
      </nav>
      <!-- /.navbar -->

      <!-- BarraLateral -->
      <BarraLateral />
      <!-- contenido -->

      <div class="content-wrapper">
        <!-- Main content -->
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <router-view />
              </div>
              
            </div>
          </div>
          <!-- /.container-fluid -->
        </section>
        <!-- /.content -->
      </div>
    </div>
  </body>
</template>



<style scoped>
/* Add your scoped styles here */
@import url("@/adminlte/dist/css/adminlte.min.css");
@import url("@/adminlte/plugins/fontawesome-free/css/all.min.css");
@import url("@/adminlte/plugins/ekko-lightbox/ekko-lightbox.css");
</style>