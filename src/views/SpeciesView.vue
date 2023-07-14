<script setup>

import {useEspeciesStore} from '../stores/species'
import Species from '../components/Species.vue';

const especies = useEspeciesStore()

</script>
<template>
    <div>
       <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-10 gap-10 my-10">
            <Species
                v-for="especie in especies.especies" 
                :key="especie.ShortcutID"
                :especie="especie"
            >
                
            </Species>
            
        </div>
    </div>
</template>


