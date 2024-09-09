import { ref, onMounted,computed, watch } from "vue";
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

  onMounted(async () => {
    cargando.value = true
    const { data } = await APIService.getUsers();
    users.value = data;
    usersOriginal.value = data;
    totalUsers.value = usersOriginal.value.length;
    const response = await APIService.getRoles();
    roles.value = response.data;
    cargando.value = false
  });

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

  async function createUser (data, recaptcha_token) {
    try{
      const response = await APIService.createUsers(data, recaptcha_token)
      
      if (response.status === 201) {
        users.value.push(response.data); // Agrega el nuevo objeto al array
        usersOriginal.value.push(response.data); 
      } else {
        console.error("Error al agregar el usuario: ", response.statusText);
      }
    } catch (error) {
      console.error("Error al comunicarse con el servidor: ", error);
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
      const lowerEntidad = term.entity ? term.entity.toLowerCase() : "";
      const lowerDepartamento = term.name ? term.name.toLowerCase() : "";
      const lowerRol = term.rol ? term.rol.toLowerCase() : "";
      const lowerEmail = term.email ? term.email.toLowerCase() : "";

      return (
        lowerNombre.includes(lowerTermino) ||
        lowerApellido.includes(lowerTermino) ||
        lowerEntidad.includes(lowerTermino) ||
        lowerDepartamento.includes(lowerTermino) ||
        lowerRol.includes(lowerTermino) ||
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
    createUser
  };
});
