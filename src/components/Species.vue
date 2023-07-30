<script setup>
import {useEspeciesStore} from '../stores/species'



const especies = useEspeciesStore()

 defineProps({
    especie:{
        type:Object
    }
 })
</script>
<template>
    <div class="border shadow-lg ">        
        <div class="overflow-hidden rounded-lg">
            <img 
                class="hover:scale-110  transition-transform hover:rotate-1"
                src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg"
            >
        </div>
        <div class="p-5">    
            <h2 class="text-2xl font-extrabold truncate">{{especie.nom_comunes}}</h2>        
            <p class="block truncate">{{especie.nombre_cientifico}}</p>
            <button 
                type="button"
                class="w-full bg-customGreen hover:bg-green-900 text-white rounded-lg p-2 mt-3 mb-4 font-bold text-2xl"
                @click="especies.seleccionarEspecie(especie.nom_comunes)"
            >
                Ver Especie
            </button>
        </div>
        
    </div>
</template>
