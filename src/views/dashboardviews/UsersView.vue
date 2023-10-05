<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useUsersStore } from "@/stores/users";

const usersStore = useUsersStore();

//limpiar filtros antes de cambiar de vista
onBeforeRouteLeave((to, from, next) => {
  usersStore.quitarFiltroUsuario()
  next();
});

</script>

<template>
    <h1 class="text-4xl mb-10 mt-10 text-center font-extrabold">listado de usuarios <span class="text-green-800">SARA</span></h1>
    <div class="flex justify-end mt-5 mb-5">
      <label class="p-3 text-lg font-bold rounded-lg mx-3">Buscar</label>
      <input
        class="p-3 rounded-lg lg:w-1/4 sm:w-full border-2 border-gray-500 py-2 px-4"
        type="text"
        placeholder="Nombre, Emial o rol"
        @input="usersStore.buscarTermino($event.target.value)"
      />
    </div>
    <hr />
  <div class="w-auto mt-5 mb-10 mx-20">
  <table class="bg-slate-50 shadow-md border rounded-lg">
    <thead>
      <tr>
        <th class="px-4 py-2 text-gray-600">Nombres</th>
        <th class="px-4 py-2 text-gray-600">Email</th>
        <th class="px-4 py-2 text-gray-600">Rol</th>
        <th class="px-4 py-2 text-gray-600">Entidad</th>
        <th class="px-4 py-2 text-gray-600">Celular</th>
        <th class="px-4 py-2 text-gray-600">Departamento</th>
        <th class="px-4 py-2 text-gray-600">Estado</th>
        <th class="px-4 py-2 text-gray-600">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in usersStore.displayedUsers" v-bind:key="user.id">
        <td class="px-4 py-3 border">{{ user.first_name + " " + user.last_name }}</td>
        <td class="px-4 py-3 border">{{ user.email }}</td>
        <td class="px-4 py-3 border">{{ user.rol }}</td>
        <td class="px-4 py-3 border">{{ user.entity }}</td>
        <td class="px-4 py-3 border">{{ user.cellphone }}</td>
        <td class="px-4 py-3 border">{{ user.department_name }}</td>
        <td v-if="user.active = 1 " class="px-4 py-3 border  ">
           <span class="bg-green-100 text-green-800 p-1 text-sm rounded font-bold"> Activo</span>
        </td>
        <td v-else class="px-4 py-3 border  ">
            <span class="bg-red-100 text-red-800 p-1 text-sm rounded font-bold"> Inactivo</span>
        </td>
        <td class="px-4 py-3 border">
            <a href="#" class="btn  rounded-lg font-bold p-1 text-black bg-green-600 hover:bg-green-500 hover:shadow-lg"><font-awesome-icon :icon="['fas', 'eye']" /> Revisar</a>
        </td>
        
      </tr>
    </tbody>
  </table>
    <!-- paginador -->
  <div class="flex justify-center mt-5 mb-10">
      <button
        v-for="page in usersStore.totalPages"
        :key="page"
        @click="usersStore.changePage(page)"
        class="px-3 py-2 mx-1 rounded-lg bg-green-200 text-black hover:bg-green-600"
        :class="{ 'bg-green-600': page === usersStore.currentPage }"
      >
        {{ page }}
      </button>
    </div>

    <h1 v-if="usersStore.noResultados" class="text-center font-bold text-2xl mt-5 mb-40">
      No hay resultados de búsqueda
    </h1>
</div>

</template>
