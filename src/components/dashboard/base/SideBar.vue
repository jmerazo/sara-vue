<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useAuthTokenStore } from "@/stores/auth";
import SvgIcon from "@/assets/SvgIcon.vue";

const store = useAuthTokenStore();

defineProps({
  sidebar: Boolean,
  toggleSidebar: Function,
  toggleHover: Function
});

// Leer datos del usuario desde localStorage
const userPermissions = JSON.parse(localStorage.getItem("user_permissions")) || {};

// Lista de módulos permitidos según los permisos del usuario
const allowedModules = computed(() => {
  if (!userPermissions.modules) return [];
  return userPermissions.modules.map(module => ({
    name: module.page_name,
    route: module.page_router,
    icon: module.page_icon
  }));
});
</script>

<template>
  <div class="sidebar" :class="{ show: sidebar }" @mouseover="toggleHover">
    <div class="logo__details" :class="{ show: sidebar }">
      <img src="/icons/sara.png" alt="logo" />
    </div>

    <ul class="nav__links">
      <div class="modules">
        <li v-for="module in allowedModules" :key="module.route">
          <RouterLink :to="{ name: module.route }" class="link">
            <SvgIcon :iconName="module.icon" size="25" />
            <span class="link__name">{{ module.name }}</span>
          </RouterLink>
        </li>
      </div>

      <div class="logout">
        <li>
          <a ref="#" class="link" @click="store.logout()">
            <SvgIcon iconName="logout" size="25" />
            <span class="link__name"> Salir </span>
          </a>
        </li>
      </div>
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
  justify-content: space-between;
  height: 90%;
  padding: 1rem 1rem;
  overflow: auto;
}

.sidebar .nav__links .modules {
  flex-grow: 1; /* Ocupa el espacio disponible */
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Espaciado uniforme entre los módulos */
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

.sidebar .nav__links .logout {
  padding-top: 1rem;
  border-top: 1px solid #eaeaea; /* Línea separadora opcional */
  display: flex;
  justify-content: center;
}

.sidebar .nav__links li {
  list-style: none;
}

.sidebar .nav__links .link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease-in-out;
}

.sidebar .nav__links .link:hover {
  color: var(--primary);
  background: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}
</style>