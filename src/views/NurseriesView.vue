<script setup>
import { computed, ref } from "vue";

const valueSearched = ref("");
const isSearching = computed(() => valueSearched.value !== "");
const isMap = ref(false);

const toggleMap = () => {
  isMap.value = !isMap.value;
};

const showEmailForm = ref(false);

const toggleEmailForm = () => {
  showEmailForm.value = !showEmailForm.value;
};
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
        <article class="card">
          <div class="card__contact">
            <div class="card__information">
              <h5 class="card__title">Amazonia Emprende</h5>
              <div class="information">
                <p>R/Legal: Ferney Alexander Garreta Muchavisoy</p>
                <p>Departamento: Putumayo</p>
                <p>Municipio: Mocoa</p>
                <a style="color: var(--primary); margin-top: 1rem" href="#"
                  >WhatsApp
                  <font-awesome-icon :icon="['fab', 'whatsapp']" />
                </a>
              </div>
            </div>
            <div class="buttons__information">
              <button class="card__email-button__form" @click="toggleEmailForm">
                Enviar Email
              </button>
            </div>

            <form
              class="form__customer"
              :class="{ 'form__customer--show': showEmailForm }"
            >
              <div class="field">
                <label class="form__customer__label" for="email-customer"
                  >Correo:</label
                >
                <input
                  class="form__customer__input"
                  type="email"
                  id="email-customer"
                  name="email-customer"
                  placeholder="Ingresa tu correo"
                  required
                />
              </div>

              <div class="field">
                <label class="form__customer__label" for="message"
                  >Mensaje:</label
                >
                <textarea
                  class="form__customer__textarea"
                  id="message"
                  name="message"
                  rows="2"
                  placeholder="Escribe tu mensaje aquí"
                  required
                ></textarea>
              </div>
              <div class="form__customer__buttons">
                <button type="submit" class="button__form animation send">
                  <span>Enviar</span>
                </button>
                <button
                  type="button"
                  class="button__form"
                  @click="toggleEmailForm"
                >
                  <span>Cancelar</span>
                </button>
              </div>
            </form>
          </div>

          <div class="card__species">
            <div class="species__heading">
              <h5 class="species__tittle">Especies disponibles</h5>
              <font-awesome-icon
                @click="toggleMap"
                class="icon__map"
                :icon="['fas', 'map-location-dot']"
              />
            </div>
            <img
              v-if="isMap"
              class="card__img"
              src="https://cloudfront-us-east-1.images.arcpublishing.com/semana/WN2AZLWIYBEJZI7RC7XT5NCXE4.jpeg"
              alt="mapa"
            />

            <div v-else class="species__content">
              <div class="species">
                <div class="specie">
                  <p class="specie__dato">
                    Canalete <span>canaletus plantus</span>
                  </p>

                  <p class="specie__dato">U/M: <span>kilogramos</span></p>
                  <p class="specie__dato">Tipo: <span>Semillas</span></p>

                  <button class="specie__button">Ver especie</button>
                </div>
              </div>

              <div class="species">
                <div class="specie">
                  <p class="specie__dato">Canalete canaletus plantus</p>

                  <p class="specie__dato">U/M: <span>kilogramos</span></p>
                  <p class="specie__dato">Tipo: <span>Semillas</span></p>

                  <button class="specie__button">Ver especie</button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- nurseries -->
        <article class="card">
          <div class="card__contact">
            <div class="card__information">
              <h5 class="card__title">El Nogal</h5>
              <div class="information">
                <p>R/Legal: Ferney Alexander Garreta Muchavisoy</p>
                <p>Departamento: Putumayo</p>
                <p>Municipio: Mocoa</p>
                <a style="color: var(--primary); margin-top: 1rem" href="#"
                  >WhatsApp
                  <font-awesome-icon :icon="['fab', 'whatsapp']" />
                </a>
              </div>
            </div>
            <div class="buttons__information">
              <button class="card__email-button__form" @click="toggleEmailForm">
                Enviar Email
              </button>
            </div>

            <form
              class="form__customer"
              :class="{ 'form__customer--show': showEmailForm }"
            >
              <div class="field">
                <label class="form__customer__label" for="email-customer"
                  >Correo:</label
                >
                <input
                  class="form__customer__input"
                  type="email"
                  id="email-customer"
                  name="email-customer"
                  placeholder="Ingresa tu correo"
                  required
                />
              </div>

              <div class="field">
                <label class="form__customer__label" for="message"
                  >Mensaje:</label
                >
                <textarea
                  class="form__customer__textarea"
                  id="message"
                  name="message"
                  rows="2"
                  placeholder="Escribe tu mensaje aquí"
                  required
                ></textarea>
              </div>
              <div class="form__customer__buttons">
                <button type="submit" class="button__form animation send">
                  <span>Enviar</span>
                </button>
                <button
                  type="button"
                  class="button__form"
                  @click="toggleEmailForm"
                >
                  <span>Cancelar</span>
                </button>
              </div>
            </form>
          </div>

          <div class="card__species">
            <div class="species__heading">
              <h5 class="species__tittle">Especies disponibles</h5>
              <font-awesome-icon
                @click="toggleMap"
                class="icon__map"
                :icon="['fas', 'map-location-dot']"
              />
            </div>
            <img
              v-if="isMap"
              class="card__img"
              src="https://cloudfront-us-east-1.images.arcpublishing.com/semana/WN2AZLWIYBEJZI7RC7XT5NCXE4.jpeg"
              alt="mapa"
            />

            <div v-else class="species__content">
              <div class="species">
                <div class="specie">
                  <p class="specie__dato">
                    Canalete <span>canaletus plantus</span>
                  </p>

                  <p class="specie__dato">U/M: <span>kilogramos</span></p>
                  <p class="specie__dato">Tipo: <span>Semillas</span></p>

                  <button class="specie__button">Ver especie</button>
                </div>
              </div>

              <div class="species">
                <div class="specie">
                  <p class="specie__dato">Canalete canaletus plantus</p>

                  <p class="specie__dato">U/M: <span>kilogramos</span></p>
                  <p class="specie__dato">Tipo: <span>Semillas</span></p>

                  <button class="specie__button">Ver especie</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
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
  background-image: url("/img/banner-nurseries.jpg");
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
  /* box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.03); */
  padding: 1rem;
}

