<template>
  <footer class="footer">
    <div class="contenedor">
      <div class="footer__contenido">
        <!-- footer grid -->
        <div class="footer__grid">
          <!-- footer imagen -->
          <div class="footer__logo">
            <img
              src="/logos/log_corpoamazonia_black.png"
              alt="Logo de la empresa"
            />
          </div>
          <!-- fin footer imagen -->

          <div class="footer__info">
            <!-- footer sedes -->
            <div class="footer__sedes">
              <h3 class="footer__heading">
                <font-awesome-icon :icon="['fas', 'building-wheat']" /> Sedes
              </h3>
              <p class="footer__texto footer__texto--titulo">
                Sede Principal Mocoa - Putumayo:
              </p>
              <p class="footer__texto">Cra. 17 14-85</p>
              <p class="footer__texto">
                <span class="footer__texto footer__texto--titulo">Tel: </span>
                +57 608 4201535, 4296642.
              </p>

              <p class="footer__texto footer__texto--titulo">
                Sede Territorial Amazonas:
              </p>
              <p class="footer__texto">Leticia, Cra. 11 12-45</p>

              <p class="footer__texto footer__texto--titulo">
                Sede Territorial Caqueta:
              </p>
              <p class="footer__texto">
                Florencia, Cra. 11 No. 5-67 Km 3 vía aeropuerto.
              </p>
            </div>
            <!-- fin footer sedes -->

            <!-- footer contacto -->
            <div class="footer__contacto">
              <h3 class="footer__heading">
                <font-awesome-icon :icon="['fas', 'phone-volume']" /> Contacto
              </h3>
              <p class="footer__texto">
                Amazonas, Caquetá y Putumayo: 018000-930506
              </p>
              <p class="footer__texto">3152370176</p>
              <p class="footer__texto footer__texto--titulo">
                Horario de Atención:
              </p>
              <p class="footer__texto">
                de Lunes a Viernes de 8:00 am a 12:00 m y de 2:00 a 6:00 pm
              </p>
              <p class="footer__texto">Teléfono: (123) 456-7890</p>
              <p class="footer__texto footer__texto--titulo">
                Correo Electrónico:
              </p>

              <p class="footer__texto">
                Email: correspondencia@corpoamazonia.gov.co
              </p>
            </div>
            <!--fin footer contacto -->

            <!-- footer ubicacion -->
            <div class="footer__ubicacion">
              <h3 class="footer__heading">
                <font-awesome-icon
                  :icon="['fas', 'map-location-dot']"
                  class="mr-2"
                />Ubícanos
              </h3>
              <p class="footer__texto">Cra. 17 #14 - 85, Mocoa, Putumayo</p>
            </div>
            <!--fin footer ubicacion -->
          </div>
          <!-- footer social -->
          <div class="footer__social">
            <a href="#"
              ><font-awesome-icon
                :icon="['fab', 'facebook']"
                class="mr-2 s-icon"
            /></a>
            <a href="#"
              ><font-awesome-icon
                :icon="['fab', 'instagram']"
                class="mr-2 s-icon"
            /></a>
            <a href="#"><font-awesome-icon :icon="['fab', 'x-twitter']" /></a>
            <a href="#"
              ><font-awesome-icon :icon="['fab', 'youtube']" class="s-icon"
            /></a>
          </div>
          <!-- footer social -->
        </div>
        <!-- fin footer grid -->
      </div>
    </div>
    <p class="copyright">todos los derechos reservados &copy;</p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #eaf2ed;
}
.footer__logo {
  width: 5rem;
  margin: 2rem 0 0 0;
}

.footer__heading {
  font-size: 1rem;
  margin: 2rem 0 1rem 0;
}

.footer__texto {
  text-align: center;
  font-weight: 700;
  font-size: 0.7rem;
}
.footer__texto--titulo {
  font-weight: 700;
  font-size: 0.8rem;
}

.footer__social {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}
.footer__grid {
  display: grid;
  justify-items: center;
}

@media (min-width: 992px) {
  .footer__grid {
    grid-template-columns: 1fr 3fr 1fr;
    align-items: center;
  }
  .footer__info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .footer__social {
    gap: 0.4rem;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.9rem;
  }
  .footer__logo {
    width: 8rem;
    margin: 0;
  }
  .footer__heading {
    margin: 1.3rem 0 0.7rem 0;
  }

  .footer__texto:last-of-type {
    margin-bottom: 1rem;
  }
  .footer__texto--titulo {
    font-weight: 700;
  }
}
.copyright {
  color: var(--blanco);
  background-color: var(--gris);
  text-align: center;
  display: block;
  width: 100%;
  padding: 1rem 0;
  margin: 0;
  font-size: 0.7rem;
  text-transform: uppercase;
}
</style>