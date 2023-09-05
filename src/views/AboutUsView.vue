<script setup>
import { onMounted } from "vue";
import { usePageContent } from '../stores/page'

const pageStore = usePageContent();
console.log('data about: ', pageStore.fetchData)

onMounted(async () => {
    await pageStore.fetchData();
});
</script>

<template>
    <h1>About us</h1>
</template>

<style scoped>
</style>