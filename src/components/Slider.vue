<script setup>
import { onMounted } from "vue";
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.css';
import '@glidejs/glide/dist/css/glide.theme.css';

onMounted(() => {
    new Glide('.glide', {
        type: 'carousel',
        autoplay: 5000,
        animation: 'fade',
        gap: 0,
        animationDuration: 0
    }).mount();
});
</script>

<template>
    <div class="glide w-full h-650px">
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides">
            <li class="glide__slide">
              <img src="../assets/media/pi1.jpg" />
            </li>
            <li class="glide__slide">
              <img src="../assets/media/pi2.jpg" />
            </li>
            <li class="glide__slide">
              <img src="../assets/media/pi3.jpg" />
            </li>
            <li class="glide__slide">
              <img src="../assets/media/pi4.jpg" />
            </li>
            <li class="glide__slide">
              <img src="../assets/media/P001.jpg" />
            </li>
          </ul>
        </div>
        <div class="glide__bullets" data-glide-el="controls[nav]">
          <button class="glide__bullet" data-glide-dir="=0"></button>
          <button class="glide__bullet" data-glide-dir="=1"></button>
          <button class="glide__bullet" data-glide-dir="=2"></button>
        </div>
    </div>
</template>