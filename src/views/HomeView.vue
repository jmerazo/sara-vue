<script setup>
import { onMounted, ref } from "vue";

import { getFullImageUrl } from "@/helpers/";

import { useHomeStore } from "@/stores/home";
import { usePageContent } from "@/stores/page";
import { useConsultaStore } from "@/stores/consulta";

import Header from '@/components/home/Header.vue';
import ButtonTop from '@/components/shared/ButtonTop.vue'

const pageStore = usePageContent();
const homeStore = useHomeStore();
const consulta = useConsultaStore();

const especiesNaturalist = ref([]);
const currentIndex = ref(0);

// Referencia al contenedor del slider
const sliderWrapper = ref(null);

const abrirUrl = (url) => {
      if (url) {
        window.open(url, '_blank');
      } else {
        console.error('URL no válida');
      }
    };

// Script para obtener datos de especies y abrir la página de iNaturalist
const fetchEspeciesData = async () => {
  try {
    // URL de la API de GBIF
    const response = await fetch('https://api.gbif.org/v1/occurrence/search?limit=100&mediaType=StillImage');
    const data = await response.json();
    console.log('Datos de GBIF:', data);

    // Verificamos que 'results' exista y sea un array
    if (data.results && Array.isArray(data.results)) {
      // Filtrar y mapear datos, excluyendo los desconocidos y aleatorizar el orden
      especiesNaturalist.value = data.results
        .filter(item => 
          item.species && 
          item.media && 
          Array.isArray(item.media) && 
          item.media.length > 0 && 
          item.media[0].identifier && 
          item.kingdom === 'Plantae'
        )
        .map(item => ({
          nombre: item.species || 'Especie desconocida',
          descripcion: item.genericName || 'Sin descripción disponible',
          imagen: item.media[0]?.identifier || '',
          taxon_iconico: item.kingdom || 'Desconocido',
          otrosDatos: item.issue && item.issue.length === 0 ? 'Datos completos' : 'Datos incompletos',
          url: `https://www.gbif.org/occurrence/${item.key}` // Enlace a la página de la especie en GBIF
        }))
        .sort(() => Math.random() - 0.5); // Orden aleatorio
    } else {
      console.warn('No se encontraron resultados válidos en la respuesta de la API.');
      especiesNaturalist.value = []; // Asignar un array vacío si no hay resultados válidos
    }

  } catch (error) {
    console.error('Error al obtener datos de especies:', error);
  }
};

// Función para abrir la página de iNaturalist
const openSpeciesPage = (url) => {
  if (url) {
    window.open(url, '_blank'); // Abrir en una nueva pestaña
  }
};


// Función para mostrar el siguiente slide
const nextSlide = () => {
  if (currentIndex.value < especiesNaturalist.value.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
  updateSliderPosition();
};

// Función para mostrar el slide anterior
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = especiesNaturalist.value.length - 1;
  }
  updateSliderPosition();
};

// Función para actualizar la posición del slider
const updateSliderPosition = () => {
  if (sliderWrapper.value) {
    sliderWrapper.value.style.transform = `translateX(-${currentIndex.value * 100}%)`;
  }
};


const mostrarTodo = ref(false);

onMounted(async () => {
  /*   await geoStore.fetchData(); */
  await pageStore.fetchData();
  await homeStore.fetchData();
  fetchEspeciesData();
});

//top de especies

function contenidoResumido() {
  // Divide el texto en el primer punto aparte
  const splitText = pageStore.contenidoNosotros[0].content.split(".");
  return splitText[0] + ".";
}
</script>

