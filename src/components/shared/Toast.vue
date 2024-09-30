<script setup>
import { useToastStore } from '../../stores/toast'
const store = useToastStore()
</script>

<template>

    <div class="toast" :class="{'toast__show': store.textToast}">
        <div class="toast__content" :class="{'toast__error': store.typeToast === 'error' }">
            <div class="toast__icon">
                <svg v-if="store.typeToast === 'success'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path></svg>
            </div>
            <div class="toast__text">
                <p>{{ store.textToast }}</p>
            </div>
        </div>
    </div>
</template>


<style scoped>
.toast{
    position: fixed;
    top: 12%;
    right: -1200px;
    z-index: 10;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    transition: all .3s ease-in-out;
}
.toast .toast__content{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    padding: .7rem 1.2rem;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background: rgb(16, 168, 16);
}

.toast__content .toast__text p{
    color: white;
    font-weight: 500;
    margin: 0;
    padding: 0;
    padding-bottom: .6rem;
}

.toast svg{
    color: white;
    width: 2rem;
}

.toast__show{
    right: 0;
}

.toast .toast__error{
    background: rgb(182, 21, 21);
}
</style>