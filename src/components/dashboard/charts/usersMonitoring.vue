<script setup>

const porcentaje = 50
const porcentaje2 = 30
const color = "#f4436f"
const color2 = "#23998e"

</script>

<template>
    <div class="userMonitoring">
        <h1 class="userMonitoring__heading">Monitoreos por usuarios</h1>
        <div class="userMonitoring__list">
            <div>
                <div class="bar" :style="{
                    '--porcentaje': porcentaje + '%',
                    '--color': color,
                }">
                    <div class="bar__content">

                        <div class="bar__description">
                            <div class="bar__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z">
                                    </path>
                                </svg>
                            </div>
                            <p class="bar__name"> Ligia Stella - 18</p>
                        </div>
                        <p class="bar__percentage"> 33%</p>

                    </div>
                </div>
                <div class="bar__values">
                    <p style="margin: 0;">Realizados: <span>6</span></p>
                    <p style="margin: 0;">Pendientes: <span>12</span></p>
                </div>
            </div>

            <div>
                <div class="bar" :style="{
                    '--porcentaje': porcentaje2 + '%',
                    '--color': color2,
                }">
                    <div class="bar__content">
                        <div class="bar__description">
                            <div class="bar__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z">
                                    </path>
                                </svg>
                            </div>
                            <p class="bar__name"> Milton Mora - 18</p>
                        </div>
                        <p class="bar__percentage"> 11%</p>

                    </div>
                </div>
                <div class="bar__values">
                    <p style="margin: 0;">Realizados: <span>3</span></p>
                    <p style="margin: 0;">Pendientes: <span>15</span></p>
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped>
.userMonitoring {
    padding: 1rem;
}

.userMonitoring__heading {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 5rem;
}

.userMonitoring__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.bar {
    background-color: var(--gris);
    height: 2rem;
    width: 100%;
    position: relative;
}

.bar::before {
    content: '';
    background-color: var(--color);
    height: 2rem;
    width: var(--porcentaje);
    position: absolute;
    top: 0;
    z-index: 1;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: all .3s ease-in-out;
}

.bar .bar__content {
    position: relative;
    z-index: 2;
    padding: 0rem 1rem;
    display: flex;
    justify-content: space-between;
}

.bar .bar__content .bar__description {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bar__description .bar__icon {
    width: 1rem;
    height: 1rem;
    background-color: white;
    border-radius: 50%;
    margin-right: .5rem;
    display: flex;
    padding: .1rem;
}

.bar__description .bar__name {
    margin: 0;
    color: white;
}

.bar__content .bar__percentage {
    margin: 0;
    color: white;
}

.userMonitoring__list .bar__values {
    display: flex;
    justify-content: space-between;
    padding: 0 .5rem;
}
</style>