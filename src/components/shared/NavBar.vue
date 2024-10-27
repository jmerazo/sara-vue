<script setup>

import { ref, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const paginaNoImage = computed(() =>
  route.name === "glossary"
  || route.name === "auth"
  || route.name === "register"
  || route.name === "nursery"
  || route.name === 'authVerify'
  || route.name === 'signUpSuccess'
);

//mostrar barra lateral
const navMovil = ref(false);
const mostrarNavMovil = () => {
  const totalScreenWidth = window.innerWidth;
  if (totalScreenWidth <= 992) {
    navMovil.value = !navMovil.value;
  }
};

//validate scroll depending of page
const isScroll = ref(false)
window.addEventListener("scroll", function () {
  isScroll.value = window.scrollY > 70
});

const colorLink = computed(() => {
  if (navMovil.value) {
    return '#fff';
  }
  if (isScroll.value) {
    return '#1a2a35';
  }
  return paginaNoImage.value ? '#1a2a35' : '#fff';
});

const backgroundNav = computed(() => {
  if (navMovil.value) {
    return '#1a2a35';
  }
  if (isScroll.value) {
    return '#fff'
  }
  return paginaNoImage.value ? '#fff' : 'none';
})

</script>

<template>
  <div>
    <!-- nav movil -->
    <div class="nav__movil">
      <div class="navegacion__logo--movil">
        <RouterLink :to="{ name: 'home' }">
          <img src="/icons/sara.png" alt="Logotipo" :style="{ display: navMovil ? 'none' : 'block' }" />
        </RouterLink>
      </div>
      <!-- boton movil  -->
      <button @click="mostrarNavMovil" id="menu__movil" class="menu__movil">
        <font-awesome-icon v-if="!navMovil" :icon="['fas', 'bars']" />
        <font-awesome-icon v-else :icon="['fas', 'x']" />
      </button>
      <!-- fin boton movil -->
    </div>
    <!--fin nav movil -->

    <div id="navegacion" class="navegacion" :class="{ navegacion__show: navMovil }"
      :style="{ background: backgroundNav }">
      <div class="navegacion__logo">
        <RouterLink :to="{ name: 'home' }">
          <img src="/icons/sara.png" alt="Logotipo" class="logo__sara" :class="{ 'logo__sara--expand': isScroll }" />
        </RouterLink>
      </div>
      <!-- barra de navegacion -->

      <nav class="navegacion__barra">
        <RouterLink :to="{ name: 'home' }" class="navegacion__enlace" :style="{ color: colorLink }"
          @click="mostrarNavMovil">
          Inicio
        </RouterLink>

        <RouterLink :to="{ name: 'especies' }" class="navegacion__enlace" :style="{ color: colorLink }"
          @click="mostrarNavMovil">
          Especies
        </RouterLink>
        <RouterLink :to="{ name: 'familias' }" class="navegacion__enlace" :style="{ color: colorLink }"
          @click="mostrarNavMovil">
          Familias
        </RouterLink>

        <RouterLink :to="{ name: 'glossary' }" class="navegacion__enlace" :style="{ color: colorLink }"
          @click="mostrarNavMovil">
          Glosario
        </RouterLink>
        <RouterLink :to="{ name: 'nurseries' }" class="navegacion__enlace" :style="{ color: colorLink }"
          @click="mostrarNavMovil">
          Viveros
        </RouterLink>
        <RouterLink :to="{ name: 'aboutus' }" class="navegacion__enlace" :style="{ color: colorLink }"
          @click="mostrarNavMovil">
          Acerca de
        </RouterLink>
        <RouterLink @click="mostrarNavMovil" :to="{ name: 'auth' }" class="navegacion__enlace--loging">
          <font-awesome-icon :icon="['far', 'circle-user']" />
          <span>Ingresar</span>
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
/* navegacion */
.navegacion {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  top: 0;
  width: 100%;
  z-index: 1000;
  position: fixed;
  padding: 0 0 1rem 0;
  transition: 0.3s ease-in-out all;
}

.navegacion__barra {
  display: flex;
  gap: 0.5rem;
  padding: 0 5rem;
}

@media (max-width: 992px) {
  .navegacion__barra {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 1rem;
  }
}

@media (max-width: 992px) {
  .navegacion {
    flex-direction: column;
    align-items: end;
    gap: 1rem;
    padding-top: 1rem;
    margin: 0;
    position: absolute;
    top: 0;
    width: 100%;
    left: -100%;
    height: 100%;
    transform: translateX(-100%);
    justify-content: start;
    font-size: 1rem;
    z-index: 1;
    position: fixed;
  }

  .item__show {
    display: block;
  }

  .navegacion__enlace:first-of-type,
  .navegacion__enlace:last-of-type {
    margin-top: 2rem;
  }
}

@media (max-width: 992px) {
  .navegacion__show {
    transform: translateX(26%);
    background: var(--gris);
    z-index: 1000;
  }

}

@media (max-width: 768px) {
  .navegacion__show {
    transform: translateX(40%);
  }
}

@media (max-width: 468px) {
  .navegacion__show {
    transform: translateX(50%);
  }
}

.navegacion__link {
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.075);
}

.navegacion__enlace {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

.navegacion__enlace:hover {
  backdrop-filter: blur(5px);
  /* Cambia el valor según el nivel de desenfoque que desees */
  opacity: 1;
  background-color: rgba(38, 47, 33, 0.3);
  border-radius: 5px;
}

.navegacion__logo {
  max-width: 4rem;
  padding: 0;
  padding: 0 7rem;
}

.logo__sara {
  max-width: 4rem;
  transition: all .3s ease-in-out;
}

@media (min-width: 768px) {
  .logo__sara {
    max-width: 7rem;
  }
}

.logo__sara--expand {
  max-width: 4rem;
}

@media (min-width: 1820px) {
  .navegacion__link {
    font-size: .9rem;
  }
}

@media (min-width: 992px) {
  .navegacion__enlace {
    font-size: 0.9rem;
  }

  .navegacion__logo {
    max-width: 4rem;
    margin-top: 0.5rem;
    padding: 1rem 0 0 6rem;
  }
}

/* movil responsive */

.nav__movil {
  display: none;
  padding: 1rem 0;
  background: var(--blanco);
}

.menu__movil {
  font-size: 2rem;
  padding: 0 1.5rem;
  background: none;
}

.menu__movil:hover {
  color: var(--primary-hover);
}

.navegacion__enlace--loging {
  background-color: var(--primary);
  border-radius: 5px;
  color: var(--blanco);
  padding: 0rem 0.3rem;
  font-weight: 700;
}


@media (max-width: 992px) {
  .nav__movil {
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: 0;
  }

}

.navegacion__logo--movil {
  max-width: 4rem;
  padding: 0 2rem;
}



.navegacion__enlace--loging:hover {
  background-color: var(--primary-hover);
}
</style>