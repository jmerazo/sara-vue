<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules'
import { onMounted } from 'vue';
</script>

<template>
<div class="w-auto text-xs flex flex-col min-w-[400px] justify-center items-center grid grid-rows-1 grid-row-gap-0">
    <div class="information-sara">
      <div class="text-information">
        <span class="title-information">PROYECTO SEMILLAS CTEI</span><br><br>
        <p class="p-h">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec ultricies nisi. Cras in posuere orci, quis lobortis urna. 
          Nulla congue velit et viverra vehicula. Nunc ut ligula purus. Phasellus vitae ultrices lacus. Cras efficitur imperdiet orci, 
          eu faucibus nibh placerat ut. Aenean tincidunt dolor a turpis aliquet, ac commodo augue bibendum. Maecenas tincidunt sed nibh faucibus convallis.

          Maecenas eu vehicula enim. Nunc pellentesque hendrerit quam, sit amet euismod justo consequat consequat. Morbi dignissim placerat lacus, 
          sed luctus nunc fermentum id. Morbi aliquam dolor sit amet risus molestie congue. Etiam in urna id lacus facilisis suscipit. In vehicula mi dictum 
          orci tempor gravida. Aenean ut ex in dui consequat commodo non quis ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, 
          per inceptos himenaeos. Morbi et pharetra turpis. Morbi quis nulla pretium, suscipit lorem sit amet, aliquam nulla. Mauris rutrum ultricies sapien eu aliquet. 
          Ut vitae nulla non sapien finibus euismod. Etiam quis neque laoreet, sodales diam gravida, sodales diam.
        </p>
      </div>
      <div class="imagen-information">
        <img src="../assets/tree.png" class="img-information">
      </div>
    </div>

    <div class="colaborators">
        <img src="../assets/minciencias-logo.png" class="log-minciencia fixed-between">
        <img src="../assets/corpoamazonia.png" class="log-corpoamazonia fixed-between">
        <img src="../assets/sgr.png" class="log-sgr fixed-between">
        <img src="../assets/gobernacion-putumayo.png" class="log-gobernacion fixed-between">
        <img src="../assets/logoitp.png" class="log-itp fixed-between">
    </div>
</div>

</template>

<style scoped>
.information-sara {
  width: 85vw;
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;

  grid-row-start: 1;
  grid-row-end: 2;
  
  display: grid;
  grid-template-columns: 1fr .2fr;
}

.title-information{
  font-weight: bold;
}

.text-information {
  text-align: justify;
  grid-column-start: 1;
  grid-column-end: 2;
}

.imagen-information {
  grid-column-start: 2;
  grid-column-end: 3;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
}

.img-information {
  width: 220px;
  height: 172px;
}

.p-h {
  text-align: justify;
}
.colaborators {
  width: 100vw;
  height: auto;
  display: flex;

  align-items: center;
  justify-content: center;

  background-color: #EDF1D6;
}


.log-minciencia {
  width: 25vw;
  height: auto;
}

.log-corpoamazonia {
  width: 7vw;
  height: auto;
}

.log-gobernacion {
  width: 6vw;
  height: auto;
}

.log-sgr {
  width: 12vw;
  height: auto;
}

.log-itp {
  width: 5vw;
  height: auto;
}

.fixed-between {
  margin-right: 50px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>




