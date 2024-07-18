<script setup>
import { ref, onMounted } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Fill, Stroke, Circle, Icon } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import treeIconPath from '/icons/icon_geo.png'

const mapContainer = ref(null);
const { filteredData } =  defineProps(['filteredData']);

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
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat(centerCoordinate), // New York coordinates
      zoom: 5,
      minZoom: 8, // Establecer el zoom mínimo permitido
      maxZoom: 9, // Establecer el zoom máximo permitido
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

  const treeIcon = new Icon({
    src: treeIconPath, // Ruta de la imagen del árbol
    scale: 0.4, // Puedes ajustar este valor para cambiar el tamaño del icono
    anchor: [0.5, 1], // Posición del icono donde se encuentra el punto (centro inferior del icono)        

  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
        image: treeIcon
      /* image: new Circle({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: 'green' }),
        stroke: new Stroke({ color: 'white', width: 2 }),
      }), */
    }),
  });

  map.addLayer(vectorLayer);
}
</script>

<style scoped>
.map-container {
  width: auto;
  height: 600px;
  border-radius: 25px;
}
</style>

<template>
  <div class="map-container" ref="mapContainer"></div>
</template>