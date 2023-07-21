<script setup>

</script>

<template>
<div class="w-auto text-xs flex flex-col min-w-[400px] justify-center items-center grid grid-rows-1 grid-row-gap-0">
    <div class="information-sara">
      <div class="text-information w-full">
        <span class="title-information font-bold">PROYECTO SEMILLAS CTEI</span><br><br>
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
      <div class="imagen-information w-full rounded-lg">
        <div class="flex flex-col items-center">
          <div class="flex justify-center">
        <div class="overflow-hidden h-8 bg-pastel-green rounded-md">
          <h2 class="text-xl font-bold text-center animate-marquee">TOP ESPECIES</h2>
        </div>
      </div>
          <div class="flex justify-center">
            <div class="relative mr-4">
              <img src="../assets/media/algarrobo.jpg" class="img-information rounded-lg w-40 h-40 object-cover" />
              <span class="text-white font-bold text-xs text-center absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-lg">Algarrobo</span>
            </div>
            <div class="relative mr-4">
              <img src="../assets/media/gualanday.jpg" class="img-information rounded-lg w-40 h-40 object-cover" />
              <span class="text-white font-bold text-xs text-center absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-lg">Gualanday</span>
            </div>
            <div class="relative">
              <img src="../assets/media/nogal_cafetero.jpg" class="img-information rounded-lg w-40 h-40 object-cover" />
              <span class="text-white font-bold text-xs text-center absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-lg">Nogal Cafetero</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="colaborators">
        <a href="https://minciencias.gov.co/"><img src="../assets/minciencias-logo.png" class="log-minciencia fixed-between hover:scale-110"></a>
        <a href="https://www.corpoamazonia.gov.co/"><img src="../assets/corpoamazonia.png" class="log-corpoamazonia fixed-between hover:scale-110"></a>
        <a href="https://www.sgr.gov.co/"><img src="../assets/sgr.png" class="log-sgr fixed-between hover:scale-110"></a>
        <a href="https://www.putumayo.gov.co/"><img src="../assets/gobernacion-putumayo.png" class="log-gobernacion fixed-between hover:scale-110"></a>
        <a href="https://itp.edu.co/ITP2022/"><img src="../assets/logoitp.png" class="log-itp fixed-between hover:scale-110"></a>
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

  background-color: #b6dfbb;
  padding: 1rem;
}

.relative {
  position: relative;
}

.img-information {
  cursor: pointer;
  transition: transform 0.3s;
}

.img-information:hover {
  transform: scale(1.1);
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 5s linear infinite;
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
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




