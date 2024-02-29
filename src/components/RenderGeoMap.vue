<template >
  <div class="map-container" ref="mapContainer"></div>
  <div class="info__map" ref="infoContainer">
    <div v-if="selectedFeature" class="contenedor">
      <p class="map__datos">
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
      <p class="map__datos">
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
      <p class="map__datos">
        <font-awesome-icon :icon="['fab', 'squarespace']" /> Departamento:
        <span class="dato">{{
          selectedFeature.getProperties().departamento
        }}</span>
      </p>
      <p class="map__datos">
        <font-awesome-icon :icon="['fab', 'squarespace']" /> Municipio:
        <span class="dato">{{
          selectedFeature.getProperties().municipio
        }}</span>
      </p>
      <p class="map__datos">
        <font-awesome-icon :icon="['fab', 'squarespace']" /> Vereda:
        <span class="dato">{{ selectedFeature.getProperties().vereda }}</span>
      </p>
      <p class="map__datos">
        <font-awesome-icon :icon="['fas', 'location-dot']" /> Nombre del predio:
        <span class="dato">{{
          selectedFeature.getProperties().nombre_del_predio
        }}</span>
      </p>
      <p class="map__datos">
        <font-awesome-icon :icon="['fas', 'star']" /> Puntaje evaluación:
        <span class="dato">{{
          selectedFeature.getProperties().resultado
        }}</span>
      </p>
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
import { Style, Icon, Stroke, Fill } from "ol/style";
import { fromLonLat } from "ol/proj";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon.js";
import treeIconPath from "../assets/icons/icon_tree_cg.png";
import { useGeoCandidateTrees } from "../stores/candidate";

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

defineExpose({
  onlyPerimeter,
});

function drawPerimeter(perimeterCoords) {
  if (perimeterCoords && perimeterCoords.length > 0) {
    const lineCoords = perimeterCoords.map((coord) => fromLonLat(coord));

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
    geoStore.calculatePerimeterCoordinates();
    const perimeterCoordinates = geoStore.coordinatesPolygon;
    drawMap(perimeterCoordinates, vectorSource);
  }
}
//tamaños y coordenadas del mapa 
let initialZoom = 8.4;
function drawMap(perimeterCoordinates, vectorSource) {
  const center = [-75.5277, 1.1961];
  const newCenter = [center[0] - .3, center[1]]; // se crea esta variación para realizar el responsive
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
      center: fromLonLat(newCenter),
      zoom: initialZoom,
      minZoom: 7.15,
      maxZoom: 30,
    }),
  });

  
  //fin tamaños y coordenadas
  mapInstance.getViewport().style.cursor = "pointer";

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

  const lineCoords = perimeterCoordinates.map((coord) => fromLonLat(coord));

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
        color: "green",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(0, 255, 0, 0.1)",
      }),
    })
  );

  // Agregar la característica del polígono al origen del vector
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


  // lógica mara el manejar el tamaño del mapa según la pantalla del dispositivo
  window.addEventListener("resize", handleResize);

  // Manejar el evento resize
  function handleResize() {
    // Verificar si mapInstance es null o undefined antes de acceder a getView()
    if (mapInstance && mapInstance.getView()) {
      // Modificar el zoom según el ancho de la pantalla
      if (window.innerWidth < 768) {
        mapInstance.getView().setZoom(5.5);
      } else {
        mapInstance.getView().setZoom(initialZoom);
      }
    }
  }

  // Ejecutar la función handleResize al inicio para establecer el zoom inicial
  handleResize();
}


</script>


<style>
.map-container {
  position: relative;
  width: auto;
  height: 70vh;
  border-radius: 10px;
}

.info__map {
  position: absolute;
  top: 50%; /* Ajusta la posición vertical según necesites */
  right: 2%; /* Ajusta la posición horizontal según necesites */
  background-color: white;
  border: 1px solid #ccc;
  padding: 0.1rem;
  display: none;
  border-radius: 5px;
}
@media (min-width: 992px) {
  .info__map {
    right: 5.5%;
    top: 57%;
    max-width: 21.5%;
  }
}
.map__datos {
  margin: 0.1rem;
  padding: 0;
}
.dato {
  font-weight: 700;
}
</style>
