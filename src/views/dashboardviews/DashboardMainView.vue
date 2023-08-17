<script setup>
//components
import SideBar from "@/components/dashboard/SideBar.vue";
import NavBar from "@/components/dashboard/NavBar.vue";
//librery
import "@/adminlte/plugins/jquery/jquery.min.js";
import "@/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js";
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
      <NavBar/>
      <!-- /.navbar -->

      <!-- BarraLateral -->
      <SideBar />
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