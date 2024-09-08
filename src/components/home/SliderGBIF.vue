<script setup>
import { onMounted, ref } from "vue";

const speciesNaturalist = ref([]); // Arreglo de especies
const currentPosition = ref(0); // Posición actual del slider
const visibleCards = 3; // Número de tarjetas visibles al mismo tiempo
const cardWidth = 370; // Ancho de la tarjeta (350px + 20px de gap)

// Función para obtener datos de especies
const fetchEspeciesData = async () => {
    try {
        const response = await fetch('https://api.gbif.org/v1/occurrence/search?limit=100&mediaType=StillImage');
        const data = await response.json();
        speciesNaturalist.value = data.results.filter((item) => item.kingdom === 'Plantae');
    } catch (error) {
        console.error('Error al obtener datos de especies:', error);
    }
};

// Función para avanzar a la siguiente tarjeta
const next = () => {
    const maxPosition = (speciesNaturalist.value.length - visibleCards) * cardWidth;
    if (currentPosition.value > -maxPosition) {
        currentPosition.value -= cardWidth;
    }
};

// Función para retroceder a la tarjeta anterior
const prev = () => {
    if (currentPosition.value < 0) {
        currentPosition.value += cardWidth;
    }
};

// Función para abrir la página de iNaturalist
const openSpeciesPage = (url) => {
    if (url) {
        window.open(url, '_blank'); // Abrir en una nueva pestaña
    }
};

onMounted(async () => {
    await fetchEspeciesData();
});
</script>

<template>
    <div class="species__gbif">
        <h1 style="text-align: center;">GBIF - Datos de Especies Forestales</h1>

        <div class="list__slider">
            <div class="list" :style="{ transform: `translateX(${currentPosition}px)` }" ref="sliderWrapper">
                <div @click="openSpeciesPage(`https://www.gbif.org/occurrence/${specie.key}`)"
                    v-for="specie in speciesNaturalist" :key="specie.key" class="card"
                    :style="{ backgroundImage: `url(${specie.media[0].identifier})` }">
                    <div class="card__content">
                        <h3>{{ specie.acceptedScientificName }}</h3>
                    </div>
                </div>
            </div>

            <!-- buttons to nav -->
            <svg @click="prev" class="list__button prev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="currentColor">
                <path
                    d="M8.36853 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.36853 12Z">
                </path>
            </svg>

            <svg @click="next" class="list__button next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="currentColor">
                <path
                    d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z">
                </path>
            </svg>

        </div>

    </div>
</template>

<style scoped>
.species__gbif {
    margin-top: 5rem;
    text-align: center;
    position: relative;
}

.species__gbif h1 {
    font-size: 1.5rem;
    margin: 0 0 2rem 0;
}

.list__slider {
    position: relative;
    width: 350px;
    border-radius: 1rem;
    margin: 0 auto;
    overflow: hidden;
}

@media (min-width: 768px) {
    .species__gbif {
        margin-top: 10rem;
    }

    .species__gbif h1 {
        font-size: 2rem;
        margin: 0 0 3rem 0;
    }

    .list__slider {
        width: 1090px;
    }
}

.list {
    display: flex;
    gap: 20px;
    transition: transform 0.5s ease;
}

.card {
    min-width: 350px;
    height: 350px;
    border-radius: 1rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    cursor: pointer;
    margin: 0 auto;
}

.card__content {
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
}

.card__content h3 {
    color: white;
    text-align: center;
    font-size: 1.2rem;
}

.list__button {
    position: absolute;
    width: 2rem;
    height: 2rem;
    padding: 1rem;
    top: 40%;
    border-radius: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;

    cursor: pointer;
}

.list__button.prev {
    left: 10px;
}

.list__button.next {
    right: 10px;
}

.list__button:hover {
    background-color: rgba(0, 0, 0, 0.8);
}
</style>
