<script setup>

import {useFamiliasStore} from '../stores/families'

import Family from '../components/Family.vue';

const familias = useFamiliasStore()

</script>
<template>
    <div>
        <h1 class="text-4xl mb-10 mt-20 text-center font-extrabold">Listado de familias</h1>
        <hr>
        <h3 class="text-justify text-2xl my-10">
            En el contexto de las especies forestales y la taxonomía biológica, 
            una "familia" es una categoría de clasificación que agrupa a un conjunto 
            de plantas que comparten ciertas características similares y están relacionadas 
            evolutivamente.
        </h3>
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