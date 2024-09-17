<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { RouterLink } from "vue-router";
import { useNurseriesStore } from "@/stores/nurseries";
import ButtonTop from '@/components/shared/ButtonTop.vue';

const valueSearched = ref("");
const isSearching = computed(() => valueSearched.value !== "");

const nurseries = useNurseriesStore();

const displayedPageRange = computed(() => {
  const currentPage = nurseries.currentPage;
  const totalPages = nurseries.totalPages;
  const rangeStart = Math.max(1, currentPage - 1);
  const rangeEnd = Math.min(totalPages, rangeStart + 3);

  return Array.from(
    { length: rangeEnd - rangeStart + 1 },
    (_, index) => rangeStart + index
  );
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const performSearch = () => {
  nurseries.searchTerm(valueSearched.value);
};

// Debounce function
const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Debounced search
const debouncedSearch = debounce(performSearch, 300);

// Watch for changes in valueSearched
watch(valueSearched, () => {
  debouncedSearch();
});

onMounted(async () => {
  scrollToTop();
});
</script>

<template>
  <div class="nurseries">
    <!-- init header -->
    <header class="header">
      <div class="header__content">
        <div class="header__form">
          <h1 class="header__title">Listado de Viveros</h1>
          <div class="form">
            <input
              class="form__input"
              type="text"
              placeholder="Buscar un vivero o especie"
              v-model="valueSearched"
              @input="performSearch"
            />
            <div class="form__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
          <p class="form__results" v-if="isSearching">
            para {{ valueSearched }}
          </p>
          <p class="form__results" v-else>
            Buscar un vivero o especie forestal
          </p>
        </div>
      </div>
    </header>
    <!-- end header -->
    <main class="main">
      <div class="results__grid">
        <!-- nurseries -->
        <article class="card" v-for="nursery in nurseries.paginatedNurseries" :key="nursery.id">
          <div class="card__image-container">
            <div class="card__image">
              <img :src="nursery.image_url || '/img/no_img_nurseries.png'" :alt="nursery.nombre_vivero" class="nursery-image">
            </div>
          </div>
          <div class="card__contact">
            <div class="card__information">
              <h5 class="card__title">{{ nursery.nombre_vivero }}</h5>
              <div class="information">
                <p>
                  <span class="information__title">Rep. Legal:</span>
                  <span>{{ nursery.first_name }} {{ nursery.last_name }}</span>
                </p>
                <p>
                  <span class="information__title">Departamento:</span> 
                  <span>{{ nursery.departamento }}</span>
                </p>
                <p>
                  <span class="information__title">Municipio:</span> 
                  <span>{{ nursery.municipio }}</span>
                </p>

                <a
                  style="color: var(--primary); margin-top: 1rem"
                  :href="`https://api.whatsapp.com/send?phone=57${nursery.phone_number}&text=Hola, me puedes dar información sobre el vivero ${nursery.nombre_vivero}?`"
                  ref="noopener noreferrer"
                  target="_blank"
                >
                <span class="information__title">WhatsApp</span>
                  <font-awesome-icon :icon="['fab', 'whatsapp']" />
                </a>
              </div>
            </div>
            <div class="buttons__information">
              <RouterLink
                class="card__button"
                :to="{ name: 'nursery' }"
                @click="nurseries.getNursery(nursery)"
              >
                Especies
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </main>
    <!-- Paginador -->
    <section class="paginador">
      <div class="paginador__botones">
        <button class="paginador__boton paginador__boton--inicio" v-if="nurseries.currentPage > 1"
          @click="nurseries.goToFirstPage">
          <font-awesome-icon :icon="['fas', 'angle-double-left']" />
        </button>

        <button class="paginador__boton paginador__boton--anterior" v-if="nurseries.currentPage > 1"
          @click="nurseries.changePage(nurseries.currentPage - 1)">
          <font-awesome-icon :icon="['fas', 'angle-left']" />
        </button>

        <button v-for="page in displayedPageRange" :key="page" @click="nurseries.changePage(page)"
          class="paginador__boton" :class="{ 'paginador__boton-actual': page === nurseries.currentPage }">
          {{ page }}
        </button>

        <button class="paginador__boton paginador__boton--siguiente" v-if="nurseries.currentPage < nurseries.totalPages"
          @click="nurseries.changePage(nurseries.currentPage + 1)">
          <font-awesome-icon :icon="['fas', 'angle-right']" />
        </button>

        <button class="paginador__boton paginador__boton--final" v-if="nurseries.currentPage < nurseries.totalPages"
          @click="nurseries.goToLastPage">
          <font-awesome-icon :icon="['fas', 'angle-double-right']" />
        </button>
      </div>

      <div class="paginador__info">
        Página {{ nurseries.currentPage }} de {{ nurseries.totalPages }}
      </div>
    </section>
  </div>
  <ButtonTop/>
</template>

<style scoped>
/* nurseries */
.nurseries {
  margin-bottom: 10rem;
}
/* header */
.header__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--blanco);
  text-transform: uppercase;
  text-align: center;
}

