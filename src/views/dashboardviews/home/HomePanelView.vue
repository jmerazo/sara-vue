<script setup>

import { onMounted } from "vue";
import { useChartsStore } from "@/stores/dashboard/charts";


import HomeCard from "@/components/dashboard/cards/HomeCard.vue";
import PresenceMap from "@/components/dashboard/base/PresenceMap.vue";

//Spinner
import LoadingData from "@/components/shared/LoadingData.vue";



//monitoreos
import totalDepartmentMonitoring from "@/components/dashboard/charts/totalDepartmentMonitoring.vue";
import totalMunicipalMonitoring from "@/components/dashboard/charts/totalMunicipalMonitoring.vue";
import usersMonitoring from '@/components/dashboard/charts/usersMonitoring.vue'

import { useAuthTokenStore } from '@/stores/auth';
import { watch } from 'vue';

const authStore = useAuthTokenStore();

watch(() => authStore.userPermissions, (newPermissions) => {
  if (newPermissions) {
    console.log('');
    // Realizar acciones en base a los nuevos permisos
  }
}, { immediate: true });

const storedPermissions = JSON.parse(localStorage.getItem('user_permissions') || '{}');


const chartStore = useChartsStore();


//para asegurar que el panel cargue correctamente se recarga la página
// una vez entre al dashborad por primera vez
// cuando el usuario cierra sesion se elimina los datos de localStorage
onMounted(() => {
  const hasReloaded = localStorage.getItem("hasReloaded");
  if (!hasReloaded) {
    localStorage.setItem("hasReloaded", "true");
    //window.location.reload();
  }
});
</script>

<template>
  <div class="home">
    <div class="encabezado">
      <div class="encabezado__contenido">
        <h1 class="home__heading">
          Bienvenidos a <span class="sara"> Sara </span>
        </h1>
        <p class="home__texto">
          Guiados por valores, nos comprometemos con la naturaleza, colaboramos
          con la comunidad y fomentamos la innovación sostenible.
        </p>
      </div>
    </div>
    <p class="texto__bienvenida contenedor">
      En nuestro incansable esfuerzo por contribuir a un mundo sostenible, hemos
      llevado a cabo extensos trabajos de campo. Bienvenidos a explorar los
      notables resultados!
    </p>
    <div class="contenedor">
      <main class="contenido__grid">
        <section class="columna__izquierda">
          <!-- graficos -->
          <div class="graficos">
            <div class="grafico">
              <usersMonitoring/>
              <totalDepartmentMonitoring v-if="chartStore.departamentos.length > 0" />
              <totalMunicipalMonitoring v-if="chartStore.municipios.length > 0" />
              <LoadingData v-else />
            </div>
          </div>
          <!-- fin graficos modificados -->
        </section>
        <section class="columna__derecha">
          <!-- card -->
          <div class="card__generales">
            <HomeCard />
          </div>
          <!-- fin card -->
          <!-- mapa -->
          <div class="mapa__territorial">
            <PresenceMap />
          </div>
          <!-- fin mapa -->
        </section>
      </main>
    </div>
  </div>

</template>

<style scoped>
.calendario {
  width: 100%;
}

.contenedor {
  padding: 0;
}

.encabezado {
  background-image: url("/img/home_sara.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 0 2rem 0;
  height: 35rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  color: var(--blanco);
}

.encabezado__contenido {
  grid-row: 1/3;
  grid-column: 1/3;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.4);
  border-radius: 6px 0 0 0;
  background: rgba(0, 0, 0, 0.5);
}

@media (min-width: 768px) {
  .encabezado__contenido {
    grid-row: 2/3;
    grid-column: 2/2;   
  }
}

.home__heading {
  font-size: 1.5rem;
  margin: 2rem;
  color: var(--blanco);
}

.home__texto {
  color: var(--blanco);
  padding: 1rem;
  text-align: left;
}

.texto__bienvenida {
  font-size: 1rem;
  text-align: center;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.4);
  padding: 1rem;
  margin-bottom: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.mapa__territorial {
  background: rgba(0, 0, 0, 0.1);
}

.contenido__grid {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

@media (min-width: 1200px) {
  .texto__bienvenida{
    margin-bottom: 5rem;
  }
  .contenido__grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}

.graficos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grafico {
  background-color: var(--blanco);
  border-radius: 10px;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.home {
  margin-bottom: 2rem;
}
</style>