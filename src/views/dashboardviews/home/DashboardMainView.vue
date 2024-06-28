<script setup>
//components
import SideBar from "@/components/dashboard/base/SideBar.vue";
import NavBar from "@/components/dashboard/base/NavBar.vue";
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
        <!-- <section class="content">
          <router-view />
        </section> -->
    </div>
  </body>
</template>

