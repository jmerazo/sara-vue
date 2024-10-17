<template>
  <div class="map-container">
    <div ref="mapContainer"></div>
    <div class="info__map" ref="infoContainer">
      <div v-if="selectedFeature" class="contenedor">
        <p class="map__datos" v-if="selectedFeature.getProperties().source === 'original'">
          <font-awesome-icon :icon="['fas', 'fingerprint']" />
          Código especie:
          <span class="dato">{{ selectedFeature.getProperties().codigo }} </span>
        </p>
        <p class="map__datos">
          <font-awesome-icon :icon="['fab', 'glide']" /> Nombre común:
          <span class="dato">{{
            selectedFeature.getProperties().nombre_comun
          }}</span>
        </p>
        <p class="map__datos">
          <font-awesome-icon :icon="['fas', 'signature']" /> Nombre científico:
          <span class="dato">{{
            selectedFeature.getProperties().nombre_cientifico
          }}</span>
        </p>
        <p class="map__datos" v-if="selectedFeature.getProperties().source === 'original'">
          <font-awesome-icon :icon="['fas', 'hashtag']" /> Número de placa:
          <span class="dato">{{
            selectedFeature.getProperties().numero_placa
          }}</span>
        </p>
        <p class="map__datos">
          <font-awesome-icon :icon="['fas', 'location-crosshairs']" />
          Coordenadas:
          <span class="dato">{{
            selectedFeature.getProperties().coordenadas
          }}</span>
        </p>
        <p class="map__datos" v-if="selectedFeature.getProperties().source === 'original'">
          <font-awesome-icon :icon="['fab', 'squarespace']" /> Departamento:
          <span class="dato">{{
            selectedFeature.getProperties().departamento
          }}</span>
        </p>
        <p class="map__datos" v-if="selectedFeature.getProperties().source === 'original'">
          <font-awesome-icon :icon="['fab', 'squarespace']" /> Municipio:
          <span class="dato">{{
            selectedFeature.getProperties().municipio
          }}</span>
        </p>
        <p class="map__datos" v-if="selectedFeature.getProperties().source === 'original'">
          <font-awesome-icon :icon="['fab', 'squarespace']" /> Vereda:
          <span class="dato">{{ selectedFeature.getProperties().vereda }}</span>
        </p>
        <p class="map__datos" v-if="selectedFeature.getProperties().source === 'original'">
          <font-awesome-icon :icon="['fas', 'star']" /> Puntaje evaluación:
          <span class="dato">{{
            selectedFeature.getProperties().resultado
          }}</span>
        </p>
      </div>
    </div>
    <div class="legend">
      <h4>Leyenda</h4>
      <div class="legend-item">
        <img :src="treeIconPath" alt="Árbol Corpoamazonia" class="legend-icon">
        <span>Árbol - Corpoamazonia</span>
      </div>
      <div class="legend-item">
        <img :src="treePalmIconGreenPath" alt="Palma Corpoamazonia" class="legend-icon">
        <span>Palma - Corpoamazonia</span>
      </div>
      <div class="legend-item">
        <img :src="treeIconGBIFPath" alt="Árbol GBIF" class="legend-icon">
        <span>Árbol - GBIF (Global Biodiversity Information Facility)</span>
      </div>
      <div class="legend-item">
        <img :src="treePalmIconPinkPath" alt="Palma GBIF" class="legend-icon">
        <span>Palma - GBIF (Global Biodiversity Information Facility)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { defineExpose } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Icon, Stroke, Fill, Circle } from "ol/style";
import { fromLonLat } from "ol/proj";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon.js";
import treeIconPath from "/icons/icon_tree_green.png";
import treeIconGBIFPath from "/icons/icon_tree_pink.png";
import treePalmIconGreenPath from "/icons/icon_tree_palm_green.png";
import treePalmIconPinkPath from "/icons/icon_tree_palm_pink.png";
import { useGeoCandidateTrees } from "../stores/candidate";
import { defaults as defaultControls, Zoom } from 'ol/control';

const geoStore = useGeoCandidateTrees();

const mapContainer = ref(null);
const infoContainer = ref(null);
const selectedFeature = ref(null);
const currentSource = ref('');
let mapInstance = null;
let initialZoom = 8.4;

// Cargar el archivo GeoJSON desde la carpeta `public`
const geojsonSource = new VectorSource({
  url: '/geojson/export.geojson', // Ruta relativa al archivo en la carpeta `public`
  format: new GeoJSON(),
});

const geojsonLayer = new VectorLayer({
  source: geojsonSource,
  style: new Style({
    stroke: new Stroke({
      color: 'green', // Color del borde del departamento
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)', // Color de relleno del departamento
    }),
  }),
});

const vectorSource = new VectorSource({
  features: [],
});


function onlyPerimeter() {
  vectorSource.clear(); // Limpiar todas las características

  const perimeterCoords = geoStore.coordinatesPolygon;
  drawPerimeter(perimeterCoords);
}

defineExpose({
  onlyPerimeter,
});

function drawPerimeter(perimeterCoords) {
  if (perimeterCoords && perimeterCoords.length > 0) {
    const lineCoords = perimeterCoords.map((coord) => fromLonLat(coord));

    const polygon = new Polygon([lineCoords]);

    const polygonFeature = new Feature({
      geometry: polygon,
    });

    polygonFeature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "green",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(0, 255, 0, 0.1)",
        }),
      })
    );

    vectorSource.addFeature(polygonFeature);
  }
}

