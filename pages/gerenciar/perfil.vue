<template>
    <section>
        <div class="profile-header flex items-center">
            <img :src="conta.foto_perfil" class="avatar avatar-g">
            <div class="profile-header-informations">
                <p class="fontsize-lg cinza">{{ conta.nome }}</p>
                <p class="fontsize-sm cinza">{{ conta.email }}</p>
            </div>
        </div>
        <div class="profile-informations">
            <p class="fontsize-sm cinza">INFORMAÇÕES PESSOAIS</p>
            <div class="input-list grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="input-group">
                    <label for="crm">CRM</label>
                    <input type="text" id="crm">
                </div>
                <div class="input-group">
                    <label for="tel">Telefone</label>
                    <input type="tel" id="tel">
                </div>
                <div class="input-group"> 
                    <label for="cep">CEP Consultorio</label>
                    <input type="text" id="tel">
                </div>
                <div class="input-group"> 
                    <label for="num">Número Consultorio</label>
                    <input type="text" id="num">
                </div>
                <div class="input-group"> 
                    <label for="cidade">Cidade</label>
                    <input type="text" id="cidade">
                </div>
                <div class="input-group"> 
                    <label for="especialidade">Especialidade</label>
                    <select id="especialidade">
                        <option value="">* Selecione</option>
                        <option value="clinica-medica">Clínica Geral</option>
                        <option value="pediatria">Pediatria</option>
                        <option value="ginecologia">Ginecologia</option>
                        <option value="obstetricia">Obstetrícia</option>
                        <option value="cardiologia">Cardiologia</option>
                        <option value="dermatologia">Dermatologia</option>
                        <option value="neurologia">Neurologia</option>
                        <option value="ortopedia">Ortopedia</option>
                        <option value="psiquiatria">Psiquiatria</option>
                        <option value="oftalmologia">Oftalmologia</option>
                        <option value="otorrinolaringologia">Otorrinolaringologia</option>
                        <option value="endocrinologia">Endocrinologia</option>
                        <option value="gastroenterologia">Gastroenterologia</option>
                        <option value="nefrologia">Nefrologia</option>
                        <option value="hematologia">Hematologia</option>
                        <option value="oncologia">Oncologia</option>
                        <option value="reumatologia">Reumatologia</option>
                        <option value="urologia">Urologia</option>
                        <option value="cirurgia-geral">Cirurgia Geral</option>
                        <option value="anestesiologia">Anestesiologia</option>
                        <option value="pneumologia">Pneumologia</option>
                    </select>
                </div>
                <div class="input-group"> 
                    <label for="nome">Nome consultório</label>
                    <input type="text" id="nome">
                </div>
                <div class="input-group"> 
                    <label for="endereco">Endereço consultório</label>
                    <input type="text" id="endereco">
                </div>
            </div>
        </div>
    </section>   
</template>

<script>
export default {
    data() {
        return {
            conta: {
                foto_perfil: "https://i.pinimg.com/736x/43/2d/70/432d70784fec86547313cb27bcdde7f7.jpg",
                nome: "Ana Clara",
                email: "anaclara@gmail.com"
            }
        }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
    }
}
</script>
<style scoped>
.profile-header {
    margin: var(--space-7) 0;
}

.profile-informations > p {
    margin-bottom: var(--space-3);
}

.avatar {
    margin-right: var(--space-6);
}
</style>