<template>
  <div>
    <Header />

    <section class="contenedor planificacion">
      <div class="planificacion__grid">
        <div v-for="seccion in pageStore.informacionUsuario" :key="seccion.title">
          <div class="card" v-if="seccion.titulo === 'Misión'">
            <div class="front" :style="{
              backgroundImage:
                'url(/img/backgroundCard/background-mision.jpeg)',
            }">
              <div class="front__content">
                <p class="card__label">{{ seccion.titulo }}</p>
              </div>
            </div>
            <div class="back">
              <p class="card__text">
                {{ seccion.descripcion }}
              </p>
            </div>
          </div>

          <div class="card" v-if="seccion.titulo === 'Visión'">
            <div class="front" :style="{
              backgroundImage:
                'url(/img/backgroundCard/background-vision.webp)',
            }">
              <div class="front__content">
                <p class="card__label">{{ seccion.titulo }}</p>
              </div>
            </div>
            <div class="back">
              <p class="card__text">
                {{ seccion.descripcion }}
              </p>
            </div>
          </div>
          <div class="card" v-if="seccion.titulo === 'Valores'">
            <div class="front" :style="{
              backgroundImage:
                'url(/img/backgroundCard/background-valores.jpeg)',
            }">
              <div class="front__content">
                <p class="card__label">{{ seccion.titulo }}</p>
              </div>
            </div>
            <div class="back">
              <p class="card__text">
                {{ seccion.descripcion }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección del Slider con la Fanpage de Facebook -->
    <section class="contenedor especiesSlider">
      <div class="especiesSlider__contenedor">
        <!-- Columna del Slider -->
        <div class="slider-container">
          <h3 class="especiesSlider__heading">
            <svg class="icon__species" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 7C18 7.2624 17.9832 7.52086 17.9505 7.77437C19.7712 8.80457 21 10.7588 21 13C21 16.3137 18.3137 19 15 19C14.2987 19 13.6256 18.8797 13 18.6586V22H11V18.4003C10.2499 18.7837 9.40022 19 8.5 19C5.46243 19 3 16.5376 3 13.5C3 12.0474 3.56312 10.7263 4.48297 9.74318C4.87725 10.8232 5.49744 11.7944 6.28576 12.5989L7.71424 11.1991C6.99071 10.4607 6.45705 9.53767 6.1906 8.50688C6.06607 8.02541 6 7.5204 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7Z"></path>
            </svg>
            GBIF - Datos de Especies Forestales
          </h3>
          <div class="slider">
            <div class="slider__wrapper" ref="sliderWrapper">
              <!-- Los slides se generarán dinámicamente -->
              <div
                class="slider__slide"
                v-for="(especie, index) in especiesNaturalist"
                :key="index"
                @click="abrirUrl(especie.url)"
              >
                <div class="especie__contenido">
                  <div class="especie__imagen-container">
                    <!-- Mostrar imagen si está disponible -->
                    <img v-if="especie.imagen" :src="especie.imagen" alt="Imagen de {{ especie.nombre }}" class="especie__imagen">
                  </div>
                  <div class="especie__texto">
                    <h4 class="especie__nombre">{{ especie.nombre }}</h4>
                    <p class="especie__descripcion">{{ especie.descripcion }}</p>
                    <p class="especie__iconico">Taxón icónico: {{ especie.nombreIconico }}</p>
                    <p class="especie__otros">{{ especie.otrosDatos }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Botones de navegación del slider -->
            <button @click="prevSlide" class="slider__button slider__button--left">
              &#10094;
            </button>
            <button @click="nextSlide" class="slider__button slider__button--right">
              &#10095;
            </button>
          </div>
        </div>

         <!-- Columna del widget de Facebook -->
         <div class="facebook-widget">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCorpoamazonia&tabs=timeline&width=340&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="500"
            style="border:none;overflow:hidden"
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </section>

    <section class="contenedor topEspecies">
      <h3 class="topEspecies__heading">Top especies más buscadas</h3>
      <div class="topEspecies__grid">
        <!-- especie -->
        <div
          class="topEspecie__contenido"
          v-for="specie in homeStore.topSpecies"
          :key="specie.cod_especie"
        >
          <div
            class="topEspecie__contenido-imagen"
            :style="{
              backgroundImage:
                'url(' + getFullImageUrl(specie.images[0].img_general) + ')',
            }"
          >
            <a
              class="topEspeice__enlace animacion"
              @click="consulta.consultSpecie(specie.code_specie)"
              ><span class="animacion__text">{{ specie.vernacularName.split(' ')[0] }}</span></a
            >
          </div>
        </div>
        <!--fin especie -->
      </div>
    </section>

    <section class="colaboradores">
      <div class="colaboradores__contenido">
        <div class="colaboradores__grid">
          <!-- colaborador -->
          <div
            class="colaborador"
            v-for="(colaborador, index) in homeStore.colaboradores"
            :key="index"
          >
            <a target="_blank" :href="colaborador.enlace"
              ><img
                :src="colaborador.img"
                class="colaborador__imagen"
                alt="imagen colaborador"
            /></a>
          </div>
          <!-- fin colaborador -->
        </div>
      </div>
    </section>
  </div>
  <ButtonTop/>
</template>

<style scoped>
/* API GBIF */
/* Contenedor principal del slider y el widget de Facebook */
.especiesSlider__contenedor {
  display: flex; /* Flexbox para alinear en una fila */
  flex-wrap: wrap; /* Permitir que las columnas se ajusten a múltiples filas si es necesario */
  width: 100%;
  max-width: 100%; /* Asegura que no se desborde */
  align-items: flex-start; /* Alinea el contenido al inicio verticalmente */
  gap: 1rem; /* Espacio entre el slider y el widget */
  box-sizing: border-box; /* Incluir padding y border en el ancho total */
  overflow: hidden; /* Oculta el desbordamiento si ocurre */
  max-height: 498px;
}

/* Estilo para la columna del widget de Facebook */
.facebook-widget {
  flex: 0 0 10%; /* La columna de Facebook ocupa el 10% del ancho */
  max-width: 340px; /* Asegura que el widget no se haga más ancho que esto */
  box-sizing: border-box; /* Incluir padding y border en el ancho total */
}

/* Estilo para la columna del slider */
.slider-container {
  flex: 1; /* La columna del slider ocupa el restante 90% */
  min-width: 0; /* Asegura que el contenido no fuerce un desbordamiento horizontal */
  box-sizing: border-box; /* Incluir padding y border en el ancho total */
}

.especiesSlider__heading {
  text-align: center;
}

.contenedor.especiesSlider {
  margin-top: 3rem;
  max-width: 106rem; /* Asegura que coincida con el ancho de las otras secciones */
  margin: 0 auto; /* Centra el contenedor */
  padding: 1rem; /* Ajusta el padding si es necesario para el espaciado */
  box-sizing: border-box; /* Incluir padding y border en el ancho total */
}

@media (min-width: 920px) {
  .contenedor.especiesSlider {
    grid-template-columns: repeat(3, 1fr);
    margin-top: 3rem;
    max-width: 60%;
  }
}

.icon__species {
  width: 1rem;
}

.slider {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.slider__wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider__slide {
  flex: 0 0 calc(100% / 3); /* Mostrar 3 slides a la vez */
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  align-items: stretch; /* Asegura que las tarjetas se estiren a la misma altura */
  justify-content: center;
  cursor: pointer;
}

.especie__contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--blanco);
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  max-width: 100%;
  height: 82%; /* Asegura que el contenedor se expanda completamente */
  box-sizing: border-box; /* Incluye padding y border en el cálculo del tamaño */
}

