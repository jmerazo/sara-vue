<script setup>
 
  
</script>

<template>
  
  <div class="w-auto text-xs flex flex-col min-w-[400px] justify-center items-center ">
    <div class="imagen-information w-full rounded-lg mb-10">
      <div class="flex flex-col items-center">
        <div class="flex justify-center">
          <div class="marquee-container">
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
          <div class="relative mr-4">
            <img src="../assets/media/nogal_cafetero.jpg" class="img-information rounded-lg w-40 h-40 object-cover" />
            <span class="text-white font-bold text-xs text-center absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-lg">Nogal Cafetero</span>
          </div>
          <div class="relative mr-4">
            <img src="../assets/media/gualanday.jpg" class="img-information rounded-lg w-40 h-40 object-cover" />
            <span class="text-white font-bold text-xs text-center absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-lg">Gualanday</span>
          </div>
          <div class="relative mr-4">
            <img src="../assets/media/gualanday.jpg" class="img-information rounded-lg w-40 h-40 object-cover" />
            <span class="text-white font-bold text-xs text-center absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-lg">Gualanday</span>
          </div>
          <div class="relative mr-4">
            <img src="../assets/media/gualanday.jpg" class="img-information rounded-lg w-40 h-40 object-cover" />
            <span class="text-white font-bold text-xs text-center absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-lg">Gualanday</span>
          </div>
          <div class="relative mr-4">
            <img src="../assets/media/gualanday.jpg" class="img-information rounded-lg w-40 h-40 object-cover" />
            <span class="text-white font-bold text-xs text-center absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-lg">Gualanday</span>
          </div>
          <div class="relative mr-4">
            <img src="../assets/media/gualanday.jpg" class="img-information rounded-lg w-40 h-40 object-cover" />
            <span class="text-white font-bold text-xs text-center absolute top-0 left-0 right-0 p-2 bg-black bg-opacity-50 rounded-lg">Gualanday</span>
          </div>
        </div>
      </div>
    </div>  

    <div class="information-sara flex flex-row">
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
    </div>

    <div class="colaborators flex flex-row">
        <a href="https://minciencias.gov.co/"><img src="../assets/logos/mc-vida.png" class="log-minciencia fixed-between hover:scale-110"></a>
        <a href="https://www.corpoamazonia.gov.co/"><img src="../assets/logos/corpoamazonia.png" class="log-corpoamazonia fixed-between hover:scale-110"></a>
        <a href="https://www.sgr.gov.co/"><img src="../assets/logos/sgr.png" class="log-sgr fixed-between hover:scale-110"></a>
        <a href="https://www.putumayo.gov.co/"><img src="../assets/logos/gp.png" class="log-gobernacion fixed-between hover:scale-110"></a>
        <a href="https://itp.edu.co/ITP2022/"><img src="../assets/logos/itp.png" class="log-itp fixed-between hover:scale-110"></a>
    </div>
  </div>
  
</template>

<style scoped>
.information-sara {
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 25px;
}
.text-information {
  text-align: justify;
  grid-column-start: 1;
  grid-column-end: 2;
}

.marquee-container {
  width: 100%; /* Ajusta el ancho según tus necesidades */
  overflow: hidden;
  margin-bottom: 20px;
}


.imagen-information {
  grid-column-start: 2;
  grid-column-end: 3;
  color: #262f21;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
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
  margin-bottom: 20px;

  align-items: center;
  justify-content: center;

  background-color: #ffffff;
}


.log-minciencia {
  width: auto;
  height: 10vh;
}

.log-corpoamazonia {
  width: auto;
  height: 10vh;
}

.log-gobernacion {
  width: auto;
  height: 10vh;
}

.log-sgr {
  width: auto;
  height: 10vh;
}

.log-itp {
  width: auto;
  height: 10vh;
}

.fixed-between {
  margin-right: 50px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>




