<script setup>

</script>

<template>
    <div class="fanPage">
        <div>
            <h1>Encuentra información de interés en nuestra página oficial de <span
                    style="color: #1877F2;">Facebook</span></h1>
        </div>
        <div class="fanPage__content">
            <iframe class="screen__page"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCorpoamazonia&tabs=timeline&width=340&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="327px" height="700px" scrolling="no" frameborder="0" allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
            </iframe>
        </div>

    </div>
</template>



<style scoped>
.fanPage {
    color: rgb(58, 64, 75);
    display: grid;
    margin: 0 auto;
    margin-top: 5rem;
    align-items: center;
}

@media (min-width: 768px) {
    .fanPage {
        margin-top: 10rem;
        width: 1100px;
        grid-template-columns: 55% 45%;
    }
}

.fanPage__content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    transition: all .3s ease-in-out;
}

.fanPage h1 {
    font-size: 1.5rem;
    text-align: center;
    margin: 0;
    padding: 0 1rem;
}

@media (min-width: 768px) {
    .fanPage h1 {
        font-size: 2rem;
       
    }
}


.screen__page {
    background: transparent;
    border-radius: 1rem;
    position: relative;
    box-shadow: 0px 0px 10px;
    transition: all .3s ease-in-out;
    padding-bottom: .5rem;
}


.screen__page:hover {
    box-shadow: 0px 0px 20px;
}
</style>