<template>
    <div class="authentication-page">
        <div class="flex items-center background-detail">
            <div class="authentication-container">
                <slot></slot>
            </div>
            <img src="../assets/img/system-print.png" alt="Systema AgendasMed">
            <MiscFooterData />
        </div>
    </div>
</template>
  
<style>
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
        width: 100vw;
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
        position: absolute;
        left: 9vw;
    }

    .authentication-page-internal {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100vh;
    }

    .btn.btn-primary {
        max-width: 100%;
    }

    form {
        width: 100%;
    }

    .or-separator {
        margin: var(--space-12) 0;
        height: 1px;
        width: 100%;
        background: var(--cinza-medio);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
    }

        .or-separator span {
            padding: 0 var(--space-2);
            background: var(--branco);
            position: relative;
            z-index: 2;
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
  