onMounted(() => {
  updateMap();
});

watch(
  () => geoStore.geoDataNew,
  () => {
    updateVectorSource();
    updateMap();
  }
);

watch(
  () => currentSource.value,
  () => {
    updateMap();
  }
);

function updateMap() {
  if (geoStore.geoDataNew.length > 0) {
    if (mapInstance) {
      mapInstance.setTarget(null);
      mapInstance = null;
    }
    updateVectorSource();
    if (currentSource.value === 'original') {
      geoStore.calculatePerimeterCoordinates();
      const perimeterCoordinates = geoStore.coordinatesPolygon;
      drawMap(perimeterCoordinates, vectorSource);
    } else {
      drawMap([], vectorSource); // No dibujar el perímetro
    }
  }
}

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
      departamento: point.departamento,
      municipio: point.municipio,
      vereda: point.vereda,
      nombre_del_predio: point.nombre_del_predio,
      resultado: point.resultado,
      habito: point.habito,
      source: point.source
    });
    return feature;
  });

  vectorSource.clear();
  vectorSource.addFeatures(newFeatures);
}

//tamaños y coordenadas del mapa 
function drawMap(perimeterCoordinates, vectorSource) {
  const center = [-75.5277, 1.1961];
  const newCenter = [center[0] - .3, center[1]]; // se crea esta variación para realizar el responsive
  mapInstance = new Map({
    target: mapContainer.value,
    controls: [],
    layers: [
      new TileLayer({
        source: new OSM({
          opacity: 0.8,
          attributions: null,
        }),
      }),
      geojsonLayer, // Añadir la capa GeoJSON aquí
    ],
    view: new View({
      center: fromLonLat(newCenter),
      zoom: initialZoom,
      minZoom: 7.15,
      maxZoom: 30,
    }),
  });
  
  //fin tamaños y coordenadas
  mapInstance.getViewport().style.cursor = "pointer";

  const treeIconStyle = new Style({
    image: new Icon({
      src: treeIconPath,
      scale: 0.06,
      anchor: [0.5, 1],
    }),
  });

  const treePalmIconStyle = new Style({
    image: new Icon({
      src: treePalmIconGreenPath,
      scale: 0.06,
      anchor: [0.5, 1],
    }),
  });

  const treeIconGBIFStyle = new Style({
    image: new Icon({
      src: treeIconGBIFPath,
      scale: 0.06,
      anchor: [0.5, 1],
    }),
  });

  const treePalmGBIFIconStyle = new Style({
    image: new Icon({
      src: treePalmIconPinkPath,
      scale: 0.06,
      anchor: [0.5, 1],
    }),
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: function (feature) {
      const source = feature.get('source');
      const habito = feature.get('habito');
      
      if (source === 'original') {
        if (habito === 'Árbol') {
          return treeIconStyle;
        } else if (habito === 'Palma') {
          return treePalmIconStyle;
        }
      } else if (source === 'gbif') {
        if (habito === 'Árbol') {
          return treeIconGBIFStyle;
        } else if (habito === 'Palma') {
          return treePalmGBIFIconStyle;
        }
      }
    },
  });

  const lineCoords = perimeterCoordinates.map((coord) => fromLonLat(coord));

  const polygon = new Polygon([lineCoords]);

  const polygonFeature = new Feature({
    geometry: polygon,
  });

  polygonFeature.setStyle(
    new Style({
      stroke: new Stroke({
        color: "green",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(0, 255, 0, 0.1)",
      }),
    })
  );

  vectorSource.addFeature(polygonFeature);

  mapInstance.addLayer(vectorLayer);

  mapInstance.on("pointermove", (event) => {
    mapInstance.getView().setZoom(mapInstance.getView().getZoom());
    const pixel = mapInstance.getEventPixel(event.originalEvent);
    const feature = mapInstance.forEachFeatureAtPixel(pixel, (f) => f);

    if (feature && feature.getGeometry() instanceof Point) {
      mapInstance.getViewport().style.cursor = "pointer";
      selectedFeature.value = feature;

      if (infoContainer.value) {
        infoContainer.value.style.display = "block";
      }
    } else {
      mapInstance.getViewport().style.cursor = "";
      if (infoContainer.value) {
        infoContainer.value.style.display = "none";
      }
    }
  });

  window.addEventListener("resize", handleResize);

  function handleResize() {
    if (mapInstance && mapInstance.getView()) {
      if (window.innerWidth < 768) {
        mapInstance.getView().setZoom(5.5);
      } else {
        mapInstance.getView().setZoom(initialZoom);
      }
    }
  }

  handleResize();
}
</script>

<style scoped>
.map-container {
  position: relative;
  width: auto;
  height: 70vh;
  border-radius: 10px;
}

.map-container > div:first-child {
  height: 100%;
  border-radius: 10px;
}

.info__map {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  max-width: 300px;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.map__datos {
  margin: 5px 0;
  font-size: 0.9em;
}

.dato {
  font-weight: 700;
}

.legend {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 300px;
}

.legend h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1em;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.legend-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.legend-item span {
  font-size: 0.8em;
}

@media (min-width: 992px) {
  .info__map {
    right: 5.5%;
    top: 10px;
    max-width: 21.5%;
  }
}
</style>