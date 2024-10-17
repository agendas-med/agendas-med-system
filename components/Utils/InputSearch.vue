<template>
    <input type="text" class="input-search-with-icon" placeholder="Procure um cliente">
</template>
  
<style scoped>
    .input-search-with-icon {
        width: 396px;
        height: 40px;
        padding-left: 40px; 
        border: 1px solid #ccc;
        border-radius: 8px;
        font-family: Poppins, sans-serif;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="%23888"><path d="M505 442.7L405.3 343c28.5-35.3 45.7-79.7 45.7-128C451 96.5 354.5 0 233 0S15 96.5 15 215.1 111.5 430.2 233 430.2c48.4 0 92.7-17.2 128-45.7L442.7 505c18.7 18.7 49 18.7 67.7 0 18.8-18.8 18.8-49.1 0-67.7zM233 362.2c-81.2 0-147.1-65.9-147.1-147.1S151.8 67.9 233 67.9 380.1 133.8 380.1 215.1 314.2 362.2 233 362.2z"/></svg>') no-repeat 10px center;
        background-size: 20px;
    }
    @media (max-width: 683px) {
        .input-search-with-icon {
            max-width: 250px !important;
        }
    }
</style>
