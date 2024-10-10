
<script setup>
import { onMounted, ref } from "vue";
import { usePageContent } from "@/stores/page";
import { useToastStore } from '@/stores/toast';
import LoadingData from "@/components/shared/LoadingData.vue";

import ButtonTop from '@/components/shared/ButtonTop.vue';

const pageStore = usePageContent();
const toast = useToastStore()

const formData = ref({
  to_email: "correspondencia@corpoamazonia.gov.co",
  /* to_email: "sheesarte@gmail.com", */
  from_email: "",
  subject: "Sara | Información Proyecto BPIN 202200010017",
  body: ''
});

const handleSubmit = async () => {
  try {
    const response = await pageStore.sendContactEmail(formData.value);

    if (response.success) {
      // Si el envío del correo fue exitoso
      toast.activateToast(response.message, 'success');
      setTimeout(() => {
        resetForm();
      }, 3000);
    } else {
      toast.activateToast(response.message || 'Error al agregar la especie', 'error');
    }
  } catch (err) {
    toast.activateToast('Error al comunicarse con el servidor', 'error');
  }
};

onMounted(async () => {
  await pageStore.fetchData();
});

function resetForm() {
  Object.keys(formData.value).forEach(key => {
    formData.value[key] = "";
  });
}
</script>

<template>
  <div>
    <!-- banner acerca -->
    <section class="banner">
      <div class="banner__info">
       

        <p class="banner__text">
          ACERCA DEL PROYECTO
        </p>
      </div>
    </section>
    <!-- Fin banner acerca  -->

    <!-- info proyecto -->
    <section class="proyecto">
      <div class="proyecto__contenido">
        <img class="proyecto__img" src="/img/backgroundCard/about_project.png" alt="hojas" />
        <h1 class="proyecto__titulo">
          El Sistema de Información para la Administración y Manejo Sostenible de los Recursos Naturales del sur de la Amazonia colombiana (SARA)
        </h1>
        <div>
          <p>
            El Sistema de Información para la Administración y Manejo Sostenible de los Recursos Naturales del sur de la Amazonia colombiana (SARA) nace como una herramienta en línea de divulgación de los resultados del Proyecto BPIN 2022000100017 y en particular como estrategia de comunicación y transferencia de conocimiento a mediano y largo plazo, de los lineamientos de manejo sostenible de la flora silvestre y los productos forestales no maderables de las especies forestales priorizadas por Corpoamazonia para la elaboración de protocolos para el manejo sostenible de estos recursos, de acuerdo con lo definido en el Decreto 1076 de 2015 modificado y adicionado por el Decreto 690 de 2021.
          </p>
          <p><strong>Proyecto Semillas CTeI</strong></p>
          <p>
            El proyecto identificado con código BPIN 2022000100017 denominado IMPLEMENTACIÓN DE UN SISTEMA DE INFORMACIÓN DE LA FENOLOGÍA DE ESPECIES FORESTALES NATIVAS DEL SUR DE LA AMAZONIA PARA LA GENERACIÓN DE CONOCIMIENTOS QUE PERMITA EL DESARROLLO DE INICIATIVAS DE BIOECONOMÍA EN LOS DEPARTAMENTOS DE PUTUMAYO CAQUETÁ, nace en el marco de la convocatoria del Ministerio de Ciencia Tecnología e Innovación No. 018 de 2021, y fue viabilizado, priorizado y aprobado por el Órgano Colegiado De Administración Y Decisión – OCAD de Ciencia, Tecnología E Innovación Del Sistema General De Regalías -SGR, mediante Acuerdo 021 del 19 de mayo de 2022.
          </p>
          <p>
            Este mismo OCAD designó a CORPOAMAZONIA, como responsable de ejecutar el proyecto en un período de 36 meses, el cual inició su ejecución el 1 de agosto de 2022 y tiene fecha de terminación el 31 de julio de 2025.
          </p>
          <p>
            El proyecto tiene como objetivo general: Incrementar el conocimiento sobre el comportamiento fenológico de las especies forestales nativas del sur de la Amazonía colombiana, abastecedoras de semillas, e indicador de producto principal la generación de 70 Protocolos de manejo sostenible de especies forestales nativas del sur de la amazonia colombiana para el aprovechamiento de semillas con información técnica sobre la fenología productiva y reproductiva por especie.
          </p>
          <p><strong>Para el cumplimiento del objetivo general, se contemplaron tres objetivos específicos:</strong></p>
          <ul>
            <li>Implementar un sistema de información para el monitoreo y seguimiento de la fenología de árboles semilleros nativos de la región.</li>
            <li>Generar lineamientos para el aprovechamiento sostenible de PFNM acorde a las condiciones ecosistémicas de la región del sur de la amazonia.</li>
            <li>Incrementar el conocimiento por parte de los usuarios del bosque sobre las técnicas para la recolección de información fenológica y de manejo sostenible de las especies forestales nativas de la región.</li>
          </ul>
          <p>
            En cumplimiento de tales objetivos, en particular el objetivo específico 3, Corpoamazonia coloca a disposición del público regional y demás interesados en contribuir con el desarrollo sostenible del sur de la Amazonia colombiana, este catálogo web que tiene como fin último ampliar el conocimiento sobre las especies forestales de nuestra región, que nos permita a oriundos, residentes, y visitantes contar con la información adecuada para trabajar mancomunadamente en la gestión sostenible de nuestros bosques.
          </p>
        </div>
      </div>
    </section>

    <!-- Fin info proyecto -->

    <!-- financiadores -->
    <section class="financiadores">
      <div class="financiadores__contenido" v-if="pageStore.contenidoNosotros.length > 0">
        <h1 class="financiadores__titulo">
          {{ pageStore.contenidoNosotros[7].title }}
        </h1>

        <div class="table__container">
          <table class="table__financiers">
            <thead>
              <tr>
                <th class="title__table">Logo</th>
                <th class="title__table">Entidad</th>
                <th class="title__table">Descripción</th>
                <th class="title__table">Tipo recurso</th>
                <th class="title__table">Valor</th>
              </tr>             
            </thead>
            <tbody>
              <!-- Fila 1 -->
              <tr>
                <td>
                  <a href="https://www.sgr.gov.co/" target="_blank"><img src="/logos/sgr.png" alt="Logo SGR" width="150"></a>
                  <a href="https://www.caqueta.gov.co/" target="_blank"><img src="/logos/gob_caqueta.png" alt="Logo Gobernación del Caqueta" width="150"></a>
                </td>
                <td>SGR - Asignación para la ciencia, tecnología e innovación Convocatorias 2021 - Ambiente y desarrollo sostenible, Departamento del Caquetá</td>
                <td>Talento humano, gastos de viaje, recursos tecnológicos, capacitaciones, divulgación y comunicación, y supervisión</td>
                <td>Efectivo</td>
                <td>$1.870.082.852,00</td>
              </tr>

              <!-- Fila 2 -->
              <tr>
                <td>
                  <a href="https://www.sgr.gov.co/" target="_blank"><img src="/logos/sgr.png" alt="Logo SGR" width="150"></a>
                  <a href="https://www.putumayo.gov.co/index.php/mi-departamento/presentacion" target="_blank"><img src="/logos/gp.png" alt="Logo Gobernación del Putumayo" width="150"></a>
                </td>
                <td>SGR - Asignación para la ciencia, tecnología e innovación Convocatorias 2021 - Ambiente y desarrollo sostenible, Departamento del Putumayo</td>
                <td>Talento humano, gastos de viaje, recursos tecnológicos, capacitaciones, divulgación y comunicación, y supervisión</td>
                <td>Efectivo</td>
                <td>$1.870.082.853,00</td>
              </tr>

              <!-- Fila 3 -->
              <tr>
                <td><a href="https://www.corpoamazonia.gov.co/" target="_blank"><img src="/logos/log_corpoamazonia_black.png" alt="Logo Gobernación del Caquetá" width="250"></a></td>
                <td>Corpoamazonia</td>
                <td>Recursos de administración y supervisión del proyecto</td>
                <td>En especie</td>
                <td>$257.222.728,00</td>
              </tr>

              <!-- Fila 4 -->
              <tr>
                <td><a href="https://itp.edu.co/ITP2022/" target="_blank"><img src="/logos/itp.png" alt="Logo Instituto Tecnológico del Putumayo" width="250"></a></td>
                <td>Instituto Tecnológico del Putumayo</td>
                <td>Mano de obra profesional, asesorías, trabajos de pasantía</td>
                <td>En especie</td>
                <td>$16.819.200,00</td>
              </tr>

              <!-- Fila 5 -->
              <tr>
                <td><a href="https://www.putumayo.gov.co/index.php/mi-departamento/presentacion" target="_blank"><img src="/logos/gp.png" alt="Logo Gobernación del Putumayo" width="250"></a></td>
                <td>Gobernación del Putumayo</td>
                <td>Mano de obra profesional, acompañamiento en el proceso</td>
                <td>En especie</td>
                <td>$10.000.000,00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!-- Fin financiadores -->

    <section class="contact">
      <div class="contact__contenido">
        <h1 class="contact__titulo">
          CONTACTO
        </h1>
        <div class="contact__informacion">
          <p>
            Si se requiere información adicional o ampliada sobre este proyecto, remita la comunicación al correo oficial de la entidad, con el asunto: <strong>Información Proyecto BPIN 2022000100017</strong>.
          </p>
          <!-- Formulario de contacto -->
          <form @submit.prevent="handleSubmit" class="contact__form">
            <div class="contact__field">
              <label for="email" class="contact__label">Ingrese su correo:</label>
              <input type="email" id="email" v-model="formData.from_email" class="contact__input" required />
            </div>
            <div class="contact__field">
              <label for="email" class="contact__label">Asunto:</label>
              <input type="email" id="email" v-model="formData.subject" class="contact__input" placeholder="Sara | Información Proyecto BPIN 202200010017" required disabled />
            </div>
            <div class="contact__field">
              <label for="message" class="contact__label">Escriba su mensaje:</label>
              <textarea id="message" v-model="formData.body" class="contact__textarea" required></textarea>
            </div>
            <button type="submit" class="contact__button">Enviar mensaje</button>
          </form>
          <LoadingData v-if="pageStore.loading" />
        </div>
      </div>
    </section>
  </div>
  <ButtonTop/>
