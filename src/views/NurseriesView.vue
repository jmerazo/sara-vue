<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useNurseriesStore } from "../stores/nurseries";
import { computed, ref, onMounted } from "vue";
import { descargarExcel, descargarPdf, obtenerFecha, descargarPdfs } from "@/helpers";

const nurseries = useNurseriesStore();
const valueSerached = ref("");
const isSearching = computed(() => valueSerached.value !== "");
//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  especies.quitarFiltroEspecie();
  next();
});

onMounted(async () =>{
  await nurseries.nurserieData();
})
</script>

<template>
  <div>
    <header class="header__especies">
      <div class="header__contenido">
        <div class="header_formulario">
          <h1 class="especies__heading">Listado de viveros</h1>

          <div class="formulario">
            <input
              class="formulario__input"
              type="text"
              placeholder="Escríbe un término de búsqueda"
              v-model="valueSerached"
              @input="especies.buscarTermino($event.target.value)"
            />
            <div class="formulario__icono">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
          <p class="formulario__resultados" v-if="isSearching">
            {{ especies.displayedEspecies.length }}
            {{
              especies.displayedEspecies.length === 1
                ? "resultado encontrado"
                : "resultados encontrados"
            }}
            para {{ valueSerached }}
          </p>
          <p class="formulario__resultados" v-else> Buscar por nombre vivero, nombre común o nombre científico</p>
        </div>
      </div>
    </header>

    <div>
      <div class="card">
      <article
        class="card__contenido"
        :style="
            { backgroundImage: 'url(' + getFullImageUrl(especie.img_general) + ')' }
        "
      >
        <!-- <div class="card__data">
          <h2 class="card__titulo">{{ nurseries.nurseriesData.nombre_vivero }}</h2>
          <span class="card__descripcion"
            >{{ nurseries.nurseriesData.email }}
            {{ nurseries.nurseriesData.direccion }}</span
          >
          <span class="card__descripcion">familia: {{ especie.familia }}</span>
          <button
            class="card__boton animacion"
            type="button"
            @click="especies.seleccionarEspecie(especie.cod_especie)"
          >
           <span> Ver Especie</span>
          </button>
        </div> -->
      </article>
    </div>
    </div>
  </div>    
</template>

<style scoped>
.especies__heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--blanco);
  text-transform: uppercase;
}

.header__especies {
  background-image: url(https://images.pexels.com/photos/142497/pexels-photo-142497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
  height: 40rem;
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.header__contenido {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.header_formulario {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .header_formulario {
    width: 80%;
    margin-top: 11rem;
  }
}

.formulario {
  padding: 0.3rem;
  display: flex;
  gap: 0.2rem;
  justify-content: baseline;
  background: var(--blanco);
  margin: 0 auto;
  border-radius: 1.2rem;
  width: 80%;
}

.formulario__input {
  padding: 0.5rem;
  width: 100%;
  border-radius: 1rem;
  font-size: 0.95rem;
}
.formulario__icono {
  width: 2rem;
  color: var(--gris);
  display: flex;
}
.formulario__resultados {
  text-align: center;
  max-width: 80%;
  margin: 0.2rem auto;
}
@media (min-width: 768px) {
  .formulario {
    width: 60%;
  }
  .formulario__input {
    padding: 0.8rem;
    border-radius: 1rem;
    font-size: 1rem;
  }
  .formulario__icono {
    width: 2rem;
    color: var(--gris);
    display: flex;
  }
  .formulario__resultados {
    text-align: center;
    max-width: 80%;
    margin: 1rem auto;
  }
}
</style>