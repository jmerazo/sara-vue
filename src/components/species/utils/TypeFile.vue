<script setup>
defineProps({
    fileType: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="file__content">
        <svg v-if="fileType === 'pdf'" style="color: rgb(200, 30, 10);" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M5 4H15V8H19V20H5V4ZM3.9985 2C3.44749 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.5489 21 20.9925L20.9997 7L16 2H3.9985ZM10.4999 7.5C10.4999 9.07749 10.0442 10.9373 9.27493 12.6534C8.50287 14.3757 7.46143 15.8502 6.37524 16.7191L7.55464 18.3321C10.4821 16.3804 13.7233 15.0421 16.8585 15.49L17.3162 13.5513C14.6435 12.6604 12.4999 9.98994 12.4999 7.5H10.4999ZM11.0999 13.4716C11.3673 12.8752 11.6042 12.2563 11.8037 11.6285C12.2753 12.3531 12.8553 13.0182 13.5101 13.5953C12.5283 13.7711 11.5665 14.0596 10.6352 14.4276C10.7999 14.1143 10.9551 13.7948 11.0999 13.4716Z">
            </path>
        </svg>

        <svg v-if="fileType === 'docx'" style="color: rgb(1, 80, 200);" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M16 8V16H14L12 14L10 16H8V8H10V13L12 11L14 13V8H15V4H5V20H19V8H16ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z">
            </path>
        </svg>

        <svg v-if="fileType === 'pptx'" style="color: rgb(300, 100, 0);" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918ZM5 4V20H19V8H16V14H10V16H8V8H15V4H5ZM10 10V12H14V10H10Z">
            </path>
        </svg>

        <svg v-if="fileType === 'xlsx'" style="color: rgb(10, 100, 0);" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M13.2 12L16 16H13.6L12 13.7143L10.4 16H8L10.8 12L8 8H10.4L12 10.2857L13.6 8H15V4H5V20H19V8H16L13.2 12ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z">
            </path>
        </svg>
    </div>
</template>



<style scoped>
svg{
    width: 5rem;
}
.file__content{
    display: flex;
    align-items: center;
    justify-content: center;
}
@media (min-width: 768px) {
    svg{
        width: 10rem;
    }
}
</style>