<script setup>
import { computed, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import {useFamiliasStore} from '../stores/families'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.css'
import '@glidejs/glide/dist/css/glide.theme.css'

const route = useRoute();
const paginaInicio = computed(() => route.name === "home");

const familias = useFamiliasStore()

onMounted(() => {
    const glide = new Glide('.glide', {
        type: 'carousel',
        autoplay: 5000
    });
});
</script>

<template>
    <header
        class="bg-navbar"
        :class="{header : paginaInicio}"
    >
    <div v-if="paginaInicio" class="header-slider">
        <div class="glide w-full h-650px">
        <div class="glide__track" data-glide-el="track">
            <ul class="glide__slides">
                <li class="glide__slide">
                    <img src="../assets/media/r1.jpg" />
                </li>
                <li class="glide__slide">
                    <img src="../assets/media/r2.jpg" />
                </li>
                <li class="glide__slide">
                    <img src="../assets/media/r3.jpg" />
                </li>      
            </ul>
        </div>
        <div class="glide__bullets" data-glide-el="controls[nav]">
            <!-- Agrega tus controles de navegación aquí si es necesario -->
        </div>
    </div>

    </div>
    
        <div class="fixed-between-navbar py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink
                        :to="{name: 'home'}"
                    >
                        <img class="w-32" src="../assets/sara.png" alt="Logotipo" />
                    </RouterLink>
                </div>

                <nav class="flex gap-4 text-white ">
                    <RouterLink
                        :to="{name: 'home'}"
                        class="text-2xl  rounded-lg p-2 hover:bg-green-900 uppercase font-bold"
                        active-class="text-green-500"
                    >
                        Inicio
                    </RouterLink>

                    <RouterLink
                        :to="{name: 'especies'}"
                        class="text-2xl  rounded-lg p-2 hover:bg-green-900 uppercase font-bold"
                        active-class="text-green-500"
                    >
                        Especies
                    </RouterLink>
                    <RouterLink
                        :to="{name: 'familias'}"
                        class="text-2xl  rounded-lg p-2 hover:bg-green-900 uppercase font-bold"
                        active-class="text-green-500"
                    >
                        Familias
                    </RouterLink>

                    <RouterLink
                        :to="{name: 'glossary'}"
                        class="text-2xl  rounded-lg p-2 hover:bg-green-900 uppercase font-bold"
                        active-class="text-green-500"
                    >
                        Glosario
                    </RouterLink>
                </nav>
            </div>

            <div>
                
            </div>
            <form
                v-if="paginaInicio"
                class="md:w-1/2 2xl:w-1/3 bg-green-700 my-32 p-10 rounded-lg shadow space-y-6 bg-opacity-30 form-blur"
                @submit.prevent="handleSubmit"
            >
                <div class="space-y-4">
                    <label
                        class="block text-white uppercase font-extrabold text-lg"
                        for="ingrediente">Buscar</label>
                        <select 
                        id="categoria"
                        class="text-base p-3 w-full rounded-lg focus:outline-none font-bold"
                        
                    >
                        <option value="">Seleccione una opción... </option>
                        <option> Familia </option>
                        <option> Nombre común </option>
                        <option> Nombre científico </option>
                        <!-- <option v-for="familia in familias.familias" :key="familia.familias"> {{familia.familia}} </option> -->
                    </select>
                </div>

                <div class="space-y-4">
                    <label
                        class="block text-white uppercase font-extrabold text-lg"
                        for="parametro">Valor a buscar</label>
                    <input 
                        id="parametro"
                        class="text-base p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Familia, nombre científico o nombre común"
                    >
                </div>
                    
                <input
                    type="submit"
                    class="bg-button-search cursor-pointer  font-extrabold w-full p-2 rounded-lg uppercase"
                    value="Buscar"
                />
            </form>
        </div>

    </header>
</template>

<style>
    /* .header {
        background-image: url('../assets/media/r1.jpg');
        background-size: cover;
        background-position: center;
    } */

    .glide {
        position: relative;
        background-size: cover;
        background-position: center;
        z-index: -999;
    }

    .header-slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -999;
    }

    .header-slider .glide__slide img {
        object-fit: cover;
        width: 100%;
        height: 850px;
    }

    .form-blur {
        backdrop-filter: blur(10px);
    }

    .bg-navbar {
        background-color: #273323;
        backdrop-filter: blur(10px);
    }

    .bg-button-search {
        background-color: #96c287;
        color: white;
    }

    .bg-button-search:hover {
        background-color: #a1ad9d;
        color: #273323;
    }

    .fixed-between-navbar{
        margin-left: 200px;
        margin-right: 200px;
    }
</style>