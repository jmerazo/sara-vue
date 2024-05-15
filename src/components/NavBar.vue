<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const paginaInicio = computed(() => route.name === "home");

//mostrar barra lateral
const navMovil = ref(false);
const mostrarNavMovil = () => {
  navMovil.value = !navMovil.value;
};

window.addEventListener('scroll', function() {
    
    const navigation = document.querySelector('.navegacion');
    const nav__movil = document.querySelector('.nav__movil');
    
    if (window.scrollY > 70) {
       
        navigation.classList.add('background__home');
        nav__movil.classList.add('background__home');

    } else {
        navigation.classList.remove('background__home');
        nav__movil.classList.remove('background__home');
       
    }
});
</script>

<template>
  <div>
    <!-- nav movil -->
    <div class="nav__movil">
      <div class="navegacion__logo--movil">
        <RouterLink :to="{ name: 'home' }">
          <img
            src="../assets/sara.png"
            alt="Logotipo"
            :style="{ display: navMovil ? 'none' : 'block' }"
          />
        </RouterLink>
      </div>
      <!-- boton movil  -->
      <button
        @click="mostrarNavMovil"
        id="menu__movil"
        :class="{
          pagina__inicio: paginaInicio,
          pagina__otro: !paginaInicio,
        }"
        class="menu__movil"
      >
        <font-awesome-icon v-if="!navMovil" :icon="['fas', 'bars']" />
        <font-awesome-icon v-else :icon="['fas', 'x']" />
      </button>
      <!-- fin boton movil -->
    </div>
    <!--fin nav movil -->

    <div
      class="navegacion"
      :class="{ navegacion__show: navMovil }"
      
    >
      <div class="navegacion__logo">
        <RouterLink :to="{ name: 'home' }">
          <div class="logo__container">
            <div class="logo__blur"></div>
            <img src="../assets/sara.png" alt="Logotipo" />
          </div>
        </RouterLink>
      </div>
      <!-- barra de navegacion -->
      <nav class="navegacion__barra">
        <RouterLink
          :to="{ name: 'home' }"
          class="navegacion__link"
          :class="{
            pagina__inicio: paginaInicio,
            pagina__otro: !paginaInicio,
          }"
          active-class="navegacion__link-seleccion"
        >
          Inicio
        </RouterLink>

        <RouterLink
          :to="{ name: 'especies' }"
          class="navegacion__link"
          active-class="navegacion__link-seleccion"
          :class="{
            pagina__inicio: paginaInicio,
            pagina__otro: !paginaInicio,
          }"
        >
          Especies
        </RouterLink>
        <RouterLink
          :to="{ name: 'familias' }"
          class="navegacion__link"
          :class="{
            pagina__inicio: paginaInicio,
            pagina__otro: !paginaInicio,
          }"
          active-class="navegacion__link-seleccion"
        >
          Familias
        </RouterLink>

        <RouterLink
          :to="{ name: 'glossary' }"
          class="navegacion__link"
          active-class="navegacion__link-seleccion "
          :class="{
            pagina__inicio: paginaInicio,
            pagina__otro: !paginaInicio,
          }"
        >
          Glosario
        </RouterLink>
        <a
          href="http://viveros.corpoamazonia.gov.co/"
          class="navegacion__link"
          :class="{
            pagina__inicio: paginaInicio,
            pagina__otro: !paginaInicio,
          }"
          target="_blank"
        >
          Viveros
        </a>
        <RouterLink
          :to="{ name: 'aboutus' }"
          class="navegacion__link"
          :class="{
            pagina__inicio: paginaInicio,
            pagina__otro: !paginaInicio,
          }"
          active-class="navegacion__link-seleccion"
        >
          Acerca de
        </RouterLink>
        <RouterLink
          :to="{ name: 'auth' }"
          class="navegacion__link navegacion__link--loging"
        >
          <font-awesome-icon :icon="['far', 'circle-user']" />
          <span>Ingresar</span>
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
/* nav */
.pagina__inicio {
  color: var(--blanco);
  /*color: var(--blanco);*/
}

