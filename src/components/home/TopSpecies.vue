<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { getFullImageUrl } from "@/helpers/";

import { useHomeStore } from "@/stores/home";
import { useConsultaStore } from "@/stores/consulta";

const homeStore = useHomeStore();
const consulta = useConsultaStore();
const router = useRouter();

const goToViewSpecies = () => {
    router.push("/especies")
}


</script>

<template>
    <!-- top especies -->
    <section class="contenedor topEspecies" v-if="homeStore.topSpecies.length > 0">

        <h3 class="topEspecies__heading">Top especies más buscadas</h3>
        <div class="topEspecies__grid">
            <!-- especie -->
            <div class="topEspecie__contenido" v-for="specie in homeStore.topSpecies" :key="specie.cod_especie">
                <div class="topEspecie__contenido-imagen" :style="{
                    backgroundImage:
                        'url(' + getFullImageUrl(specie.images[0].img_general) + ')',
                }">
                    <a class="topEspeice__enlace animacion" @click="consulta.consultSpecie(specie.code_specie)"><span
                            class="animacion__text">{{ specie.vernacularName.split(' ')[0] }}</span></a>
                </div>
            </div>
            <!--fin especie -->
        </div>
        <div class="viewSpecies">
            <button @click="goToViewSpecies()">Ver Todas las especies</button>
        </div>

    </section>
</template>

<style scoped>
/* top especies **********************************/
.topEspecies {
    margin-top: 3rem;
}

.topEspecies__heading {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}

@media (min-width: 768px) {
    .topEspecies {
        margin-top: 10rem;
    }

    .topEspecies__heading {
        font-size: 2rem;
        margin-bottom: 2rem;
    }
}

@media (min-width: 992px) {
    .topEspecies__heading {
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
        column-gap: 1rem;
    }
}

@media (min-width: 1340px) {
    .topEspecies__grid {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
    }
}
@media (min-width: 1920px) {
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
    font-size: 1.5rem;
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

.topEspeice__enlace:hover {
    color: var(--blanco);
}

.animacion__text {
    position: relative;
    z-index: 2;
}

.topEspeice__enlace span {
    text-align: left;
}

.animacion::after {
    content: "";
    width: 100%;
    position: absolute;
    z-index: 1;
    transition: 0.3s ease-in-out all;
    top: 0;
    left: calc(-100% - 75px);
    /* calc elemnt widht with border-right */
    border-right: 80px solid transparent;
    border-bottom: 40px solid var(--primary);
    transition: 0.3s ease-in-out all;
}

.animacion:hover::after {
    left: 0;
}

.viewSpecies {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -1rem;
}

.viewSpecies button {
    border: none;
    background: none;
    color: white;
    background-color: var(--gris);
    font-weight: bold;
    padding: .5rem 1rem;
    border-radius: 10px;
    transition: all .2s ease-in-out;
}

.viewSpecies button:hover {
    background-color: var(--primary);
}
</style>
