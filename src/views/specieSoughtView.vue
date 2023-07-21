<script setup>
import QuoteButton from '../components/QuoteButton.vue'
import PagesQueries from '../components/PagesQueries.vue';
</script>
<template>
    <QuoteButton></QuoteButton>
    <div class="md:flex mb-6 gap-4 p-4">
    
        <div class="w-3/4 rounded-lg shadow-lg  px-14">
            <h1 class="text-lg font-extrabold text-slate-900 mt-10">Nombre especie - Nombre científico</h1>
            <h3 class="font-bold text-slate-500 ">Otros nombres</h3>
            <br>
            <img class="mb-10 h-72 rounded-lg" src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg" alt="">
            <h4 class="font-bold">Distribución</h4>
            <p class="text-justify mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem dolorum unde ipsum labore rerum, molestias sequi, nam ipsa tempora, odit expedita quam. Consequuntur tempore, iusto natus aspernatur accusamus perferendis. Maxime.</p>

            <div class="flex gap-3 mt-10 ">
                <div class="w-1/3">
                    <img class="rounded-lg hover:scale-150 transition-transform" src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg" alt="">
                </div>
                <div class="w-1/3">
                    <img class="rounded-lg hover:scale-150 transition-transform" src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg" alt="">
                </div>
                <div class="w-1/3">
                    <img class="rounded-lg hover:scale-150 transition-transform" src="https://miputumayo.com.co/wp-content/uploads/2015/06/%C3%81rbol-emergente.-PNN-Amacayacu-20-09-2011.jpg" alt="">
                </div>
            </div>
        </div>


        <div class="w-1/4 bg-green-200 rounded-lg shadow-lg p-4">
            <h1 class="text-lg font-extrabold text-slate-900">Información de la especie</h1>
            <hr>

            <h4 class="text-center font-bold mt-5 mb-2">Hojas</h4>
            <p class="text-justify">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta debitis ea maxime, cupiditate, laborum odit magni facilis asperiores harum voluptates blanditiis sapiente ratione, dolores eos velit nam sint sunt. Id!</p>
            <img class="px-10 mb-14 rounded-lg mt-3" src="https://inaturalist-open-data.s3.amazonaws.com/photos/24715/large.jpg" alt="">
            
            <h4 class="text-center font-bold mt-5 mb-2">Flores</h4>
            <p class="text-justify">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta debitis ea maxime, cupiditate, laborum odit magni facilis asperiores harum voluptates blanditiis sapiente ratione, dolores eos velit nam sint sunt. Id!</p>
            <img class="px-10 mb-14 rounded-lg mt-3" src="https://img.freepik.com/fotos-premium/flores-amarillas-arbol-hoja-perenne-cassia-isla_136404-734.jpg" alt="">

            <h4 class="text-center font-bold mt-5 mb-2">Frutos</h4>
            <p class="text-justify">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta debitis ea maxime, cupiditate, laborum odit magni facilis asperiores harum voluptates blanditiis sapiente ratione, dolores eos velit nam sint sunt. Id!</p>
            <img class="px-10 mb-14 rounded-lg mt-3" src="https://img.freepik.com/fotos-premium/fruta-granada-madura-colgando-jardin-espacio-copiar_150101-4103.jpg" alt="">
        </div>
    </div>
    <PagesQueries></PagesQueries>    
</template>