@media (min-width: 768px) {
  .card{
    border: none;
    flex-direction: row;
  }
}

.card__img {
  width: 100%;
  height: 200px;
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
  color: var(--primary);
}

@media (min-width: 768px) {
  .card__title {
    font-size: 1.5rem;
  }
}

/* section card information */
.information {
  display: flex;
  flex-direction: column;
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



.card__email-button__form {
  display: inline-flex;
  background-color: var(--blanco);
  color: var(--gris);
  border: none;
  padding: 5px 20px;
  text-align: center;
  display: inline-block;
  font-size: 1rem;
  margin-top: 10px;
  cursor: pointer;
  border-bottom: 2px solid var(--primary);
  transition: ease-in-out 0.3s all;
  margin-bottom: 2rem;
}

.card__email-button__form:hover {
  background-color: var(--primary);
  color: var(--blanco);
  border-radius: 4px;
}
@media (min-width: 768px) {
  .card__email-button__form {
    font-size: 1rem;
  }
}
.form__customer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  transform: translateY(-120%);
  transition: transform 0.3s ease;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1;
}

.form__customer__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form__customer__input {
  display: block;
  width: 100%;
  padding: 0.4rem;
  border: 1px solid var(--gris);
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.form__customer__textarea {
  display: block;
  width: 100%;
  padding: 0.4rem;
  border: 1px solid var(--gris);
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.form__customer--show {
  transform: translateY(0);
}

.form__customer__buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.button__form {
  text-align: center;
  background-color: var(--blanco);
  color: var(--gris);
  font-weight: 400;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease all;

  padding: 0.3rem 1rem;
  border-bottom: 1px solid var(--primary);
}

.send {
  background-color: var(--primary);
  color: var(--blanco);
  border-radius: 0.5rem;
}
.send:hover {
  transform: scale(1.05);
}

/* section card species */
.card__species {
  width: 100%;
  border-radius: 10px;
}

@media (min-width: 768px) {
  .card__species {
    border: 1px solid var(--primary);
  }
}

.species__heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem;
}

@media (min-width: 768px) {
  .species__heading {
    padding: 1rem;
  }
}

.species__tittle {
  margin: 0.5rem 1rem;
  color: var(--primary);
  font-weight: 500;
  font-size: 1.3rem;
}

.icon__map {
  margin-right: 1rem;
  color: var(--gris);
  cursor: pointer;
  transition: all 0.3s ease;
}
.icon__map:hover {
  color: var(--primary);
  transform: scale(1.2);
}
.species__content {
  overflow-y: auto;
  max-height: 200px;
}

.species {
  padding: .5rem;
}

@media (min-width: 768px) {
  .species {
    padding: 1rem;
  }
}

.specie {
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  box-shadow: 1px 3px 3px 3px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.specie__dato {
  margin: 0;
}
.specie__dato span {
  color: var(--primary);
  font-weight: 500;
  font-size: 1rem;
}

.specie__button {
  color: var(--gris);
  border: none;
  padding: 0.2rem 1rem;
  background: var(--blanco);
  margin-top: 1rem;
  border-radius: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  border: 1px solid var(--primary);
}
.specie__button:hover {
  color: var(--blanco);
  background: var(--primary);
}
</style>
