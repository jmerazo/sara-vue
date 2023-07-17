<script setup>
defineProps({
  familia: {
    type: Object,
  },
});
//class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
</script>
<template>
  <div
    
  >
    <div class="md:flex">
      <div class="md:w-1/3 p-8 justify-content-center flex">
        <!-- Contenido de la sección 1 -->
        <img
          src="../assets/gifFamlia.gif"
          alt="GIF de la especie"
        />
      </div>

      <div class="md:w-1/2">
        <div class="mb-6">
          <h2 class="text-3xl font-bold mb-2">{{familia.familia}}</h2>
          <p class="text-justify text-xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
            consequuntur vel in ex eveniet aut at aspernatur necessitatibus unde
            ducimus vero fugiat sint reiciendis aperiam odio deleniti, qui rem
            voluptatum.
          </p>
        </div>
        <div class="flex items-center">
          <button
            class="shadow-lg bg-green-800 hover:bg-green-900 flex items-center justify-center w-full p-3 text-bold text-3xl text-white rounded-lg"
          >
            Ver individuos
          </button>
        </div>
      </div>
    </div>
  </div>
</template>