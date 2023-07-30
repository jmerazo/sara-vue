<script setup>
import {useGlossaryStore} from '../stores/glossary'

const glossary = useGlossaryStore()

</script>

<template>
    <div class="w-auto mx-auto">
        <h1 class="text-6xl mb-10 mt-20 text-center font-extrabold">Glosario</h1>
        <hr>
        <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 mt-10 gap-10 my-10">
            <div class="bg-customGreen rounded-lg p-4 shadow-lg backdrop-filter backdrop-blur-md bg-opacity-20"
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