</template>

<style scoped>
/* inicio - banner */
.banner {
  margin-top: 4rem;
  margin-bottom: 0rem;
  position: relative;
  background-image: url('/img/bannersViews/banner-about.jpeg');
  height: 18rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
}

.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 35rem;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.banner__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
}

.banner__logo {
  width: 5rem;
  z-index: 100;
}

.banner__text {
  color: var(--blanco);
  font-size: 1.2rem;
  text-align: center;
  font-weight: 900;
  z-index: 100;
  width: 80%;
  margin: 2rem;
}

@media (min-width: 992px) {
  .banner {
    margin-top: 0rem;
    height: 30rem;
    margin-bottom: 5rem;
  }

  .banner__logo {
    width: 8rem;
  }

  .banner__text {
    font-size: 2.5rem;
    width: 60%;
  }
}

/* mision vision y valores */
.card {
  width: 300px;
  height: 200px;
  position: relative;
  perspective: 1000px;
}

.front,
.back {
  position: absolute;
  width: 300px;
  height: 200px;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  transition: transform 0.9s;
  border-radius: 1rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .card {
    width: 400px;
    height: 300px;
  }

  .front,
  .back {
    position: absolute;
    width: 400px;
    height: 300px;
  }
}

.front {
  background-position: center;
  background-size: cover;
}

