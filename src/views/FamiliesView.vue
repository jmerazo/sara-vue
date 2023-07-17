<script setup>

import {useFamiliasStore} from '../stores/families'

import Family from '../components/Family.vue';

const familias = useFamiliasStore()

</script>
<template>
    <div>
        <h1 class="text-6xl mb-20 mt-5 text-center font-extrabold">Listado de familias</h1>
        <hr>
       <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 mt-10 gap-10 my-10">
            <Family
                v-for="familia in familias.familias" 
                :key="familia.familia"
                :familia="familia"
            >
                
            </Family>
            
        </div>
    </div>
</template>