.especie__imagen-container {
  margin-bottom: 1rem; /* Espacio debajo de la imagen */
}

.especie__imagen {
  width: 150px; /* Ajusta el tamaño de la imagen */
  height: auto;
  border-radius: 8px;
}

.especie__texto {
  width: 100%; /* Asegura que el texto se expanda a todo el ancho del contenedor */
}

.especie__nombre {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.especie__descripcion, .especie__iconico, .especie__otros {
  font-size: 1rem;
  color: var(--gris-fuente);
  margin: 0.5rem 0;
}

.slider__button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  margin: 0 30px;
}

.slider__button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.slider__button--left {
  left: -30px;
}

.slider__button--right {
  right: -30px;
}

/* top especies **********************************/
.topEspecies {
  margin-top: 3rem;
}
.topEspecies__heading {
  font-size: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .topEspecies__heading {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
}
@media (min-width: 992px) {
  .topEspecies__heading {
    font-size: 1.2rem;
    margin-bottom: 3rem;
  }
}
@media (min-width: 1080px) {
  .topEspecies {
    width: 60%;
  }
}

.topEspecies__grid {
  display: grid;
  gap: 0rem;
}

@media (min-width: 768px) {
  .topEspecies__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 992px) {
  .topEspecies__grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

.topEspecie__contenido {
  display: flex;
  flex-direction: column;
  transition-property: scale(1);
  transition-duration: 0.5s;
  height: 22rem;
}

.topEspecie__contenido:hover {
  transform: scale(1.05);
}
.topEspecie__contenido-imagen {
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 90%;
  margin: 0 auto;
  border-radius: .5rem;  
  display: grid;
  grid-template-rows: repeat(3, 1fr);
}
@media (min-width: 992px) {
  .topEspecie__contenido-imagen {
    height: 85%;
  }
}

.topEspeice__enlace {
  display: inline-flex;
  width: 50%;
  align-items: center;
  height: 2.5rem;
  padding: 0 0 0 .5rem;
  background-color: var(--blanco);
  color: var(--gris);
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;
  border-radius: 0 .5rem .5rem 0;
  position: relative;
  overflow: hidden; 
  margin-top: 15rem;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.topEspeice__enlace:hover{
  color: var(--blanco);
}
.animacion__text{
  position: relative;
  z-index: 2;
}
.topEspeice__enlace span{
  text-align: left;
}

.animacion::after {
  content: "";
  width: 100%;
  position: absolute;
  z-index: 1;
  transition: 0.3s ease-in-out all;
  top: 0;
  left: calc(-100% - 75px); /* calc elemnt widht with border-right */
  border-right: 80px solid transparent;
  border-bottom: 40px solid var(--primary);
  transition: 0.3s ease-in-out all;
}
.animacion:hover::after {
  left: 0;
}


/* colaboradores ****************************** */

.colaboradores {
  margin: 4rem 0;
  width: 100%;
}

.colaboradores__contenido {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinea el encabezado a la izquierda */
  padding: 1rem;
}

.colaboradores__heading {
  font-size: 1rem;
  line-height: 1.2;
  width: 100%; /* Asegúrate de que el encabezado ocupe todo el ancho */
  text-align: left; /* Alinea el texto a la izquierda */
  margin-bottom: 2rem; /* Espacio entre el encabezado y los logos */
}

.colaboradores__grid {
  display: flex;
  flex-wrap: wrap; /* Permite múltiples líneas si hay muchos logos */
  gap: 2rem;
  justify-content: center; /* Centra los logos horizontalmente */
  width: 100%; /* Ocupa todo el ancho disponible */
  align-items: center;
}

.colaborador {
  width: 4rem;
  transition: transform 0.3s;
}

.colaborador:hover {
  transform: scale(1.05);
}

@media (min-width: 768px) {
  .colaborador {
    width: 5rem;
  }
}

/* MISION Y VISION */
/* mision vision y valores */
.planificacion__grid {
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

@media (min-width: 1440px) {
  .planificacion {
    margin: 0 auto;
  }

  .planificacion__grid {
    flex-direction: row;
  }
}

.card {
  width: 300px;
  height: 200px;
  position: relative;
  perspective: 1000px;
}

.front,
.back {
  position: absolute;
  width: 300px;
  height: 200px;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  transition: transform 0.9s;
  border-radius: 1rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .card {
    width: 400px;
    height: 300px;
  }

  .front,
  .back {
    position: absolute;
    width: 400px;
    height: 300px;
  }
}

.front {
  background-position: center;
  background-size: cover;
}

.front::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  border-radius: 1rem;
}

.back {
  background-color: rgb(255, 255, 255);
  transform: rotateY(180deg);
}

.card:hover .front {
  transform: rotateY(-180deg);
}

.card:hover .back {
  transform: rotateY(0deg);
}

.card .front {
  transform: rotateY(0deg);
}

.card .back {
  transform: rotateY(180deg);
}

.card__label {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 1.7rem;
  font-weight: 700;
  color: white;
  z-index: 100;
}

.card__text {
  font-size: 0.8rem;
  font-weight: 600;
}

@media (min-width: 768px) {
  .card__text {
    font-size: 1rem;
    text-align: center;
  }
}

.front__content {
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--blanco);
  z-index: 100;
}
</style>




