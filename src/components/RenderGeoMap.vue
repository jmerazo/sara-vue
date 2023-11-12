<template>
  <div class="map-container" ref="mapContainer"></div>
  <div class="info-container" ref="infoContainer">
    <div v-if="selectedFeature">
      <p><span class="font-bold"><font-awesome-icon :icon="['fas', 'fingerprint']" /> Código especie:</span> {{ selectedFeature.getProperties().codigo }}</p>
      <p><span class="font-bold"><font-awesome-icon :icon="['fab', 'glide']" /> Nombre común:</span> {{ selectedFeature.getProperties().nombre_comun }}</p>
      <p><span class="font-bold"><font-awesome-icon :icon="['fas', 'signature']" /> Nombre científico:</span> {{ selectedFeature.getProperties().nombre_cientifico }}</p>
      <p><span class="font-bold"><font-awesome-icon :icon="['fas', 'hashtag']" /> Número de placa:</span> {{ selectedFeature.getProperties().numero_placa }}</p>
      <p><span class="font-bold"><font-awesome-icon :icon="['fas', 'location-crosshairs']" /> Coordenadas:</span> {{ selectedFeature.getProperties().coordenadas }}</p>
      <p><span class="font-bold"><font-awesome-icon :icon="['fab', 'squarespace']" /> Vereda:</span> {{ selectedFeature.getProperties().vereda }}</p>
      <p><span class="font-bold"><font-awesome-icon :icon="['fas', 'location-dot']" /> Nombre del predio:</span> {{ selectedFeature.getProperties().nombre_del_predio }}</p>
      <p><span class="font-bold"><font-awesome-icon :icon="['fas', 'star']" /> Puntaje evaluación:</span> {{ selectedFeature.getProperties().resultado }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import treeIconPath from '../assets/icons/icon_tree_cg.png';

const mapContainer = ref(null);
const infoContainer = ref(null);
const selectedFeature = ref(null);
const { filteredData } = defineProps(['filteredData']);

onMounted(() => {
  if (filteredData.length > 0) {
    const firstCoordinate = [filteredData[0].lon, filteredData[0].lat];
    drawMap(firstCoordinate);
  }
});

function drawMap(centerCoordinate) {
  const map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM({
          opacity: 0.8,
        }),
      }),
    ],
    view: new View({
      center: fromLonLat(centerCoordinate),
      zoom: 9,
      minZoom: 7,
      maxZoom: 30,
    }),
  });

  map.getViewport().style.cursor = 'pointer';

  const vectorSource = new VectorSource({
    features: filteredData.map((point) => {
      const geometry = new Point(fromLonLat([point.lon, point.lat]));
      const feature = new Feature(geometry);
      feature.setProperties({
        codigo: point.codigo,
        nombre_comun: point.nombre_comun,
        nombre_cientifico: point.nombre_cientifico,
        numero_placa: point.numero_placa,
        coordenadas: point.coordenadas,
        vereda: point.vereda,
        nombre_del_predio: point.nombre_del_predio,
        resultado: point.resultado,
      });
      return feature;
    }),
  });

  const treeIcon = new Icon({
    src: treeIconPath,
    scale: 0.4,
    anchor: [0.5, 1],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: treeIcon,
    }),
  });

  vectorLayer.set('pointerEvents', 'visible');

  map.on('pointermove', (event) => {
    map.getView().setZoom(map.getView().getZoom());
    const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);
    if (feature) {
      map.getViewport().style.cursor = 'pointer';
      selectedFeature.value = feature;
      infoContainer.value.style.display = 'block';
    } else {
      map.getViewport().style.cursor = ''; // Restaurar el estilo del cursor
      infoContainer.value.style.display = 'none';
    }
  });

  map.addLayer(vectorLayer);
}
</script>

<style>
.map-container {
  width: auto;
  height: 82vh;
  border-radius: 25px;
}

.info-container {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  display: none;
}
</style>
