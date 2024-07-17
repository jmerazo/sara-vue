<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthTokenStore } from "@/stores/auth";

import Sidebar from "@/components/dashboard/base/SideBar.vue";

let sidebar = ref(false);

function toggleSidebar() {
  sidebar.value = !sidebar.value;
}
function toggleHover() {
  sidebar.value = false
}
</script>

<template>
  <div class="layout__container">
    <Sidebar :sidebar="sidebar" :toggleSidebar="toggleSidebar" :toggleHover="toggleHover" />


    <section class="home__panel" :class="{ show: sidebar }">
      <div class="home__content" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
      </div>
    </section>

    <main :class="{ show: sidebar }">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout__container {
  display: flex;
}


main {
  position: relative;
  margin-top: 4rem;
  transition: all .3s ease-in-out;
}

@media (min-width: 768px) {
  main {
    margin-left: 260px;
    width: calc(100% - 260px);
  }
}

main.show {
  width: 100%;
  margin: 0 auto;
  margin-top: 4rem;
}

@media (min-width: 768px) {
  main.show {
    margin-left: 100px;
    width: calc(100% - 100px);
  }
}

.home__panel {
  position: fixed;
  background: var(--blanco);
  right: 0;
  top: 0;
  width: calc(100% - 350px);
  display: flex;
  justify-content: flex-end;
  height: 60px;
  padding: 0 0 0 100px;
  z-index: 1000;
  box-shadow: 0px 17px 50px 0px rgba(0, 0, 0, 0.1);
  transition: all .3s ease-in-out;
}

@media (min-width: 768px) {
  .home__panel {
    width: calc(100% - 350px);
    padding: 0 50px;
  }
}

.home__panel.show {
  width: 100%;
  padding: 0 10px 0 0;
}

@media (min-width: 768px) {
  .home__panel.show {
    width: calc(100% - 150px);
    padding: 0 50px 0 0;
  }
}

.home__content {
  display: flex;
}

.home__content svg {
  width: 2rem;
  cursor: pointer;
}
</style>
