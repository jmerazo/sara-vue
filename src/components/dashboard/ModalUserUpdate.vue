<script setup>
import { onMounted, computed, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useModalStore } from "@/stores/modal";
import { useUsersStore } from "@/stores/users";
import { useAuthToken } from '@/stores/auth'

const locates = useAuthToken()
const modal = useModalStore();
const usersStore = useUsersStore();

const formData = ref({
  document_type: "Cédula de ciudadanía",
  document_number: "",
  first_name: "",
  last_name: "",
  email: "",
  cellphone: "",
  profession: "",
  entity: "",
  reason: "",
  password: "",
  confirm_password: "",
  department: '',
  city: ''
});

const filteredCities = computed(() => {
  const selectedDepartament = formData.value.department
  console.log(selectedDepartament)
  if (selectedDepartament) {    
    const filtered = locates.cities.filter(city => city.department_id === selectedDepartament);
    return filtered;
  }
  return [];
});

</script>

<template>
  <TransitionRoot as="template" :show="modal.modalUserUpdate">
    <Dialog
      as="div"
      class="relative z-10"
      @close="modal.handleClickModalUserUpdate()"
    >
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-2 pt-2 pb-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6"
            >
              <div>
                <div>
                  <!-- llenar la info dinámica -->

                  <div class="flex flex-wrap justify-center gap-6 mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-16 h-16"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    
                  </div>

                  <DialogTitle
                    as="h4"
                    class="text-gray-900 text-lg text-center font-extrabold"
                  >
                    {{ usersStore.userSelected[0].first_name }}
                    {{ usersStore.userSelected[0].last_name }}
                  </DialogTitle>
                  <DialogTitle
                    as="h4"
                    class="text-gray-900 text-lg text-center font-extrabold mb-5"
                  >
                    {{ usersStore.userSelected[0].document_number }}
                  </DialogTitle>
                  <hr />
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'address-card']" /> Tipo de documento :
                    <select name="rol" id="state" class=" rounded-lg shadow-lg font-bold mx-3">
                      <option value="null" selected disabled>{{ usersStore.userSelected[0].document_type }}</option>
                      <option value="Cédula de ciudadania" class="font-bold">Cédula de ciudadania</option>
                      <option value="Número de identificación tributaria" class="font-bold">Número de identificación tributaria</option>
                      <option value="Tarjeta de identidad" class="font-bold">Tarjeta de identidad</option>
                    </select>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'id-card']" /> Número de documento :
                    <input type="number" class="w-80" v-model="usersStore.userSelected[0].document_number"/>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'signature']" /> Nombres :
                    <input type="text" class="w-80" v-model="usersStore.userSelected[0].first_name"/>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'signature']" /> Apellidos :
                    <input type="text" class="w-80" v-model="usersStore.userSelected[0].last_name"/>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'envelope']" /> correo :
                    <input type="text" class="w-80" v-model="usersStore.userSelected[0].email"/>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'square-phone']" /> contacto :
                    <input type="text" class="w-80" v-model="usersStore.userSelected[0].cellphone"/>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'building']" /> Entidad :
                    <input type="text" class="w-80" v-model="usersStore.userSelected[0].entity"/>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'briefcase']" /> Rol :
                    <select name="rol" id="state" class=" rounded-lg shadow-lg font-bold mx-3">
                      <option value="null" selected disabled>{{ usersStore.userSelected[0].rol }}</option>
                      <option value="DEFAULT" class="font-bold">DEFAULT</option>
                      <option value="ADMINISTRADOR" class="font-bold">ADMINISTRADOR</option>
                    </select>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'briefcase']" /> Profesión :
                    <select name="rol" id="state" class=" rounded-lg shadow-lg font-bold mx-3">
                      <option value="null" selected disabled>{{ usersStore.userSelected[0].profession }}</option>
                      <option value="BIÓLOGO" class="font-bold">BIÓLOGO</option>
                      <option value="INGENIERO" class="font-bold">INGENIERO</option>
                      <option value="ESTUDIANTE" class="font-bold">ESTUDIANTE</option>
                      <option value="ABOGADO" class="font-bold">ABOGADO</option>
                    </select>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'briefcase']" /> Departamento :
                    <select name="department" id="department" class=" rounded-lg shadow-lg font-bold mx-3" v-model="formData.department">
                      <option value="null" selected disabled>{{ usersStore.userSelected[0].department }}</option>
                      <option v-for="loc in locates.departments" :key="loc.id" :value="loc.code">
                        {{ loc.name }}
                      </option>
                    </select>
                  </DialogTitle>
                  <DialogTitle as="h3" class="text-gray-900 text-lg my-5">
                    <font-awesome-icon :icon="['fas', 'briefcase']" /> Ciudad :
                    <select name="city" id="city" class=" rounded-lg shadow-lg font-bold mx-3" v-model="formData.city">
                      <option value="null" selected disabled>{{ usersStore.userSelected[0].city }}</option>
                      <option v-for="city in filteredCities" :key="city.id" :value="city.id">
                        {{ city.name }}
                      </option>
                    </select>
                  </DialogTitle>
                  <hr />
              
                </div>
              </div>
              <div class="mt-8 sm:mt-6 flex justify-between gap-4">
                <button
                  type="button"
                  class="shadow p-1 w-full rounded-lg bg-gray-700 hover:bg-gray-800 text-white uppercase font-bold"
                  @click="modal.handleClickModalUserUpdate()"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  class="shadow p-1 w-full rounded-lg bg-green-600 hover:bg-green-700 text-white uppercase font-bold"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  class="shadow p-1 w-full rounded-lg bg-green-600 hover:bg-green-700 text-white uppercase font-bold"
                >
                  Editar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>