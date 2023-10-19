import { ref, onMounted,computed } from "vue";
import { defineStore } from "pinia";
import APIService from "@/services/APIService";
import {useModalStore} from '@/stores/modal'

export const useUsersStore = defineStore("useUsersStore", () => {
  const modal = useModalStore();
  const users = ref([]);
  const usersOriginal = ref([]);
  const userSelected = ref([]);
  const totalUsers = ref(0);
  const noResultados = computed(() => users.value.length === 0 );
  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página

  onMounted(async () => {
    const { data } = await APIService.getUsers();
    users.value = data;
    usersOriginal.value = data;
    totalUsers.value = usersOriginal.value.length;
  });

  //seleccionar un usuario para mostrar en el modal
  function seleccionarUsuario(id) {
    userSelected.value =  usersOriginal.value.filter(user => user.id === id)
    modal.handleClickModalUser(); 
  }

  //seleccionar un usuario para mostrar en el modal
  function selectedUserUpdate(id) {
    userSelected.value =  usersOriginal.value.filter(user => user.id === id)
    console.log('user id', id)
    console.log('user select ', userSelected.value)
    modal.handleClickModalUserUpdate(userSelected.value); 
  }

  // Calcula el número total de páginas en función de los datos
  const totalPages = computed(() =>
    Math.ceil(users.value.length / itemsPerPage.value)
  );

  // Calcula las especies a mostrar en la página actual
  const displayedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return users.value.slice(start, end);
  });

  //función para cambiar de página
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  //quitar los filtros del motor de busqueda
  function quitarFiltroUsuario() {
    if (usersOriginal.value) {
      users.value = usersOriginal.value;
    }
  }

  function buscarTermino(termino) {
    users.value = usersOriginal.value.filter((term) => {
      const lowerTermino = termino.toLowerCase();
      const lowerNombre = term.fullname ? term.fullname.toLowerCase() : "";
      const lowerRol = term.rol ? term.rol.toLowerCase() : "";
      const lowerEmail = term.email ? term.email.toLowerCase() : "";

      return (
        lowerNombre.includes(lowerTermino) ||
        lowerRol.includes(lowerTermino) ||
        lowerEmail.includes(lowerTermino)
      );
    });
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    displayedUsers,
    users,
    userSelected,
    totalUsers,
    noResultados,
    buscarTermino,
    quitarFiltroUsuario,
    changePage,
    seleccionarUsuario,
    selectedUserUpdate
  };
});
