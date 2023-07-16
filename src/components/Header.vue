<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import {useFamiliasStore} from '../stores/families'

const route = useRoute();
const paginaInicio = computed(() => route.name === "home");

const familias = useFamiliasStore()

</script>

<template>
    <header
        class="bg-navbar"
        :class="{header : paginaInicio}"
    >
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
    .header {
        background-image: url('../assets/media/r1.jpg');
        background-size: cover;
        background-position: center;
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