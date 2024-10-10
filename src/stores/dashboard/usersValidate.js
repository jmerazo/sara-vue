import { ref, onMounted,computed, watch } from "vue";
import { defineStore } from "pinia";
import APIService from "@/services/APIService";

export const useUsersValidateStore = defineStore("useUsersValidateStore", () => {
  const totalUsers = ref(0);
  const datosImport = ref([]);
  const cargando = ref(false)
  const noResultados = computed(() => usersValidate.value.length === 0 );
  const roles = ref([])
  const usersValidate = ref([])
  const usersValidateOriginal = ref([])

  // variables para paginación
  const currentPage = ref(1); // Página actual
  const itemsPerPage = ref(12); // Elementos por página

  const fetchUsersValidate = async () => {
    cargando.value = true
    const { data } = await APIService.usersValidate();
    usersValidate.value = data.data.users;
    usersValidateOriginal.value = data.data.users;
    const response = await APIService.getRoles();
    roles.value = response.data;
    cargando.value = false
  }

  // Calcula el número total de páginas en función de los datos
  const totalPages = computed(() =>
    Math.ceil(usersValidate.value.length / itemsPerPage.value)
  );

  // Calcula las especies a mostrar en la página actual
  const displayedUsersValidate = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return usersValidate.value.slice(start, end);
  });

  //función para cambiar de página
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  }

  //quitar los filtros del motor de busqueda
  function removeFilterUser() {
    if (usersValidateOriginal.value) {
      usersValidate.value = usersValidateOriginal.value;
    }
  }

  function buscarTermino(termino) {
    usersValidate.value = usersValidateOriginal.value.filter((term) => {
      const lowerTermino = termino.toLowerCase();
      const lowerNombre = term.first_name ? term.first_name.toLowerCase() : "";
      const lowerApellido = term.last_name ? term.last_name.toLowerCase() : "";
      const lowerDepartamento = term.name ? term.name.toLowerCase() : "";
      const lowerRol = term.rol ? term.rol.toLowerCase() : "";
      const lowerEmail = term.email ? term.email.toLowerCase() : "";

      return (
        lowerNombre.includes(lowerTermino) ||
        lowerApellido.includes(lowerTermino) ||
        lowerDepartamento.includes(lowerTermino) ||
        lowerRol.includes(lowerTermino) ||
        lowerEmail.includes(lowerTermino)
      );
    });
  }

  const userValidateAccept = async (user_id, rol) => {
    console.log('rol ', rol)
    try {
      const { data } = await APIService.usersValidateAccept(user_id, rol);
      if (data.success) {
        // Actualiza el array de usuarios eliminando el usuario aceptado
        usersValidate.value = usersValidate.value.filter(user => user.id !== user_id);
  
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Error al aceptar el usuario' };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error en la solicitud al aceptar el usuario' };
    }
  };  
  
  const userValidateReject = async (user_id) => {
    try {
      const { data } = await APIService.usersValidateReject(user_id);
      if (data.success) {
        // Actualiza el array de usuarios eliminando el usuario rechazado
        usersValidate.value = usersValidate.value.filter(user => user.id !== user_id);
  
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Error al rechazar el usuario' };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error en la solicitud al rechazar el usuario' };
    }
  };
    
  return {
    currentPage,
    itemsPerPage,
    totalPages,
    totalUsers,
    noResultados,
    datosImport,
    cargando,
    buscarTermino,
    removeFilterUser,
    changePage,
    roles,
    fetchUsersValidate,
    displayedUsersValidate,
    userValidateAccept,
    userValidateReject
  };
});
