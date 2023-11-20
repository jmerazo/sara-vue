<template>
  <button @click="onlyPerimeter">Mostrar solo perímetro</button>
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
import { onMounted, ref, watch } from 'vue';
import { LineString } from 'ol/geom';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Icon, Stroke, Fill } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon.js';
import treeIconPath from '../assets/icons/icon_tree_cg.png';
import { useGeoCandidateTrees } from '../stores/candidate';

const geoStore = useGeoCandidateTrees();

const mapContainer = ref(null);
const infoContainer = ref(null);
const selectedFeature = ref(null);
let mapInstance = null;

const vectorSource = new VectorSource({
  features: [],
});

function onlyPerimeter() {
  vectorSource.clear(); // Limpiar todas las características

  const perimeterCoords = geoStore.coordinatesPolygon;
  drawPerimeter(perimeterCoords);
}

function drawPerimeter(perimeterCoords) {
  if (perimeterCoords && perimeterCoords.length > 0) {
    const lineCoords = perimeterCoords.map(coord => fromLonLat(coord));

    // Crear una Polygon a partir de las coordenadas
    const polygon = new Polygon([lineCoords]);

    // Crear una característica de OpenLayers con el Polygon
    const polygonFeature = new Feature({
      geometry: polygon,
    });

    // Definir estilo para el perímetro (línea) y relleno
    polygonFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: 'green',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(0, 255, 0, 0.1)',
        }),
      })
    );

    vectorSource.addFeature(polygonFeature);
  }
}

onMounted(() => {
  updateMap();
});

watch(() => geoStore.geoDataNew, () => {
  updateVectorSource();
  updateMap();
});

function updateVectorSource() {
  const newFeatures = geoStore.geoDataNew.map((point) => {
    const geometry = new Point(fromLonLat([point.lon, point.lat]));
    const feature = new Feature(geometry);
    feature.setProperties({
      // Asigna las propiedades según tu estructura de datos
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
  });

  vectorSource.clear();
  vectorSource.addFeatures(newFeatures);
}

function updateMap() {
  if (geoStore.geoDataNew.length > 0) {
    if (mapInstance) {
      mapInstance.setTarget(null);
      mapInstance = null;
    }
    updateVectorSource();
    geoStore.calculatePerimeterCoordinates()
    const perimeterCoordinates = geoStore.coordinatesPolygon;
    drawMap(perimeterCoordinates, vectorSource);
  }
}

function drawMap(perimeterCoordinates, vectorSource) {
  mapInstance = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM({
          opacity: 0.8,
        }),
      }),
    ],
    view: new View({
      center: fromLonLat([perimeterCoordinates[0][0], perimeterCoordinates[0][1]]),
      zoom: 9,
      minZoom: 7,
      maxZoom: 30,
    }),
  });

  mapInstance.getViewport().style.cursor = 'pointer';

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

  const lineCoords = perimeterCoordinates.map(coord => fromLonLat(coord));

  // Crear una Polygon a partir de las coordenadas
  const polygon = new Polygon([lineCoords]);

  // Crear una característica de OpenLayers con el Polygon
  const polygonFeature = new Feature({
    geometry: polygon,
  });

  // Definir estilo para el perímetro (línea) y relleno
  polygonFeature.setStyle(
    new Style({
      stroke: new Stroke({
        color: 'green',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(0, 255, 0, 0.1)',
      }),
    })
  );

  // Agregar la característica del polígono al origen del vector
  vectorSource.addFeature(polygonFeature);

  mapInstance.addLayer(vectorLayer);

  mapInstance.on('pointermove', (event) => {
    mapInstance.getView().setZoom(mapInstance.getView().getZoom());
    const feature = mapInstance.forEachFeatureAtPixel(event.pixel, (f) => f);
    if (feature) {
      mapInstance.getViewport().style.cursor = 'pointer';
      selectedFeature.value = feature;
      infoContainer.value.style.display = 'block';
    } else {
      mapInstance.getViewport().style.cursor = '';
      infoContainer.value.style.display = 'none';
    }
  });
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
