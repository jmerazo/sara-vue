<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useAuthTokenStore } from "@/stores/auth";
const store = useAuthTokenStore();
defineProps({
  sidebar: Boolean,
  toggleSidebar: Function,
  toggleHover: Function
})

</script>

<template>
  <div class="sidebar" :class="{ show: sidebar }" @mouseover="toggleHover">
    <div class="logo__details" :class="{ show: sidebar }">
      <img src="/icons/sara.png" alt="logo" />
    </div>

    <ul class="nav__links">
      <li>
        <RouterLink :to="{ name: 'home-panel' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM13 19H18V9.15745L12 3.7029L6 9.15745V19H11V13H13V19Z">
            </path>
          </svg>
          <span class="link__name"> Inicio</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'panel-especies' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L5.24077 18.9999C5.0786 19.912 4.99805 20.907 4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3ZM12.998 5C8.57977 5 4.99805 8.58172 4.99805 13C4.99805 13.3624 5.00125 13.7111 5.00759 14.0459C6.26198 12.0684 8.09902 10.5048 10.5019 9.13176L11.4942 10.8682C8.6393 12.4996 6.74554 14.3535 5.77329 16.9998L8.99805 17C15.0132 17 18.8692 13.0269 18.9949 5.38766C17.6229 5.52113 16.3481 5.436 14.7754 5.20009C13.6243 5.02742 13.3988 5 12.998 5Z">
            </path>
          </svg>
          <span class="link__name"> Especies</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'panel-familias' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M5.99805 3C9.48787 3 12.3812 5.55379 12.9112 8.8945C14.0863 7.72389 15.7076 7 17.498 7H21.998V9.5C21.998 13.0899 19.0879 16 15.498 16H12.998V21H10.998V13H8.99805C5.13205 13 1.99805 9.86599 1.99805 6V3H5.99805ZM19.998 9H17.498C15.0128 9 12.998 11.0147 12.998 13.5V14H15.498C17.9833 14 19.998 11.9853 19.998 9.5V9ZM5.99805 5H3.99805V6C3.99805 8.76142 6.23662 11 8.99805 11H10.998V10C10.998 7.23858 8.75947 5 5.99805 5Z">
            </path>
          </svg>
          <span class="link__name"> Familias</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'assessment' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M16 16C17.6569 16 19 17.3431 19 19C19 20.6569 17.6569 22 16 22C14.3431 22 13 20.6569 13 19C13 17.3431 14.3431 16 16 16ZM6 12C8.20914 12 10 13.7909 10 16C10 18.2091 8.20914 20 6 20C3.79086 20 2 18.2091 2 16C2 13.7909 3.79086 12 6 12ZM16 18C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20C16.5523 20 17 19.5523 17 19C17 18.4477 16.5523 18 16 18ZM6 14C4.89543 14 4 14.8954 4 16C4 17.1046 4.89543 18 6 18C7.10457 18 8 17.1046 8 16C8 14.8954 7.10457 14 6 14ZM14.5 2C17.5376 2 20 4.46243 20 7.5C20 10.5376 17.5376 13 14.5 13C11.4624 13 9 10.5376 9 7.5C9 4.46243 11.4624 2 14.5 2ZM14.5 4C12.567 4 11 5.567 11 7.5C11 9.433 12.567 11 14.5 11C16.433 11 18 9.433 18 7.5C18 5.567 16.433 4 14.5 4Z">
            </path>
          </svg>
          <span class="link__name"> Evaluaciones</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'monitoring_data' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M7 3V1H9V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V9H20V5H17V7H15V5H9V7H7V5H4V19H10V21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7ZM17 12C14.7909 12 13 13.7909 13 16C13 18.2091 14.7909 20 17 20C19.2091 20 21 18.2091 21 16C21 13.7909 19.2091 12 17 12ZM11 16C11 12.6863 13.6863 10 17 10C20.3137 10 23 12.6863 23 16C23 19.3137 20.3137 22 17 22C13.6863 22 11 19.3137 11 16ZM16 13V16.4142L18.2929 18.7071L19.7071 17.2929L18 15.5858V13H16Z">
            </path>
          </svg>
          <span class="link__name"> Monitoreos</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'samples_data' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M15.9994 2V4H14.9994V7.24291C14.9994 8.40051 15.2506 9.54432 15.7357 10.5954L20.017 19.8714C20.3641 20.6236 20.0358 21.5148 19.2836 21.8619C19.0865 21.9529 18.8721 22 18.655 22H5.34375C4.51532 22 3.84375 21.3284 3.84375 20.5C3.84375 20.2829 3.89085 20.0685 3.98181 19.8714L8.26306 10.5954C8.74816 9.54432 8.99939 8.40051 8.99939 7.24291V4H7.99939V2H15.9994ZM13.3873 10.0012H10.6115C10.5072 10.3644 10.3823 10.7221 10.2371 11.0724L10.079 11.4335L6.12439 20H17.8734L13.9198 11.4335C13.7054 10.9691 13.5276 10.4902 13.3873 10.0012ZM10.9994 7.24291C10.9994 7.49626 10.9898 7.7491 10.9706 8.00087H13.0282C13.0189 7.87982 13.0119 7.75852 13.0072 7.63704L12.9994 7.24291V4H10.9994V7.24291Z">
            </path>
          </svg>
          <span class="link__name"> Muestras</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'list-species' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M5 12.5C5 12.8134 5.46101 13.3584 6.53047 13.8931C7.91405 14.5849 9.87677 15 12 15C14.1232 15 16.0859 14.5849 17.4695 13.8931C18.539 13.3584 19 12.8134 19 12.5V10.3287C17.35 11.3482 14.8273 12 12 12C9.17273 12 6.64996 11.3482 5 10.3287V12.5ZM19 15.3287C17.35 16.3482 14.8273 17 12 17C9.17273 17 6.64996 16.3482 5 15.3287V17.5C5 17.8134 5.46101 18.3584 6.53047 18.8931C7.91405 19.5849 9.87677 20 12 20C14.1232 20 16.0859 19.5849 17.4695 18.8931C18.539 18.3584 19 17.8134 19 17.5V15.3287ZM3 17.5V7.5C3 5.01472 7.02944 3 12 3C16.9706 3 21 5.01472 21 7.5V17.5C21 19.9853 16.9706 22 12 22C7.02944 22 3 19.9853 3 17.5ZM12 10C14.1232 10 16.0859 9.58492 17.4695 8.89313C18.539 8.3584 19 7.81342 19 7.5C19 7.18658 18.539 6.6416 17.4695 6.10687C16.0859 5.41508 14.1232 5 12 5C9.87677 5 7.91405 5.41508 6.53047 6.10687C5.46101 6.6416 5 7.18658 5 7.5C5 7.81342 5.46101 8.3584 6.53047 8.89313C7.91405 9.58492 9.87677 10 12 10Z">
            </path>
          </svg>
          <span class="link__name"> Datos Especies</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'species-data' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3V7H3V3H12ZM16 17V21H3V17H16ZM22 10V14H3V10H22Z"></path>
          </svg>
          <span class="link__name"> Contadores</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'map-general' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995L16.9497 15.9497ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z">
            </path>
          </svg>
          <span class="link__name"> Mapa</span>
        </RouterLink>
      </li>

      <li>
        <RouterLink :to="{ name: 'admin' }" class="link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M5.32943 3.27152C6.56252 2.83314 7.9923 3.10743 8.97927 4.0944C10.1002 5.21531 10.3019 6.90735 9.5843 8.23378L20.293 18.9436L18.8788 20.3579L8.16982 9.64869C6.84325 10.3668 5.15069 10.1653 4.02952 9.04415C3.04227 8.0569 2.7681 6.62659 3.20701 5.39326L5.44373 7.62994C6.02952 8.21572 6.97927 8.21572 7.56505 7.62994C8.15084 7.04415 8.15084 6.0944 7.56505 5.50862L5.32943 3.27152ZM15.6968 5.15506L18.8788 3.38729L20.293 4.80151L18.5252 7.98349L16.7574 8.33704L14.6361 10.4584L13.2219 9.04415L15.3432 6.92283L15.6968 5.15506ZM8.97927 13.2868L10.3935 14.701L5.09018 20.0043C4.69966 20.3948 4.06649 20.3948 3.67597 20.0043C3.31334 19.6417 3.28744 19.0698 3.59826 18.6773L3.67597 18.5901L8.97927 13.2868Z">
            </path>
          </svg>
          <span class="link__name"> Admin</span>
        </RouterLink>
      </li>

      <li>
        <a ref="#" class="link" @click="store.logout()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z">
            </path>
          </svg>
          <span class="link__name"> Salir </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.logo__details img {
  width: 4rem;
  margin: 1rem 2rem;
  transition: all .3s ease-in-out;
}

.logo__details.show img {
  transition: all .3s ease-in-out;
  margin: 1rem;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  box-shadow: 17px 0px 15px -3px rgba(0, 0, 0, 0.1);
  background: var(--blanco);
  transition: all .3s ease-in-out;
  z-index: 1000;
}

.sidebar.show {
  left: -250px;
  transition: all .3s ease-in-out;
}

@media (min-width: 768px) {
  .sidebar.show {
    left: 0;
    width: 100px;
    transition: all .3s ease-in-out;
  }
}

.sidebar .nav__links .link__name {
  font-size: 1.2rem;
  transition: all .3s ease-in-out;
}

.sidebar.show .link__name {
  font-size: 0;
}

.sidebar .nav__links {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 90%;
  overflow: auto;
}

.sidebar .nav__links::-webkit-scrollbar {
  display: none;
}

.sidebar .nav__links li {
  position: relative;
  margin-left: -.5rem;
}

.nav__links .link:hover {
  transition: all .2s ease;
}

.nav__links .link:hover {
  color: var(--primary);
  transform: scale(1.015);
}

.nav__links .link {
  display: flex;
  gap: 1rem;
}

.nav__links .link svg {
  width: 1.5rem;
}

.link__name {
  display: block;
}
</style>