.front::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  border-radius: 1rem;
}

.back {
  background-color: rgb(255, 255, 255);
  transform: rotateY(180deg);
}

.card:hover .front {
  transform: rotateY(-180deg);
}

.card:hover .back {
  transform: rotateY(0deg);
}

.card .front {
  transform: rotateY(0deg);
}

.card .back {
  transform: rotateY(180deg);
}

.card__label {
  padding: 0;
  margin: 0;
  text-align: center;
  font-size: 1.7rem;
  font-weight: 700;
  color: white;
  z-index: 100;
}

.card__text {
  font-size: 0.8rem;
  font-weight: 600;
}

@media (min-width: 768px) {
  .card__text {
    font-size: 1rem;
    text-align: center;
  }
}

.front__content {
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--blanco);
  z-index: 100;
}



.planificacion__grid {
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 1440px) {
  .planificacion {
    margin: 0 auto;
  }

  .planificacion__grid {
    flex-direction: row;
  }
}

/* Estilos generales del formulario de contacto */
.contact {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

.contact__contenido {
  text-align: center;
  margin: 0 auto;
  position: relative;
  padding: 2rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.contact__title {
  color: var(--primary);
  font-weight: 700;
  margin-bottom: 1rem;
}

.contact__titulo{
  font-size: 2rem;
  color: var(--primary);
}

.contact__form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
}

.contact__field {
  margin-bottom: 1rem;
  width: 100%;
}

.contact__label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.contact__informacion {
  width: 98%; /* Asegura que el contenedor padre ocupe el 100% del ancho disponible *//* Ajuste opcional para limitar el ancho máximo si es necesario */
}

.contact__input,
.contact__textarea {
  width: 100%; /* Ocupar el 100% del ancho del contenedor */
  padding: 0.55rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
  box-sizing: border-box; /* Asegura que el padding y el borde no desborden el ancho del contenedor */
}

.contact__input:focus,
.contact__textarea:focus {
  border-color: var(--primary);
}

.contact__field {
  margin-bottom: 1rem; /* Espacio entre los campos del formulario */
}

.contact__button {
  display: block; /* Asegura que el botón se muestre como bloque */
  padding: 0.75rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.contact__button:hover {
  background-color: var(--primary-hover); /* Efecto hover */
}

@media (min-width: 768px) {
  .contact .contact__contenido {
    text-align: justify;
    width: 60%;
  }

  .contact__informacion form {
    align-items: flex-start;
  }
}


/* proyecto */
.proyecto {
  margin-top: -2rem;
}

.proyecto__contenido {
  text-align: center;
  margin: 0 auto;
  position: relative;
  padding: 2rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.proyecto__img {
  position: absolute;
  right: 0;
  opacity: 0.1;
  border-radius: 1rem;
}

.proyecto__titulo {
  position: relative;
  font-size: 1.7rem;
  z-index: 100;
}

.proyecto__informacion {
  position: relative;
  z-index: 100;
  font-weight: 500;
}

@media (min-width: 768px) {
  .proyecto {
    margin-top: 5rem;
  }

  .proyecto__contenido {
    text-align: justify;
    width: 60%;
  }
}

.title__table {
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* financiadores */
.financiadores {
  margin: 1rem 0 2rem 0;
}

.financiadores__contenido {
  text-align: center;
  margin: 0 auto;
  position: relative;
  padding: 2rem;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.financiadores__img {
  position: absolute;
  right: 0;
  opacity: 0.1;
  border-radius: 1rem;
}

.financiadores__titulo {
  position: relative;
  font-size: 1.7rem;
  z-index: 100;
}

.financiadores__informacion {
  position: relative;
  z-index: 100;
  font-weight: 500;
}

@media (min-width: 768px) {
  .financiadores {
    margin-top: 2rem;
  }

  .financiadores__contenido {
    text-align: justify;
    width: 60%;
  }
}

.table__financiers {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.table__financiers thead {
  display: table-header-group;
}

.table__financiers tbody {
  display: table-row-group;
}

.table__financiers tr {
  display: table-row;
}

.table__financiers th,
.table__financiers td {
  display: table-cell;
  border: 1px solid #ccc;
  padding: 0.75rem;
  text-align: left;
  vertical-align: middle;
}

.table__financiers th {
  background-color: #f4f4f4;
  font-weight: bold;
  text-align: center;
}


/* Estilo para las viñetas en forma de hoja usando SVG */
.proyecto__contenido ul {
  list-style: none; /* Eliminamos las viñetas predeterminadas */
  padding-left: 20px; /* Añade espacio para que las viñetas no se superpongan con el texto */
}
.proyecto__contenido ul li {
  margin-bottom: 10px; /* Espacio entre cada ítem de la lista */
  position: relative;
  padding-left: 30px; /* Añade espacio a la izquierda para la viñeta */
}
.proyecto__contenido ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L5.24077 18.9999C5.0786 19.912 4.99805 20.907 4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3ZM12.998 5C8.57977 5 4.99805 8.58172 4.99805 13C4.99805 13.3624 5.00125 13.7111 5.00759 14.0459C6.26198 12.0684 8.09902 10.5048 10.5019 9.13176L11.4942 10.8682C8.6393 12.4996 6.74554 14.3535 5.77329 16.9998L8.99805 17C15.0132 17 18.8692 13.0269 18.9949 5.38766C17.6229 5.52113 16.3481 5.436 14.7754 5.20009C13.6243 5.02742 13.3988 5 12.998 5Z"></path></svg>');
  background-size: contain; /* Ajusta el tamaño del SVG */
  background-repeat: no-repeat;
}
</style>