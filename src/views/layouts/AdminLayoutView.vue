<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router"
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
      <div
          style="display: flex; justify-content: center; align-items: center; align-content: center; gap: 2rem; padding: 0 3rem;">

          <div class="nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11ZM18.2837 14.7028C21.0644 15.9561 23 18.752 23 22H21C21 19.564 19.5483 17.4671 17.4628 16.5271L18.2837 14.7028ZM17.5962 3.41321C19.5944 4.23703 21 6.20361 21 8.5C21 11.3702 18.8042 13.7252 16 13.9776V11.9646C17.6967 11.7222 19 10.264 19 8.5C19 7.11935 18.2016 5.92603 17.041 5.35635L17.5962 3.41321Z"></path></svg>
            <RouterLink :to="{ name: 'users' }">
              Usuarios
            </RouterLink>
          </div>

          <div class="nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L5.24077 18.9999C5.0786 19.912 4.99805 20.907 4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3ZM12.998 5C8.57977 5 4.99805 8.58172 4.99805 13C4.99805 13.3624 5.00125 13.7111 5.00759 14.0459C6.26198 12.0684 8.09902 10.5048 10.5019 9.13176L11.4942 10.8682C8.6393 12.4996 6.74554 14.3535 5.77329 16.9998L8.99805 17C15.0132 17 18.8692 13.0269 18.9949 5.38766C17.6229 5.52113 16.3481 5.436 14.7754 5.20009C13.6243 5.02742 13.3988 5 12.998 5Z">
              </path>
            </svg>
            <RouterLink :to="{ name: 'species' }">
              Especies
            </RouterLink>
          </div>

          <div class="nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6.14286V18.9669L9.06476 16.7963L15.0648 19.7963L20 17.6812V4.85714L21.303 4.2987C21.5569 4.18992 21.8508 4.30749 21.9596 4.56131C21.9862 4.62355 22 4.69056 22 4.75827V19L15 22L9 19L2.69696 21.7013C2.44314 21.8101 2.14921 21.6925 2.04043 21.4387C2.01375 21.3765 2 21.3094 2 21.2417V7L4 6.14286ZM16.2426 11.2426L12 15.4853L7.75736 11.2426C5.41421 8.89949 5.41421 5.10051 7.75736 2.75736C10.1005 0.414214 13.8995 0.414214 16.2426 2.75736C18.5858 5.10051 18.5858 8.89949 16.2426 11.2426ZM12 12.6569L14.8284 9.82843C16.3905 8.26633 16.3905 5.73367 14.8284 4.17157C13.2663 2.60948 10.7337 2.60948 9.17157 4.17157C7.60948 5.73367 7.60948 8.26633 9.17157 9.82843L12 12.6569Z"></path></svg>
            <RouterLink :to="{ name: 'property' }">
              Predios
            </RouterLink>
          </div>

          <div class="nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z"></path></svg>
            <RouterLink :to="{ name: 'nurseries_adm' }">
              Viveros
            </RouterLink>
          </div>

          <div class="nav__link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 8V20H19V8H5ZM5 6H19V4H5V6ZM20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM7 10H11V14H7V10ZM7 16H17V18H7V16ZM13 11H17V13H13V11Z"></path></svg>
            <RouterLink :to="{ name: 'pages' }">
              Paginas
            </RouterLink>
          </div>

        </div>
      <div class="home__content" @click="toggleSidebar">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
      </div>


    </section>

    

    <main :class="{ show: sidebar }">
      <div class="menu__admin">
        <h1 class="menu__admin--title">Administración SARA</h1>
      </div>
      <RouterView />
    </main>

  </div>
</template>

<style scoped>
.layout__container {
  display: flex;
}


.nav__link {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav__link svg{
  width: 1.5rem;
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
  padding: 0 50px;
  z-index: 1000;
  box-shadow: 0px 17px 50px 0px rgba(0, 0, 0, 0.1);
  transition: all .3s ease-in-out;
}

.home__panel.show {
  width: calc(100% - 150px);
  padding: 0 50px 0 0;
}

.home__content {
  display: flex;
}

.home__content svg {
  width: 2rem;
  cursor: pointer;
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

.menu__admin {
  width: 50%;
  margin: 0 auto;
  margin-top: 5rem;
  border-radius: 5px;
  padding: 1rem;
}

.menu__admin--card {
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: ease-in-out 0.3s all;
  box-shadow: 0px 17px 50px 0px rgba(0, 0, 0, 0.1);
}

.menu__admin--title {
  color: var(--primary);
  font-weight: 700;
  font-size: 2rem;
  text-align: center;
}

.card__link {
  text-decoration: none;
  color: var(--primary);
  font-weight: 700;
  font-size: 1rem;
  transition: ease-in-out 0.3s all;
  border: 1px solid var(--primary);
  padding: 0.3rem;
  border-radius: 1rem;
}

.card__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.card__content svg {
  width: 2.5rem;
}
</style>