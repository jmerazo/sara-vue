<script setup>
import {useGlossaryStore} from '../stores/glossary'

const glossary = useGlossaryStore()

</script>

<template>
    <div class="w-auto mx-auto">
        <h1 class="text-6xl mb-20 mt-5 text-center font-extrabold">Glosario</h1>
        <hr>
        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-10 gap-10 my-10">
            <div class="bg-green-400 rounded-lg p-4 shadow-lg backdrop-filter backdrop-blur-md"
                v-for="g in glossary.glossary"
                :key="g.id"
            >
                <strong class="font-bold">{{ g.word }}:</strong> {{ g.definition }}
            </div>
            
        </div>

    </div>

</template>

<style>

</style>