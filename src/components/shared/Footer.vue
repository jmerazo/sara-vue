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
              alt="Corpoamazonia"
              class="footer__logos"
            />
            <img
              src="/logos/sgr.png"
              alt="Sistemas General de Regalías"
              class="footer__logos"
            />
            <img
              src="/logos/mc_vida.png"
              alt="Ministerio de Ciencia Tecnología e Innovación"
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
                <font-awesome-icon :icon="['fas', 'phone-volume']" /> Contactos
              </h3>
              <p class="footer__texto">
                Línea directa nacional: <br>018000-930506
              </p>
              <p class="footer__texto">Celular: 3152370176</p>
              <p class="footer__texto">Teléfono: (123) 456-7890</p>
              <p class="footer__texto footer__texto--titulo">
                Correo Electrónico:
              </p>
              <p class="footer__texto">
                correspondencia@corpoamazonia.gov.co
              </p>
            </div>
            <!--fin footer contacto -->

            <!-- footer ubicacion -->
            <div class="footer__ubicacion">
              <h3 class="footer__heading">
                <font-awesome-icon
                  :icon="['fas', 'clock']"
                  class="mr-2"
                />Horario de atención
              </h3>
              <p class="footer__texto footer__texto--titulo">
              </p>
              <p class="footer__texto">
                Lunes a Viernes de 8:00 am a 12:00 m y de 2:00 a 6:00 pm
              </p>
            </div>
            <!--fin footer ubicacion -->
          </div>
          <!-- footer social -->
          <div class="footer__social">
            <a href="https://www.facebook.com/Corpoamazonia/?ref=embed_page" target="_blank"
              ><font-awesome-icon
                :icon="['fab', 'facebook']"
                class="mr-2 s-icon"
            /></a>
            <a href="https://www.instagram.com/corpoamazonia1/" target="_blank"
              ><font-awesome-icon
                :icon="['fab', 'instagram']"
                class="mr-2 s-icon"
            /></a>
            <a href="https://x.com/Corpoamazonia1" target="_blank"><font-awesome-icon :icon="['fab', 'x-twitter']" /></a>
            <a href="https://www.youtube.com/@corpoamazonia7563" target="_blank"
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

/* Estilos por defecto */
.footer__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer__logos {
  margin-bottom: 0.8rem;
  max-width: 100%;
  height: auto;
}

/* Media query para pantallas mayores o iguales a 1980px */
@media (min-width: 1980px) {
  .footer__logo {
    flex-direction: row;
    justify-content: center;
  }

  .footer__logos {
    margin: 0 1rem;
  }
}

.footer__texto {
  text-align: center;
  font-weight: 700;
  font-size: 0.8rem;
}
.footer__texto--titulo {
  font-weight: 700;
  font-size: 0.9rem;
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