import { ref,computed, watch } from "vue";
import { defineStore } from "pinia";
import APIService from "@/services/APIService";
import {useModalStore} from '@/stores/modal'

export const useUsersStore = defineStore("useUsersStore", () => {
  const modal = useModalStore();
  const users = ref([]);
  const usersOriginal = ref({});
  const userSelected = ref([]);
  const totalUsers = ref(0);
  const idUser = ref();
  const newState = ref();
  const datosImport = ref([]);
  const cargando = ref(false)
  const noResultados = computed(() => users.value.length === 0 );
  const roles = ref([])

  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página
  const maxVisiblePages = 5; // Número máximo de páginas visibles

  const fetchUsers = async () => {
    cargando.value = true
    const { data } = await APIService.getUsers();
    users.value = data;
    usersOriginal.value = data;
    totalUsers.value = usersOriginal.value.length;
    const response = await APIService.getRoles();
    roles.value = response.data;
    cargando.value = false
  }

  function cargarData() {
    users.value.forEach((dato) => {
      datosImport.value.push(dato);
    });
  }

  //cargar datos de importacion
  watch(
    () => users.value,
    () => {
      datosImport.value = [];
      cargarData();
    },
    { deep: true }
  );

  async function createUser(data, recaptcha_token) {
    try {
      const response = await APIService.createUsers(data, recaptcha_token);
      console.log('response ', response);
  
      if (response.status === 201) {
        users.value.push(response.data); // Agrega el nuevo objeto al array
        usersOriginal.value.push(response.data);
        // Retornar la respuesta con un mensaje personalizado
        return { status: response.status, msg: response.data.msg, data: response.data };
      } else {
        // Si el estado no es 201, lanzar una excepción con el mensaje de error
        console.log('error ', response.data.msg);
        throw new Error(response.data.msg || 'Error desconocido al crear el usuario.');
      }
    } catch (error) {
      // Si el error proviene de Axios (error en la solicitud)
      if (error.response && error.response.data && error.response.data.msg) {
        console.error("Error al comunicarse con el servidor: ", error.response.data.msg);
        throw new Error(error.response.data.msg);
      } else {
        // Otros errores (por ejemplo, errores de red)
        console.error("Error al comunicarse con el servidor: ", error.message);
        throw new Error('Error al comunicarse con el servidor.');
      }
    }
  }  
  
  async function registerUser(data, recaptcha_token) {
    try {
      const response = await APIService.registerUser(data, recaptcha_token);
  
      if (response.data.success) {
        // Registro exitoso
        return response.data;
      } else {
        // Manejar errores
        return response.data;
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor:", error);
      throw error;
    }
  }  

  //seleccionar un usuario para mostrar en el modal
  function selectedUserUpdate(id) {
    userSelected.value =  usersOriginal.value.filter(user => user.id === id)
    modal.handleClickModalUserUpdate(userSelected.value); 
  }

  const changeStateUser = async (id, nuevoEstado) => {
      // Encuentra el índice del usuario en el array basado en su ID
      const userIndex = users.value.findIndex((usuario) => usuario.id === id);
      if (userIndex !== -1) {
          // Si el usuario se encontró en el array, actualiza su estado
          users.value[userIndex].is_active = nuevoEstado;
          await APIService.stateUsers(id, {nuevoEstado})
      } else {
          // Maneja el caso en el que el usuario no se encontró
          console.error(`Usuario con ID ${id} no encontrado.`);
      }
  };

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Función para calcular el rango de páginas visibles
  const displayedPageRange = computed(() => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage.value - half);
    let end = Math.min(totalPages.value, currentPage.value + half);

    // Ajusta el rango para que siempre tenga 10 páginas, si es posible
    if (end - start + 1 < maxVisiblePages) {
      if (currentPage.value < half + 1) {
        end = Math.min(totalPages.value, start + maxVisiblePages - 1);
      } else if (currentPage.value > totalPages.value - half) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  // Funciones para ir a la primera y última página
  function goToFirstPage() {
    currentPage.value = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goToLastPage() {
    currentPage.value = totalPages.value;
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      const lowerNombre = term.first_name ? term.first_name.toLowerCase() : "";
      const lowerApellido = term.last_name ? term.last_name.toLowerCase() : "";
      const lowerEmail = term.email ? term.email.toLowerCase() : "";

      return (
        lowerNombre.includes(lowerTermino) ||
        lowerApellido.includes(lowerTermino) ||
        lowerEmail.includes(lowerTermino)
      );
    });
  }

  async function deleteUser(pk) {
    const indexToDelete = users.value.findIndex(item => item.id === pk);
  
    if (indexToDelete === -1) {
      return { message: "Usuario no encontrado" };
    }
  
    users.value.splice(indexToDelete, 1);
    await APIService.deleteUsers(pk);
  
    return { message: "Usuario eliminado con éxito" };
  }
    
  return {
    currentPage,
    itemsPerPage,
    totalPages,
    displayedUsers,
    users,
    userSelected,
    idUser,
    newState,
    totalUsers,
    noResultados,
    datosImport,
    cargando,
    buscarTermino,
    quitarFiltroUsuario,
    changePage,
    selectedUserUpdate,
    changeStateUser,
    deleteUser,
    roles,
    createUser,
    registerUser,
    fetchUsers,
    goToFirstPage,
    goToLastPage,
    displayedPageRange
  };
});