.pagina__otro {
  color: var(--blanco);
}

.background__home {
  background: var(--navBar);
}

/* navegacion */
.navegacion {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
/*   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); */
  top: 0;
  width: 100%;
  height: 2.4rem;
  z-index: 1000;
  position: fixed;
 /*  padding: 0 0 1rem 0; */
  transition: 0.6s ease-in-out all;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
}

.navegacion__barra {
  display: flex;
  gap: 0.5rem;
  align-items: center; 
  padding: 0 1.5rem;
  height: 100%;
}

@media (max-width: 992px) {
  .navegacion__barra {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
  }
}

@media (max-width: 992px) {

  .navegacion {
    flex-direction: column;
    align-items: end;
    gap: 1rem;
    padding-top: 1rem;
    margin: 0;
    background: #2f3640;
    position: absolute;
    top: 0;
    width: 100%;
    left: -100%;
    height: 100%;
    transform: translateX(-100%);
    opacity: 0.9;
    justify-content: start;
    font-size: 1rem;
    z-index: 1;
    position: fixed;
  }

  .item__show {
    display: block;
  }

  .navegacion__link {
    color: var(--blanco);
  }
  .navegacion__link:first-of-type,
  .navegacion__link:last-of-type {
    margin-top: 2rem;
  }
}

@media (max-width: 992px) {
  .navegacion__show {
    transform: translateX(26%);
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
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

.navegacion__link:hover {
  backdrop-filter: blur(
    5px
  ); /* Cambia el valor según el nivel de desenfoque que desees */
  opacity: 1;
  background-color: rgba(38, 47, 33, 0.3);
  border-radius: 5px;
}
.navegacion__link--loging {
  background-color: var(--primary);
  border-radius: 5px;
  color: var(--blanco);
}
.navegacion__link--loging:hover {
  background-color: var(--primary-hover);
}
.navegacion__link-seleccion {
  color: var(--blanco);
}

.logo__container {
  height: 5rem;
  width: 5rem;
  position: relative;
  overflow: hidden; /* Mantiene todo dentro del borde circular */
  border-radius: 50%; /* Mantiene el borde circular */
  padding: 10px; /* Aumenta espacio entre el logo y el borde */
}

.logo__blur {
  content: '';
  position: absolute;
  top: 44%; /* Comienza desde la mitad hacia abajo */
  left: 0;
  right: 0;
  bottom: 0;
  /* background: rgba(0, 0, 0, 0.3); */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, transparent 50%);
  backdrop-filter: blur(3px); /* Aplica el desenfoque */
  z-index: -1; /* Coloca el efecto de desenfoque detrás del logo */
}

.navegacion__logo {
  max-width: 4rem;
  padding: 0 3rem;
  position: relative; /* Cambia a absolute si es necesario */
  top: 3.5rem; /* Ajusta este valor para que el logo desborde hacia arriba */
  z-index: 1010; /* Asegura que el logo esté sobre otros elementos */
}

/* .navegacion__logo img {
  filter: url(#blur-edge-mask);
} */

@media (min-width: 1820px) {
  .navegacion__link {
    font-size: .9rem;
  }
  .navegacion__logo {
    max-width: 4rem;
    margin-top: 0.5rem;
    padding: 1rem 0 0 6rem ;
  }
}

/* movil responsive */

.nav__movil {
  display: none;
  padding: 1rem 0;
}

.menu__movil {
  font-size: 2rem;
  padding: 0 1.5rem;
  background: none;
}

.menu__movil:hover {
  color: var(--primary-hover);

}

.navegacion__logo--movil {
  padding: 0 2rem;
}

@media (max-width: 992px) {
  .nav__movil {
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  .navegacion__logo--movil {
    width: 4rem;
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {
  .navegacion__logo--movil {
    max-width: 3.2rem;
    padding: 0 rem;
  }
}
</style>