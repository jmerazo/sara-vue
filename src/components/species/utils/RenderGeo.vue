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

const treeIcon = new Icon({
  src: treeIconPath,
  scale: 0.05,
  anchor: [0.5, 1],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: new Style({
    image: treeIcon
  }),
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
}

function updateFeatures() {
  vectorSource.clear();
  const features = filteredData.map((point) => {
    const geometry = new Point(fromLonLat([point.lon, point.lat]));
    return new Feature(geometry);
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
  <div class="map-container" ref="mapContainer"></div>
</template>

<style scoped>
.map-container {
  width: auto;
  height: 500px;
  border-radius: 1rem;
  overflow: hidden;
}

@media (min-width: 768px) {
  .map-container{
    height: 760px;
    
  }
}
</style>