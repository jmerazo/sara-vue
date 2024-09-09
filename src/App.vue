<script setup>
import { RouterView} from "vue-router";
import ToastContainer from "./components/shared/ToastContainer.vue";
</script>

<template>
  
  <main  >
    <RouterView  />
    <ToastContainer />
  </main> 

</template>

<style >
/* boton agregar */
.agregar {
  background-image: url("/icons/icon-add.svg");
  padding: 0;
  margin: 0;
  height: 3rem;
  background-position: center;
  background-size: cover;
  position: fixed;
  bottom: 10%;
  right: -1px;
  z-index: 2;
  width: 3rem;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
}
.agregar:hover {
  transform: scale(1.08);
}

@media (min-width: 768px) {
  .agregar {
    right: 1%;
    height: 3rem;
    overflow: hidden;
    border-radius: 50%;
  }
  .agregar::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    transition: transform 0.3s ease-out;
  }
  .agregar:hover::before {
    transform: scale(1.08);
  }
  .agregar:hover {
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
  }
}
/* fin boton agregar */
.texto__sara {
  color: var(--primary);
}
/* buscador */
.header__label {
  font-weight: 700;
  font-size: .8rem;
  color: var(--gris);
}

@media (min-width: 768px) {
  .header__label {
    font-size: 1rem;
  }
}

.header__buscador {
  border: 1px solid var(--gris);
  padding: 0.5rem;
  border-radius: 8px;
  width: 100%;
  font-size: .8rem;
}

@media (min-width: 768px) {
  .header__buscador {
    border: 2px solid var(--gris);
    padding: .5rem;
    width: 40%;
  }
}
@media (min-width: 992px) {
  .header__buscador {
    width: 25%;
  }
}
/* Paginador */
.paginador {
  margin: 3rem 0 0 0;
 
}
.paginador__botones {
  display: flex;
  justify-content: center;
  align-items: center;
}
.paginador__boton {
  font-weight: 700;
  font-size: 1rem;
  padding: 0.3rem;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--blanco);
}
@media (min-width: 768px) {
  .paginador__boton {
    font-size: 1.2rem;
  }
}
.paginador__boton-actual {
  background-color: var(--gris);
  color: var(--blanco);
  border-radius: 50%;
}
.paginador__boton--anterior {
  width: 2rem;
  background-color: var(--blanco);
}
.paginador__boton--siguiente {
  width: 2rem;
  background-color: var(--blanco);
}
.paginador__boton--anterior:hover {
  color: var(--primary);
}
.paginador__boton--siguiente:hover {
  color: var(--primary);
  
}

/* validacion */
.validacion__contenido {
  margin-bottom: 8rem;
}
.validacion__heading {
  font-size: 1.5rem;
}

/* =============== modals forms =============== */
.form__modal--content{
  padding: .6rem;
}
.form__modal--content .form__modal--title{
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 500;
}

.form__modal .form__modal--field{
  margin: 1rem 0;
}
.form__modal .form__modal--label{
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: .5rem;
  text-align: left;
}
.form__modal .form__modal--input{
  width: 100%;
  padding: .2rem;
  border: 1px solid var(--primary);
  border-radius: 5px;
}
/* buttons */
.form__modal .form__modal--buttons{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0rem;
  transition: all .3s ease-in-out;
}
/* button save */
.form__modal--buttons .form__modal--save{
  background: none;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  padding: .5rem;
  transition: all .3s ease-in-out;
}
.form__modal--buttons .form__modal--save:hover{
  background: var(--primary);
  color: var(--blanco);
}
/* button close modal */
.button__modal--close {
  position: absolute;
  top: 0.9%;
  right: 1%;
  font-size: 1rem;
  color: var(--gris);
  width: 40px;
  padding: 0;
  margin: 0;
  background: none;
}

.button__modal--close path {
  transition: 0.4s ease all;
}

.button__modal--close:hover svg {
  background: var(--gris);
  border-radius: 50%;
  color: var(--blanco);
}
</style>