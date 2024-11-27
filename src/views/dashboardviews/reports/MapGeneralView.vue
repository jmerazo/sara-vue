<script setup>
import { onMounted, ref, computed, watch } from "vue";
import RenderGeo from "@/components/RenderGeoMap.vue";
import { useGeoCandidateTrees } from "@/stores/candidate";
import { useEspeciesStore } from "@/stores/species";
import { locatesColombia } from "@/stores/locates";
import { useToastStore } from '@/stores/toast';
import treeIconPath from "/icons/icon_tree_green.png";
import treeIconGBIFPath from "/icons/icon_tree_pink.png";
import treePalmIconGreenPath from "/icons/icon_tree_palm_green.png";
import treePalmIconPinkPath from "/icons/icon_tree_palm_pink.png";
import treeIconSisaPath from "/icons/icon_tree_sisa.png";
import treePalmIconSisaPath from "/icons/icon_tree_palm_sisa.png";

const locates = locatesColombia();
const geoStore = useGeoCandidateTrees();
const species = useEspeciesStore();
const toast = useToastStore()

const renderGeoMapRef = ref(null);
const codeFind = ref("");
const department = ref({ id: "", name: "" });
const city = ref("");
const source = ref("")
const currentSource = ref("");

onMounted(async () => {
  await geoStore.fetchData(); // Cargar y enriquecer los datos
  species.loadAllSpecies();
});

watch(
  () => source.value,
  (newValue) => {
    currentSource.value = newValue; // Actualiza currentSource cuando source cambie
    filterGeoData();
  }
);

watch(source, (newSource) => {
  if (newSource === 'gbif') {
    department.value = { id: "", name: "" };
    city.value = "";
  }
});

function callOnlyPerimeter() {
  if (!source.value || !department.value.id) {
    toast.activateToast('Seleccione una fuente de datos y una localidad', 'danger');
    return
  }
  if (renderGeoMapRef.value && renderGeoMapRef.value.onlyPerimeter) {
    renderGeoMapRef.value.onlyPerimeter();
  }
}

const filterGeoData = () => {
  geoStore.filterGeo(department.value.id, city.value, codeFind.value, source.value);
  geoStore.calculatePerimeterCoordinates(
    department.value.id,
    city.value,
    codeFind.value
  );
};

const filteredCities = computed(() => {
  if (department.value.id) {
    const filtered = locates.cities.filter(
      (city) => city.department === department.value.id
    );
    return filtered;
  }
  return [];
});

function delParameters() {
  codeFind.value = "";
  department.value = { id: "", name: "" };
  city.value = "";
  source.value = "";
}

function execDeleteParameter() {
  if (source.value === "" && department.value.id === "" && city.value === "" && codeFind.value === "") {
    toast.activateToast('No hay parametros para eliminar.', 'danger');
    return
  }
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
            <option value="SISA">SISA</option>
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
            <option :value="{ id: '', name: '' }" disabled>
              Seleccione un departamento...
            </option>
            <option
              v-for="loc in locates.departments"
              :key="loc.id"
              :value="{ id: loc.id, name: loc.name }"
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
                :value="city.id"
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
              v-for="especie in species.uniqueNomComunes"
              :key="especie.cod_especie"
              :value="especie.code_specie"
            >
              {{ especie.vernacularName + " | " + especie.nombre_cientifico }}
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
        <div class="legend">

        <div class="legend-item">
          <img :src="treeIconPath" alt="Árbol Corpoamazonia" class="legend-icon">
          <img :src="treePalmIconGreenPath" alt="Palma Corpoamazonia" class="legend-icon">
          <span>Corpoamazonia Proyectos Semillas</span>
        </div>
        <div class="legend-item">
          <img :src="treeIconSisaPath" alt="Árbol Corpoamazonia" class="legend-icon">
          <img :src="treePalmIconSisaPath" alt="Palma Corpoamazonia" class="legend-icon">
          <span>Corpoamazonia SISA</span>
        </div>
        <div class="legend-item">
          <img :src="treeIconGBIFPath" alt="Árbol GBIF" class="legend-icon">
          <img :src="treePalmIconPinkPath" alt="Palma GBIF" class="legend-icon">
          <span>GBIF (Global Biodiversity Information Facility)</span>
        </div>
        </div>
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

.legend {
  margin-top: 10px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--primary);
}


.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.legend-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.legend-item span {
  font-size: 1rem;
}
</style>