.header {
  background-image: url("/img/bannersViews/banner-nurseries.jpg");
  height: 40rem;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  color: white;
  width: 100%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

@media (min-width: 768px) {
  .header {
    height: 40rem;
  }
}

.header__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.header__form {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .header__form {
    width: 80%;
    margin-top: 11rem;
  }
}

/* form header */
.form {
  padding: 0.3rem;
  display: flex;
  gap: 0.2rem;
  justify-content: baseline;
  background: var(--blanco);
  margin: 0 auto;
  border-radius: 1.2rem;
  width: 80%;
}

.form__input {
  padding: 0.5rem;
  width: 100%;
  border-radius: 1rem;
  font-size: 0.95rem;
}
.form__icon {
  width: 2rem;
  color: var(--gris);
  display: flex;
}
.form__results {
  text-align: center;
  max-width: 80%;
  margin: 1rem auto;
}
@media (min-width: 768px) {
  .form {
    width: 60%;
  }
  .form__input {
    padding: 0.8rem;
    border-radius: 1rem;
    font-size: 1rem;
  }
  .form__icon {
    width: 2rem;
    color: var(--gris);
    display: flex;
  }
}

/* main */
.main {
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .main {
    display: flex;
    margin: 0 auto;
    margin-top: 5rem;
  }
}
.results__grid {
  display: grid;
  gap: 1.5rem;
  width: 95%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .results__grid {
    width: 50%;
  }
}

/* card */
.card {
  border: 1px solid var(--primary);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.03);
  padding: 1rem;
}

@media (min-width: 768px) {
  .card {
    border: none;
    flex-direction: row;
  }
}

.card__img {
  width: 100%;
  height: 300px;
}
.card__contact {
  position: relative;
  width: 100%;
}
.card__title {
  font-size: 1.1rem;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  text-transform: uppercase;
  text-align: center;
  color: var(--primary);
}

@media (min-width: 768px) {
  .card__title {
    font-size: 1.5rem;
  }
}

.card__image-container {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card__image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nursery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* section card information */
.information {
  display: flex;
  flex-direction: column;
  padding: 0 5rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .information {
    margin-bottom: 3rem;
  }
}

.information p {
  margin: 0;
  padding: 0;
  color: var(--gris);
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.information__title {
  font-weight: bold;
  margin-right: 0.5rem;
}

.buttons__information{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card__button {
  display: inline-flex;
  background-color: var(--blanco);
  color: var(--gris);
  border: none;
  padding: 5px 20px;
  text-align: center;
  display: inline-block;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: 2px solid var(--primary);
  transition: ease-in-out 0.3s all;
  margin-bottom: 2rem;
}

.card__button:hover {
  background-color: var(--primary);
  color: var(--blanco);
  border-radius: 4px;
}
@media (min-width: 768px) {
  .card__button {
    font-size: 1rem;
  }
}

.paginador__botones {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.paginador__boton {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.paginador__boton:hover {
  background-color: var(--primary-hover);
}

.paginador__boton-actual {
  background-color: var(--secondary);
  font-weight: bold;
}

.paginador__info {
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 2rem;
}
</style>
