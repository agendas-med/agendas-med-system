<template>
    <div class="authentication-page">
        <div class="flex items-center background-detail">
            <div class="authentication-container">
                <slot></slot>
            </div>
            <img src="../assets/img/system-print.png" alt="Systema AgendasMed">
        </div>
    </div>
  </template>
  
<script>
    export default {    }
</script>
  
<style scoped>
    .authentication-page {
        background-image: linear-gradient(to bottom right, #FFFFFF, #F5F9FD);
        position: relative;
        height: 100vh;
    }

    .background-detail {
        background-image: url("../assets/img/login-detalhes.png");
        background-repeat: no-repeat;
        background-position: 180% center;
        background-size: 75vw;
        height: 100vh;
    }   

        .background-detail > img {
            position: absolute;
            left: 60vw;
            width: 68vw;
            border-radius: var(--radius-lg);
            overflow: hidden;
            border: 1px solid var(--cinza-medio);
            box-shadow: var(--boxshadow-regular);
            aspect-ratio: auto;
            max-height: 660px;
            max-width: 1230px;
        }

    .authentication-container {
        width: 40vw;
        height: 100vh;
        border: 1px solid red;
        position: absolute;
        left: 9vw;
    }

    @media (max-width: 1023px) {
        .authentication-container {
            width: 90vw;
            margin: auto;
            position: relative;
            left: initial;
        }

        .background-detail > img {
            display: none;
        }

        .background-detail {
            background-image: none;
        }
    }
</style>
  