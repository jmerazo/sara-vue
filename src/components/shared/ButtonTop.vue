<template>
    <button
      v-if="isVisible"
      class="button-top"
      @click="scrollToTop"
    >
      ↑
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  // Reactive state for button visibility
  const isVisible = ref(false);
  
  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scroll effect
    });
  };
  
  // Function to handle scroll event
  const handleScroll = () => {
    // Check if the user is near the bottom of the page
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
  
    // Show button when near the bottom of the page
    isVisible.value = scrollPosition > pageHeight - 100; // Adjust this threshold as needed
  };
  
  // Hook to add event listener on mount and clean up on unmount
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>
  
  <style scoped>
  .button-top {
    position: fixed;
    bottom: 22rem; /* Distance from bottom */
    right: 1rem; /* Distance from right */
    padding: 0.8rem 1.5rem;
    background-color: var(--primary, #0062ff); /* Default GOV.CO blue */
    color: white;
    border: 2px solid var(--primary, #0062ff);
    border-radius: 4px; /* Minimal rounded corners */
    font-size: 1.4rem;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease; /* Smooth transitions */
    z-index: 1000; /* Ensure it's above other content */
  }
  
  .button-top:hover {
    background-color: var(--primary-hover, #0050cc); /* Darker GOV.CO blue */
    border-color: var(--primary-hover, #0050cc);
    transform: translateY(-2px); /* Slight lift effect on hover */
  }
  
  .button-top:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 98, 255, 0.2); /* GOV.CO focus ring color */
  }
  </style>  