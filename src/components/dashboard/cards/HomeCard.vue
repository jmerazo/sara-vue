<script setup>
import { Icon } from '@iconify/vue';
import { useChartsStore } from '@/stores/dashboard/charts'
import { useEspeciesStore } from '@/stores/species'
const species = useEspeciesStore()
const charts = useChartsStore()

</script>

<template>
  <div>
    <div>

      <div class="card__data card__data--tree" v-if="charts.departamentos.length > 0">

        <div class="card__box">
          <div>
            <h3 class="card__cant">{{ species.speciesOriginals.length }}</h3>

            <p class="card__text">Total de Especies forestales</p>
          </div>
          <div class="image">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 7.26214 17.9831 7.5207 17.9504 7.77457C19.77 8.80413 21 10.7575 21 13C21 16.3137 18.3137 19 15 19H13V22H11V19H8.5C5.46243 19 3 16.5376 3 13.5C3 11.2863 4.30712 9.37966 6.19098 8.50704C6.06635 8.02551 6 7.52039 6 7ZM7.00964 10.3319C5.82176 10.8918 5 12.1008 5 13.5C5 15.433 6.567 17 8.5 17H15C17.2091 17 19 15.2091 19 13C19 11.3056 17.9461 9.85488 16.4544 9.27234L15.6129 8.94372C15.7907 8.30337 16 7.67183 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 8.30783 8.6266 9.46903 9.60019 10.2005L8.39884 11.7995C7.85767 11.3929 7.38716 10.8963 7.00964 10.3319Z">
              </path>
            </svg>
          </div>
        </div>
      </div>

      <div class="card__data card__data--city" v-if="charts.municipios.length > 0">

        <div class="card__box">
          <div>

            <h3 class="card__cant">{{ charts.municipios.length }}</h3>
            <p class="card__text">Municipios partícipes</p>
          </div>
          <div class="image">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M21 21H3C2.44772 21 2 20.5523 2 20V12.4868C2 12.1978 2.12501 11.9229 2.34282 11.733L6 8.54435V4C6 3.44772 6.44772 3 7 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21ZM9 19H12V12.9416L8 9.45402L4 12.9416V19H7V15H9V19ZM14 19H20V5H8V7.12729C8.23444 7.12729 8.46888 7.20938 8.65718 7.37355L13.6572 11.733C13.875 11.9229 14 12.1978 14 12.4868V19ZM16 11H18V13H16V11ZM16 15H18V17H16V15ZM16 7H18V9H16V7ZM12 7H14V9H12V7Z">
              </path>
            </svg>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.card__text {
  font-size: 1rem;
  margin: 0;
  padding: 0;
}

.image svg {
  width: 3rem;
  opacity: 0.6;
  transition: all .3s ease-in-out;
}

.card__cant {
  font-size: 2rem;
  margin: 0;
  padding: 0;
 
}

.card__box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  
}

.card__data {
  margin-bottom: 2rem;
  padding: 1rem;
  color: var(--blanco);
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  
}

.card__data:hover .image svg {
  transform: scale(1.2);
  
}

.card__data--tree {
  background-color: #17a576;
}

.card__data--city {
  background-color: #c8cf5a;
  color: var(--gris);
}
</style>
