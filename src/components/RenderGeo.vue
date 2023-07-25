<template>
  <div class="map-container" ref="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted, computed, watch  } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';

const { filteredData } = defineProps(['filteredData']);
const mapContainer = ref(null);

onMounted(() => {
    drawMap();
});

function drawMap() {
  const map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([-74.005974, 40.712776]), // New York coordinates
      zoom: 8,
    }),
  });

  /* const points = [
    { lon: -74.005974, lat: 40.712776 }, // New York
    { lon: -0.1275, lat: 51.50722 }, // London
    { lon: -43.1729, lat: -22.9068 }, // Rio de Janeiro
    { lon: 139.6917, lat: 35.6895 }, // Tokyo
  ];
 */
  const vectorSource = new VectorSource({
    features: filteredData.map((point) => {
      const geometry = new Point(fromLonLat([point.lon, point.lat]));
      return new Feature(geometry);
    }),
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: 'blue' }),
        stroke: new Stroke({ color: 'white', width: 2 }),
      }),
    }),
  });

  map.addLayer(vectorLayer);
}
</script>

<style>
.map-container {
  width: auto;
  height: 600px;
  border-radius: 25px;
}
</style>
