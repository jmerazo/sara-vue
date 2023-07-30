<script setup>

import {useEspeciesStore} from '../stores/species'
import Species from '../components/Species.vue';

const especies = useEspeciesStore()

</script>
<template>
    <div>
        <h1 class="text-4xl mb-10 mt-20 text-center font-extrabold">Listado de especies</h1>
        <hr>
       <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-10 gap-10 my-10">
            <Species
                v-for="especie in especies.especies" 
                :key="especie.ShortcutID"
                :especie="especie"
                class="rounded-lg"
            >                
            </Species>            
        </div>
    </div>
</template>


