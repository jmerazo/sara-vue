<script setup>
import { onMounted, ref, computed, watch } from "vue";
import RenderGeo from "@/components/RenderGeoMap.vue";
import { useGeoCandidateTrees } from "@/stores/candidate";
import { useEspeciesStore } from "@/stores/species";
import { locatesColombia } from "@/stores/locates";

const locates = locatesColombia();
const geoStore = useGeoCandidateTrees();
const especies = useEspeciesStore();

const renderGeoMapRef = ref(null);
const codeFind = ref("");
const department = ref({ code: "", name: "" });
const city = ref("");
const source = ref("")

onMounted(async () => {
  await geoStore.fetchData();
});

watch(source, (newSource) => {
  if (newSource === 'gbif') {
    department.value = { code: "", name: "" };
    city.value = "";
  }
});

function callOnlyPerimeter() {
  if (renderGeoMapRef.value && renderGeoMapRef.value.onlyPerimeter) {
    renderGeoMapRef.value.onlyPerimeter();
  }
}

const filterGeoData = () => {
  geoStore.filterGeo(department.value.name, city.value, codeFind.value, source.value);
  geoStore.calculatePerimeterCoordinates(
    department.value.name,
    city.value,
    codeFind.value
  );
};

const filteredCities = computed(() => {
  if (department.value.code) {
    const filtered = locates.cities.filter(
      (city) => city.department_id === department.value.code
    );
    return filtered;
  }
  return [];
});

function delParameters() {
  codeFind.value = "";
  department.value = { code: "", name: "" };
  city.value = "";
}

function execDeleteParameter() {
  source.value = "";
  delParameters();
  geoStore.deleteFilterGeo();
}
</script>

<template>
  <div class="contenedor">
    <h1 class="reporte__heading">
      Mapa general de especies forestales
    </h1>
    <hr>
    <div class="mapa__grid">
      <div class="mapaOpciones">
        <fieldset class="menu">
          <legend class="menu__titulo">Filtrar</legend>
          <!-- Data source -->
          <select
            class="filtro__select"
            id="dataSource"
            v-model="source"
            @change="filterGeoData"
          >
            <option value="" disabled>
              Seleccione una fuente de datos...
            </option>
            <option value="gbif">GBIF</option>
            <option value="original">Proyecto Semillas</option>
          </select>

          <!-- departamento -->
          <select
            v-if="source !== 'gbif'"
            class="filtro__select"
            id="department"
            v-model="department"
            @change="filterGeoData"
          >
            <option :value="{ code: '', name: '' }" disabled>
              Seleccione un departamento...
            </option>
            <option
              v-for="loc in locates.departments"
              :key="loc.id"
              :value="{ code: loc.code, name: loc.name }"
            >
              {{ loc.name }}
            </option>
          </select>

          <!-- ciudad -->
          <div v-if="filteredCities.length > 0 && source !== 'gbif'">
            <select
              class="filtro__select"
              id="city"
              v-model="city"
              @change="filterGeoData"
            >
              <option value="" disabled selected>
                Seleccione un municipio...
              </option>
              <option
                v-for="city in filteredCities"
                :key="city.id"
                :value="city.name"
              >
                {{ city.name }}
              </option>
            </select>
          </div>
          <!-- especie -->
          <select
            id="especie"
            class="filtro__select"
            @change="filterGeoData"
            v-model="codeFind"
          >
            <option value="" selected disabled>
              Seleccione una especie...
            </option>
            <option
              v-for="especie in especies.uniqueNomComunes"
              :key="especie.cod_especie"
              :value="especie.cod_especie"
            >
              {{ especie.nom_comunes + " | " + especie.nombre_cientifico }}
            </option>
          </select>
          <div class="menu__botones">
            <button
              type="submit"
              class="filtro__boton"
              @click="execDeleteParameter"
            >
              <font-awesome-icon
                :icon="['fas', 'filter-circle-xmark']"
                class="mr-2"
              />
              Eliminar filtro
            </button>
          </div>

          <!-- meun exportar -->
        </fieldset>
        <fieldset class="menu">
          <legend class="menu__titulo">Opciones</legend>
          <div class="menu__botones">
            <button
              type="submit"
              class="menu__boton"
              @click="geoStore.exportToKML(geoStore.coordinatesKML)"
            >
              <font-awesome-icon
                :icon="['fas', 'arrows-to-eye']"
                class="mr-2"
              />
              Exportar KML/KMZ
            </button>
            <button
              type="submit"
              class="menu__boton"
              @click="callOnlyPerimeter"
            >
              <font-awesome-icon :icon="['fas', 'draw-polygon']" class="mr-2" />
              Ver Perímetro
            </button>
          </div>
        </fieldset>
      </div>
      <div class="mapa" >
        <RenderGeo ref="renderGeoMapRef"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reporte__heading {
  font-size: 1rem;
  margin: 2rem 0 1rem 0;
}
@media (min-width: 768px) {
  .reporte__heading {
    font-size: 1.3rem;
    margin: 3rem 0 2rem 0;
  }
}
.mapa__grid {
  display: grid;
  margin-top: 1rem;
}

@media (min-width: 1440px) {
  .mapa__grid {
    grid-template-columns: 3fr 1fr;
    gap: 2rem;
  }
  .mapa {
    grid-row: 1/3;
  }
}
.menu {
  border: 1px solid var(--primary);
  margin-bottom: 1rem;
  border-radius: 5px;
}
.menu__titulo {
  background-color: var(--primary);
  width: 50%;
  text-align: center;
  color: var(--blanco);
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.1rem;
  font-size: 0.9rem;
  margin-bottom: 0.1rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.menu__botones {
  margin: 0.5rem 0 0 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.menu__boton,
.filtro__boton {
  background-color: var(--secondary);
  color: var(--blanco);
  padding: 0.4rem;
  border-radius: 5px;
  font-size: 0.7rem;
  transition: background-color .3s ease;
}

.menu__boton:hover,
.filtro__boton:hover{
  background-color: var(--secondary-hover);
}


.filtro__select {
  width: 100%;
  border-radius: 5px;
  font-size: .8rem;
  font-weight: 700;
  margin: 0.5rem 0;
}

@media (min-width: 1440px) {
  .mapa__grid {
    margin-top: 2rem;
  }
  .menu {
    margin-bottom: 2rem;
  }
  .menu__botones {
    margin: 1rem 0 0 0;
  }
  .menu__boton,
  .filtro__boton {
    font-size: 0.7rem;
  }
  .filtro__select {
    font-size: .9rem;
  }
}
@media (min-width: 1820px){
  .menu__boton,
  .filtro__boton {
    font-size: 0.9rem;
  }
}
</style>