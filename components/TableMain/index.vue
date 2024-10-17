<template>
    <div class="overflow-hidden rounded-lg">
      <table class="min-w-full text-left rounded">
        <thead class="bg-blue-500">
          <tr>
            <th class="px-4 py-2 text-gray-600" id="cliente-mb">Cliente</th>
            <th class="px-4 py-2 text-gray-600">Telefone</th>
            <th class="px-4 py-2 text-gray-600">Última consulta</th>
            <th class="px-4 py-2 text-gray-600">Próxima consulta</th>
            <th class="px-4 py-2 text-gray-600">Total de consultas</th>
            <th class="px-4 py-2 text-gray-600">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-if="showElement" class="px-4 py-2">
              <UtilsMiniPerfil image="https://avatars.githubusercontent.com/u/61715554?v=4" name="Jefferson Alves" :age="26" />
            </td>
            <UtilsMiniPerfil v-else image="https://avatars.githubusercontent.com/u/61715554?v=4" name="Jefferson Alves" :age="26" />
            <td data-th="Telefone" class="px-4 py-2">(11) 99999-9999</td>
            <td data-th="Última consulta" class="px-4 py-2">10/10/2024</td>
            <td data-th="Próxima consulta" class="px-4 py-2">10/10/2024</td>
            <td data-th="Total de consultas" class="px-4 py-2">2</td>
            <td v-if="showElement" data-th="Ação" class="px-4 py-2"><font-awesome icon="calendar-day" class="sidebar-icons" /></td>
            <div v-else class="flex justify-center">
                <button class="w-9/12 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 m-4">
                    Ver agenda
                </button>
            </div>
          </tr>
          <tr>
            <td v-if="showElement" class="px-4 py-2">
              <UtilsMiniPerfil image="https://avatars.githubusercontent.com/u/61715554?v=4" name="Jefferson Alves" :age="26" />
            </td>
            <UtilsMiniPerfil v-else image="https://avatars.githubusercontent.com/u/61715554?v=4" name="Jefferson Alves" :age="26" />
            <td data-th="Telefone" class="px-4 py-2">(11) 99999-9999</td>
            <td data-th="Última consulta" class="px-4 py-2">10/10/2024</td>
            <td data-th="Próxima consulta" class="px-4 py-2">10/10/2024</td>
            <td data-th="Total de consultas" class="px-4 py-2">2</td>
            <td v-if="showElement" data-th="Ação" class="px-4 py-2"><font-awesome icon="calendar-day" class="sidebar-icons" /></td>
            <div v-else class="flex justify-center">
                <button class="w-9/12 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 m-4">
                    Ver agenda
                </button>
            </div>
          </tr>
          <tr>
            <td v-if="showElement" class="px-4 py-2">
              <UtilsMiniPerfil image="https://avatars.githubusercontent.com/u/61715554?v=4" name="Jefferson Alves" :age="26" />
            </td>
            <UtilsMiniPerfil v-else image="https://avatars.githubusercontent.com/u/61715554?v=4" name="Jefferson Alves" :age="26" />
            <td data-th="Telefone" class="px-4 py-2">(11) 99999-9999</td>
            <td data-th="Última consulta" class="px-4 py-2">10/10/2024</td>
            <td data-th="Próxima consulta" class="px-4 py-2">10/10/2024</td>
            <td data-th="Total de consultas" class="px-4 py-2">2</td>
            <td v-if="showElement" data-th="Ação" class="px-4 py-2"><font-awesome icon="calendar-day" class="sidebar-icons" /></td>
            <div v-else class="flex justify-center">
                <button class="w-9/12 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 m-4">
                    Ver agenda
                </button>
            </div>
          </tr>


        </tbody>
      </table>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showElement: true, 
        };
        },
        mounted() {
            this.checkScreenWidth();
            window.addEventListener('resize', this.checkScreenWidth);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.checkScreenWidth);
        },
        methods: {
            checkScreenWidth() {
            this.showElement = window.innerWidth > 682;
            }
    }
};

</script>

<style lang="scss" scoped>
table {
    border-collapse: collapse;
    width: 100%;
}

thead {
    background-color: #F3F3F3;
}

td, th {
    padding: 8px;
}

tr {
    border: 1.3px solid #F3F3F3;
    font-family: Poppins;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
}

@media (max-width: 683px) {

    thead {
    display: none;
    }

    tr {
    display: block;
    margin-bottom: 0.7rem;
    border: 2.5px solid #F3F3F3;
    padding: 10px;
    }

    td {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: 0.5rem;
    padding: 0.5rem;
    text-align: left;
    }

    td::before {
    content: attr(data-th) ": ";
    font-weight: bold;
    color: #000;
    }

    td[data-th="Cliente"] {
    grid-template-columns: 1fr;
    }
}
</style>
