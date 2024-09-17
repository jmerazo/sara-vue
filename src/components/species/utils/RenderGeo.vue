<script setup>
import { ref, onMounted, watch, shallowRef } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke, Icon } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import treeIconPath from "/icons/icon_tree_green.png";
import treeIconGBIFPath from "/icons/icon_tree_pink.png";
import treePalmIconGreenPath from "/icons/icon_tree_palm_green.png";
import treePalmIconPinkPath from "/icons/icon_tree_palm_pink.png";

const mapContainer = ref(null);
const map = shallowRef(null);
const { filteredData } = defineProps(['filteredData']);

const geojsonSource = new VectorSource({
  url: '/geojson/export.geojson',
  format: new GeoJSON(),
});

const geojsonLayer = new VectorLayer({
  source: geojsonSource,
  style: new Style({
    stroke: new Stroke({
      color: 'green',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
});

const vectorSource = new VectorSource();

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
    // Default style if none of the conditions are met
    return treeIconStyle;
  },
});

function initMap(centerCoordinate) {
  map.value = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      geojsonLayer,
      vectorLayer,
    ],
    view: new View({
      center: fromLonLat(centerCoordinate),
      zoom: 5,
      minZoom: 6.5,
      maxZoom: 14,
    }),
  });

  map.value.getViewport().style.cursor = "pointer";
}

function updateFeatures() {
  vectorSource.clear();
  const features = filteredData.map((point) => {
    const geometry = new Point(fromLonLat([point.lon, point.lat]));
    const feature = new Feature(geometry);
    feature.setProperties({
      source: point.source,
      habito: point.habito,
      // Add any other properties you need for styling or interaction
    });
    return feature;
  });
  vectorSource.addFeatures(features);
}

onMounted(() => {
  if (filteredData.length > 0) {
    const firstCoordinate = [filteredData[0].lon, filteredData[0].lat];
    initMap(firstCoordinate);
    updateFeatures();
  }
});

watch(() => filteredData, (newData) => {
  if (newData.length > 0 && map.value) {
    updateFeatures();
    const extent = vectorSource.getExtent();
    map.value.getView().fit(extent, { padding: [50, 50, 50, 50], maxZoom: 14 });
  }
}, { deep: true });
</script>

<template>
  <div class="map-container">
    <div ref="mapContainer"></div>
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

<style scoped>
.map-container {
  width: auto;
  height: auto;
}

.map-container > div:first-child {
  height: 600px;
  border-radius: 25px;
  height: 500px;
  border-radius: 1rem;
  overflow: hidden;
}

@media (min-width: 768px) {
  .map-container{
    height: 760px;
    
  }
}

.legend {
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.legend h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.1em;
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
  font-size: 0.9em;
}
</style>