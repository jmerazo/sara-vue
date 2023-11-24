<script setup>
import { onMounted, ref, computed } from 'vue';
import RenderGeo from '../../components/RenderGeoMap.vue'
import { useGeoCandidateTrees } from '../../stores/candidate'
import { useEspeciesStore } from '../../stores/species'
import { locatesColombia } from "../../stores/locates";

const locates = locatesColombia();
const geoStore = useGeoCandidateTrees();
const especies = useEspeciesStore();

const renderGeoMapRef = ref(null);
const codeFind = ref('');
const department = ref({ code: '', name: '' });
const city = ref('');

onMounted(async () => {
  await geoStore.fetchData();
});

function callOnlyPerimeter() {
  if (renderGeoMapRef.value && renderGeoMapRef.value.onlyPerimeter) {
    renderGeoMapRef.value.onlyPerimeter();
  }
}

const filterGeoData = () => {
/*   console.log('department: ', department.value.name, " city: ", city.value) */
  geoStore.filterGeo(codeFind.value)
  geoStore.calculatePerimeterCoordinates(codeFind.value)
}

const filteredCities = computed(() => {
  if (department.value.code) {
    const filtered = locates.cities.filter(
      (city) => city.department_id === department.value.code
    );
    return filtered;
  }
  return [];
});
</script>

<template>
    <div class="shadow-lg bg-gray-50 p-2 rounded-lg mb-2 mt-2">
        <div class="text-center">
            <h1 class="font-bold text-lg my-auto mb-3">MAPA GENERAL DE LAS ESPECIES FORESTALES</h1>
        </div>
        <div class="space-y-4 mb-5">
          <label class="block text-black uppercase font-bold" for="parametro">
            <font-awesome-icon :icon="['fas', 'database']" class="mr-2 ml-2" />
            Filtrar especie
          </label>

          <div class="flex custom-select">
            <!-- departamento -->
              <select
                class="text-lg p-3 w-full rounded-lg focus:outline-none font-bold flex-1"
                id="department"
                v-model="department"
              >
                <option value="" selected disabled>Seleccione un departmento...</option>
                <option
                  v-for="loc in locates.departments"
                  :key="loc.id"
                  :value="{ code: loc.code, name: loc.name }"
                >
                  {{ loc.name }}
                </option>
              </select>

              <!-- ciudad -->
              <div v-if="filteredCities.length > 0">
                <select
                  class="text-lg p-3 w-full rounded-lg focus:outline-none font-bold flex-1"
                  id="city"
                  v-model="city"
                >
                  <option value="" disabled selected>Seleccione un municipio...</option>
                  <option
                    v-for="city in filteredCities"
                    :key="city.id"
                    :value="city.name"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>

            <select
              id="especie"
              class="text-lg p-3 w-full rounded-lg focus:outline-none font-bold flex-1"
              @change="filterGeoData"
              v-model="codeFind"
            >
              <option value="" selected disabled>Seleccione una especie...</option>
              <option
                v-for="especie in especies.uniqueNomComunes"
                :key="especie.cod_especie"
                :value="especie.cod_especie"
              >
                {{ especie.nom_comunes + " | " + especie.nombre_cientifico }}
              </option>
            </select>
            <button type="submit" class="btn-form-search-header cursor-pointer font-bold rounded-lg pl-2 pr-2 ml-3" @click="filterGeoData()"><font-awesome-icon :icon="['fas', 'filter']" class="mr-2"/> Filtrar</button>
            <button type="submit" class="btn-form-search-header cursor-pointer font-bold rounded-lg pl-2 pr-2 ml-3" @click="geoStore.deleteFilterGeo()"><font-awesome-icon :icon="['fas', 'filter-circle-xmark']" class="mr-2"/> Eliminar filtro</button>
            <button type="submit" class="btn-form-search-header cursor-pointer font-bold rounded-lg pl-2 pr-2 ml-3" @click="geoStore.exportToKML(geoStore.coordinatesKML)"><font-awesome-icon :icon="['fas', 'arrows-to-eye']" class="mr-2"/> Exportar KML/KMZ</button>
            <button type="submit" class="btn-form-search-header cursor-pointer font-bold rounded-lg pl-2 pr-2 ml-3" @click="callOnlyPerimeter"><font-awesome-icon :icon="['fas', 'draw-polygon']" class="mr-2"/> Perímetro</button>
          </div>
        </div>      
        <RenderGeo ref="renderGeoMapRef"/>
    </div>   
</template>

<style scoped>
/* Estilos para el componente */
.custom-select {
  display: flex;
  align-items: center;
}

/* Estilos para el select */
select {
  padding: 10px;
  font-family: inherit;
  width: 100%;
  max-width: 500px;
}

select option {
  color: black;
}
</style>